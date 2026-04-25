/**
 * Chama a Edge Function `ac-subscribe` com fetch — sem @supabase/supabase-js
 * (menos JS no chunk do formulário / build).
 */
type InvokeResult = {
  data: unknown;
  error: Error | null;
};

function parseBody(text: string): unknown {
  if (!text) return null;
  try {
    return JSON.parse(text) as unknown;
  } catch {
    return text;
  }
}

export async function invokeAcSubscribe(body: Record<string, unknown>): Promise<InvokeResult> {
  const base = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, "");
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!base || !key) {
    return { data: null, error: new Error("Configuração do servidor incompleta.") };
  }
  const url = `${base}/functions/v1/ac-subscribe`;
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        apikey: key,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  } catch (e) {
    const err = e instanceof Error ? e : new Error("Falha de rede");
    return { data: null, error: err };
  }
  const text = await res.text();
  const data = parseBody(text);
  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data !== null && "error" in data
        ? String((data as { error: unknown }).error)
        : typeof data === "object" && data !== null && "message" in data
          ? String((data as { message: unknown }).message)
          : `Erro ${res.status}`;
    return { data, error: new Error(msg) };
  }
  return { data, error: null };
}
