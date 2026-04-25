/**
 * Chama a Edge Function `ac-subscribe` com import dinâmico de @supabase/supabase-js
 * (nada do SDK no carregamento inicial da LP).
 */
export async function invokeAcSubscribe(body: Record<string, unknown>) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) {
    throw new Error("Configuração do servidor incompleta.");
  }
  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  return supabase.functions.invoke("ac-subscribe", { body });
}
