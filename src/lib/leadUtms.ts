const TRACKED_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
] as const;
const STORAGE_PREFIX = "lead_param_";

function safeStorageOp(op: () => void) {
  try {
    op();
  } catch {
    /* quota / privacy mode */
  }
}

export function collectLeadParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of TRACKED_UTM_KEYS) {
    const fromUrl = params.get(key)?.trim();
    if (fromUrl) {
      out[key] = fromUrl.slice(0, 255);
      continue;
    }
    let stored: string | null = null;
    try {
      stored =
        localStorage.getItem(STORAGE_PREFIX + key) ?? sessionStorage.getItem(STORAGE_PREFIX + key);
    } catch {
      /* ignore */
    }
    if (stored?.trim()) out[key] = stored.trim().slice(0, 255);
  }
  if (typeof document !== "undefined" && document.title.trim()) {
    out.utm_pagina = document.title.trim().slice(0, 255);
  }
  return out;
}

/** Persiste UTMs da URL no storage. Deve ser chamado fora do caminho quente de render (ex.: após o modal abrir). */
export function persistUtmsFromUrl() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  let hasAnyUtm = false;
  for (const key of TRACKED_UTM_KEYS) {
    if (params.get(key)) {
      hasAnyUtm = true;
      break;
    }
  }
  if (!hasAnyUtm) return;
  for (const key of TRACKED_UTM_KEYS) {
    const value = params.get(key)?.trim();
    if (!value) continue;
    const safeValue = value.slice(0, 255);
    safeStorageOp(() => localStorage.setItem(STORAGE_PREFIX + key, safeValue));
    safeStorageOp(() => sessionStorage.setItem(STORAGE_PREFIX + key, safeValue));
  }
}
