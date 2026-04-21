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

interface Payload {
  nome: string;
  email: string;
  telefone: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  utm_id?: string;
  utm_pagina?: string;
}

const UTM_FIELD_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
  "utm_pagina",
] as const;

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

// Cache field-id mapping in memory of the worker
let cachedFieldMap: Record<string, number> | null = null;

async function ensureCustomFields(baseUrl: string, apiKey: string) {
  if (cachedFieldMap) return cachedFieldMap;

  const data = await ac(baseUrl, apiKey, "/fields?limit=100");
  const map: Record<string, number> = {};
  for (const f of data?.fields ?? []) {
    map[String(f.perstag ?? "").toLowerCase()] = Number(f.id);
  }

  for (const key of UTM_FIELD_KEYS) {
    const perstag = key.toUpperCase();
    if (!map[key]) {
      try {
        const created = await ac(baseUrl, apiKey, "/fields", {
          method: "POST",
          body: JSON.stringify({
            field: {
              type: "text",
              title: key,
              perstag,
              descript: `Auto-created for ${key}`,
              visible: 1,
            },
          }),
        });
        if (created?.field?.id) {
          map[key] = Number(created.field.id);
          // attach to list
          try {
            await ac(baseUrl, apiKey, "/fieldRels", {
              method: "POST",
              body: JSON.stringify({
                fieldRel: { field: created.field.id, relid: 0 },
              }),
            });
          } catch (e) {
            console.warn("fieldRel error", e);
          }
        }
      } catch (e) {
        console.warn(`Could not create field ${key}`, e);
      }
    }
  }
  cachedFieldMap = map;
  return map;
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
    const telefone = (payload.telefone ?? "").trim();

    if (!nome || nome.length > 120) throw new Error("nome inválido");
    if (!email || !/^\S+@\S+\.\S+$/.test(email) || email.length > 255)
      throw new Error("email inválido");
    if (!telefone || telefone.length > 40) throw new Error("telefone inválido");

    const [firstName, ...rest] = nome.split(/\s+/);
    const lastName = rest.join(" ");

    // 1) sync contact
    const syncRes = await ac(baseUrl, apiKey, "/contact/sync", {
      method: "POST",
      body: JSON.stringify({
        contact: {
          email,
          firstName,
          lastName,
          phone: telefone,
        },
      }),
    });
    const contactId = Number(syncRes?.contact?.id);
    if (!contactId) throw new Error("Falha ao criar contato");

    // 2) custom UTM fields
    const fieldMap = await ensureCustomFields(baseUrl, apiKey);
    await Promise.all(
      UTM_FIELD_KEYS.map(async (key) => {
        const value = (payload[key] ?? "").toString().slice(0, 255);
        const fieldId = fieldMap[key];
        if (!fieldId) return;
        try {
          await ac(baseUrl, apiKey, "/fieldValues", {
            method: "POST",
            body: JSON.stringify({
              fieldValue: { contact: contactId, field: fieldId, value },
            }),
          });
        } catch (e) {
          console.warn(`fieldValue ${key} error`, e);
        }
      }),
    );

    // 3) add to list
    try {
      await ac(baseUrl, apiKey, "/contactLists", {
        method: "POST",
        body: JSON.stringify({
          contactList: { list: LIST_ID, contact: contactId, status: 1 },
        }),
      });
    } catch (e) {
      console.warn("contactLists error", e);
    }

    // 4) add tag
    try {
      await ac(baseUrl, apiKey, "/contactTags", {
        method: "POST",
        body: JSON.stringify({
          contactTag: { contact: contactId, tag: TAG_ID },
        }),
      });
    } catch (e) {
      console.warn("contactTags error", e);
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
