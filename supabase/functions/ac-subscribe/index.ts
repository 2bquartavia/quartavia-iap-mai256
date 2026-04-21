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
  landing_url?: string;
  referrer?: string;
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

    // Capture request metadata for the leads record
    const userAgent = req.headers.get("user-agent") ?? "";
    const ipAddress =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("cf-connecting-ip") ??
      "";

    // Helper: retry with backoff
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

    // 1) Create/update contact — REQUIRED to get contactId
    const syncRes = await ac(baseUrl, apiKey, "/contact/sync", {
      method: "POST",
      body: JSON.stringify({
        contact: { email, firstName, lastName, phone: telefone },
      }),
    });
    const contactId = Number(syncRes?.contact?.id);
    if (!contactId) throw new Error("Falha ao criar contato");

    // 2) Background work — list, tag, custom fields, DB insert.
    // Respond to the client IMMEDIATELY after contact sync; the rest
    // continues server-side via waitUntil so the user sees instant success.
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    const background = (async () => {
      // 2a) DB insert (best-effort)
      const dbInsert = (async () => {
        if (!supabaseUrl || !serviceKey) {
          console.warn("SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured");
          return;
        }
        try {
          const dbRes = await fetch(`${supabaseUrl}/rest/v1/leads`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              apikey: serviceKey,
              Authorization: `Bearer ${serviceKey}`,
              Prefer: "return=minimal",
            },
            body: JSON.stringify({
              nome,
              email,
              telefone,
              utm_source: payload.utm_source ?? null,
              utm_medium: payload.utm_medium ?? null,
              utm_campaign: payload.utm_campaign ?? null,
              utm_term: payload.utm_term ?? null,
              utm_content: payload.utm_content ?? null,
              utm_pagina: payload.utm_pagina ?? null,
              landing_url: payload.landing_url ?? null,
              referrer: payload.referrer ?? null,
              user_agent: userAgent || null,
              ip_address: ipAddress || null,
              ac_contact_id: String(contactId),
            }),
          });
          if (!dbRes.ok) {
            const txt = await dbRes.text();
            console.error("DB insert leads failed:", dbRes.status, txt);
          } else {
            console.log("Lead persisted", email);
          }
        } catch (e) {
          console.error("DB insert error:", e);
        }
      })();

      // 2b) Apply LIST + TAG with retry — guaranteed
      const listP = withRetry("contactLists", () =>
        ac(baseUrl, apiKey, "/contactLists", {
          method: "POST",
          body: JSON.stringify({
            contactList: { list: LIST_ID, contact: contactId, status: 1 },
          }),
        }),
      ).catch((e) => console.error("contactLists fatal:", e));

      const tagP = withRetry("contactTags", () =>
        ac(baseUrl, apiKey, "/contactTags", {
          method: "POST",
          body: JSON.stringify({
            contactTag: { contact: contactId, tag: TAG_ID },
          }),
        }),
      ).catch((e) => console.error("contactTags fatal:", e));

      // 2c) UTM custom fields — overwrite existing values
      const fieldsP = (async () => {
        try {
          const fieldValues = Object.entries(FIELD_IDS)
            .map(([key, field]) => {
              const value = (payload[key as keyof Payload] ?? "").toString().slice(0, 255);
              return value ? { key, field: String(field), value } : null;
            })
            .filter(Boolean) as Array<{ key: string; field: string; value: string }>;

          if (fieldValues.length === 0) {
            console.log("AC fields: nothing to write", contactId);
            return;
          }

          const existingRes = await ac(
            baseUrl,
            apiKey,
            `/contacts/${contactId}/fieldValues`,
          ).catch(() => ({ fieldValues: [] }));
          const existingByField = new Map<string, string>();
          for (const item of existingRes?.fieldValues ?? []) {
            if (item?.field && item?.id) existingByField.set(String(item.field), String(item.id));
          }

          await Promise.all(
            fieldValues.map(({ key, field, value }) =>
              withRetry(`fieldValue:${key}`, async () => {
                const existingId = existingByField.get(field);
                await ac(
                  baseUrl,
                  apiKey,
                  existingId ? `/fieldValues/${existingId}` : "/fieldValues",
                  {
                    method: existingId ? "PUT" : "POST",
                    body: JSON.stringify({
                      fieldValue: { contact: String(contactId), field, value, useDefaults: false },
                    }),
                  },
                );
              }),
            ),
          );
          console.log("AC fields ok", contactId, fieldValues.map((f) => f.key).join(","));
        } catch (e) {
          console.error("AC fields error:", e);
        }
      })();

      await Promise.all([dbInsert, listP, tagP, fieldsP]);
      console.log("Background pipeline complete for", contactId);
    })();

    // Keep the worker alive for background work without blocking the response
    // @ts-ignore - EdgeRuntime is provided by Deno Deploy / Supabase Edge runtime
    if (typeof EdgeRuntime !== "undefined" && EdgeRuntime?.waitUntil) {
      // @ts-ignore
      EdgeRuntime.waitUntil(background);
    } else {
      // Fallback: don't await — best-effort fire and forget
      background.catch((e) => console.error("background error:", e));
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
