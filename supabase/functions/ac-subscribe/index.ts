// ActiveCampaign subscribe edge function
// Receives lead data + UTMs, creates/updates contact, applies tag and list

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const TAG_ID = 371; // IAP - METEORICO
const LIST_ID = 120; // IAP - METEORICO

// ActiveCampaign custom field IDs
const FIELD_IDS: Record<string, number> = {
  utm_source: 1,
  utm_medium: 2,
  utm_campaign: 3,
  utm_term: 4,
  utm_content: 5,
  utm_pagina: 53,
};

interface Payload {
  nome: string;
  email: string;
  telefone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_pagina?: string;
}

async function ac(
  baseUrl: string,
  apiKey: string,
  path: string,
  init: RequestInit = {},
) {
  const res = await fetch(`${baseUrl}/api/3${path}`, {
    ...init,
    headers: {
      "Api-Token": apiKey,
      "Content-Type": "application/json",
      Accept: "application/json",
      ...(init.headers ?? {}),
    },
  });
  const text = await res.text();
  let json: any = null;
  try {
    json = text ? JSON.parse(text) : null;
  } catch {
    /* keep null */
  }
  if (!res.ok) {
    console.error(`AC ${path} -> ${res.status}: ${text}`);
    throw new Error(`AC ${path} failed: ${res.status}`);
  }
  return json;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const baseUrl = Deno.env.get("ACTIVECAMPAIGN_API_URL");
    const apiKey = Deno.env.get("ACTIVECAMPAIGN_API_KEY");
    if (!baseUrl || !apiKey) {
      return new Response(
        JSON.stringify({ error: "ActiveCampaign não configurado" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = (await req.json()) as Payload;
    const nome = (payload.nome ?? "").trim();
    const email = (payload.email ?? "").trim().toLowerCase();
    const rawPhone = (payload.telefone ?? "").trim();
    const digits = rawPhone.replace(/\D/g, "");
    const telefone = digits ? `+${digits}` : "";

    if (!nome || nome.length > 120) throw new Error("nome inválido");
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 255)
      throw new Error("email inválido");
    if (!telefone || !/^\+\d{8,15}$/.test(telefone))
      throw new Error("telefone inválido");

    const [firstName, ...rest] = nome.split(/\s+/);
    const lastName = rest.join(" ");

    // 1) Create/update contact synchronously
    const syncRes = await ac(baseUrl, apiKey, "/contact/sync", {
      method: "POST",
      body: JSON.stringify({
        contact: { email, firstName, lastName, phone: telefone },
      }),
    });
    const contactId = Number(syncRes?.contact?.id);
    if (!contactId) throw new Error("Falha ao criar contato");

    // 2) Apply LIST + TAG synchronously with retry — these MUST be guaranteed
    const withRetry = async (label: string, fn: () => Promise<unknown>) => {
      let lastErr: unknown = null;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          await fn();
          return;
        } catch (e) {
          lastErr = e;
          console.warn(`${label} attempt ${attempt} failed`, e);
          await new Promise((r) => setTimeout(r, 250 * attempt));
        }
      }
      console.error(`${label} FAILED after retries`, lastErr);
      throw lastErr;
    };

    await Promise.all([
      withRetry("contactLists", () =>
        ac(baseUrl, apiKey, "/contactLists", {
          method: "POST",
          body: JSON.stringify({
            contactList: { list: LIST_ID, contact: contactId, status: 1 },
          }),
        }),
      ),
      withRetry("contactTags", () =>
        ac(baseUrl, apiKey, "/contactTags", {
          method: "POST",
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: TAG_ID },
          }),
        }),
      ),
    ]);
    console.log("AC list+tag ok", contactId);

    // 3) UTM custom fields in background (non-critical)
    const processFields = async () => {
      try {
        const fieldValues = Object.entries(FIELD_IDS)
          .map(([key, field]) => {
            const value = (payload[key as keyof Payload] ?? "").toString().slice(0, 255);
            return value ? { key, field: String(field), value } : null;
          })
          .filter(Boolean) as Array<{ key: string; field: string; value: string }>;

        const existingRes = await ac(baseUrl, apiKey, `/contacts/${contactId}/fieldValues`).catch(() => ({ fieldValues: [] }));
        const existingByField = new Map<string, string>();
        for (const item of existingRes?.fieldValues ?? []) {
          if (item?.field && item?.id) existingByField.set(String(item.field), String(item.id));
        }

        await Promise.all(
          fieldValues.map(({ key, field, value }) => {
            const existingId = existingByField.get(field);
            return ac(baseUrl, apiKey, existingId ? `/fieldValues/${existingId}` : "/fieldValues", {
              method: existingId ? "PUT" : "POST",
              body: JSON.stringify({
                fieldValue: { contact: String(contactId), field, value },
              }),
            }).catch((e) => console.warn(`fieldValue ${key} error`, e));
          }),
        );
        console.log("AC fields ok", contactId);
      } catch (e) {
        console.error("AC fields bg error:", e);
      }
    };

    // @ts-ignore EdgeRuntime is available in Supabase Edge Functions
    if (typeof EdgeRuntime !== "undefined" && EdgeRuntime.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(processFields());
    } else {
      processFields();
    }

    return new Response(
      JSON.stringify({ ok: true, contactId }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("ac-subscribe error:", message);
    return new Response(
      JSON.stringify({ error: message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
