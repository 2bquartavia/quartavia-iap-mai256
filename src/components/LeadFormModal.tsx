import { useEffect, useState, type FormEvent } from "react";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

type CountryEntry = {
  code: string;
  name: string;
  flag: string;
  dial: string;
  // Max number of national digits (after country code)
  maxNational: number;
  // Lightweight format groups for visual mask (BR-style only for BR)
  format?: (digits: string) => string;
};

const formatBR = (d: string) => {
  // (11) 99999-9999
  const a = d.slice(0, 2);
  const b = d.slice(2, 7);
  const c = d.slice(7, 11);
  if (d.length <= 2) return a ? `(${a}` : "";
  if (d.length <= 7) return `(${a}) ${b}`;
  return `(${a}) ${b}-${c}`;
};

const COUNTRIES: CountryEntry[] = [
  { code: "BR", name: "Brasil", flag: "🇧🇷", dial: "55", maxNational: 11, format: formatBR },
  { code: "PT", name: "Portugal", flag: "🇵🇹", dial: "351", maxNational: 9 },
  { code: "US", name: "EUA", flag: "🇺🇸", dial: "1", maxNational: 10 },
  { code: "AR", name: "Argentina", flag: "🇦🇷", dial: "54", maxNational: 11 },
  { code: "CL", name: "Chile", flag: "🇨🇱", dial: "56", maxNational: 9 },
  { code: "CO", name: "Colômbia", flag: "🇨🇴", dial: "57", maxNational: 10 },
  { code: "MX", name: "México", flag: "🇲🇽", dial: "52", maxNational: 10 },
  { code: "PY", name: "Paraguai", flag: "🇵🇾", dial: "595", maxNational: 9 },
  { code: "UY", name: "Uruguai", flag: "🇺🇾", dial: "598", maxNational: 9 },
  { code: "PE", name: "Peru", flag: "🇵🇪", dial: "51", maxNational: 9 },
  { code: "ES", name: "Espanha", flag: "🇪🇸", dial: "34", maxNational: 9 },
  { code: "IT", name: "Itália", flag: "🇮🇹", dial: "39", maxNational: 11 },
  { code: "FR", name: "França", flag: "🇫🇷", dial: "33", maxNational: 9 },
  { code: "DE", name: "Alemanha", flag: "🇩🇪", dial: "49", maxNational: 12 },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧", dial: "44", maxNational: 10 },
  { code: "CA", name: "Canadá", flag: "🇨🇦", dial: "1", maxNational: 10 },
  { code: "JP", name: "Japão", flag: "🇯🇵", dial: "81", maxNational: 11 },
  { code: "AU", name: "Austrália", flag: "🇦🇺", dial: "61", maxNational: 9 },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const ACTIVE_FIELD_PARAM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

const STORAGE_PARAM_PREFIX = "lead_param_";

function safeSet(storage: Storage | null, key: string, value: string) {
  if (!storage) return;
  try {
    storage.setItem(key, value);
  } catch {
    /* ignore quota / privacy mode */
  }
}

function safeGet(storage: Storage | null, key: string): string | null {
  if (!storage) return null;
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function getStorages(): Array<Storage | null> {
  if (typeof window === "undefined") return [];
  let local: Storage | null = null;
  let session: Storage | null = null;
  try { local = window.localStorage; } catch { local = null; }
  try { session = window.sessionStorage; } catch { session = null; }
  return [local, session];
}

function persistCurrentSearchParams() {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  const [local, session] = getStorages();
  params.forEach((value, key) => {
    if (!key || !value) return;
    const safeValue = value.slice(0, 255);
    safeSet(local, `${STORAGE_PARAM_PREFIX}${key}`, safeValue);
    safeSet(session, `${STORAGE_PARAM_PREFIX}${key}`, safeValue);
    if (key.startsWith("utm_")) {
      safeSet(local, key, safeValue);
      safeSet(session, key, safeValue);
    }
  });
}

function getLeadParams(): Record<string, string> {
  if (typeof window === "undefined") return {};
  persistCurrentSearchParams();

  const params = new URLSearchParams(window.location.search);
  const [local, session] = getStorages();
  const out: Record<string, string> = {};

  for (const key of ACTIVE_FIELD_PARAM_KEYS) {
    const fromUrl = params.get(key)?.slice(0, 255);
    if (fromUrl) {
      out[key] = fromUrl;
      continue;
    }

    const stored =
      safeGet(local, `${STORAGE_PARAM_PREFIX}${key}`) ??
      safeGet(session, `${STORAGE_PARAM_PREFIX}${key}`) ??
      safeGet(local, key) ??
      safeGet(session, key);
    if (stored) out[key] = stored.slice(0, 255);
  }

  out.utm_pagina =
    (typeof document !== "undefined" ? document.title : "") || "";
  return out;
}

export default function LeadFormModal({ open, onOpenChange }: LeadFormModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState<string>("BR");
  const [phoneInput, setPhoneInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  useEffect(() => {
    persistCurrentSearchParams();
  }, []);

  useEffect(() => {
    if (!open) {
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open || typeof document === "undefined") return;
    const previousOverflow = document.body.style.overflow;
    document.body.classList.add("lead-modal-open");
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.classList.remove("lead-modal-open");
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onOpenChange, open]);

  const handlePhoneChange = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, country.maxNational);
    setPhoneInput(country.format ? country.format(digits) : digits);
  };

  const handleCountryChange = (code: string) => {
    const next = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
    setCountryCode(code);
    const digits = phoneInput.replace(/\D/g, "").slice(0, next.maxNational);
    setPhoneInput(next.format ? next.format(digits) : digits);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const nomeTrim = nome.trim();
    const emailTrim = email.trim();
    if (nomeTrim.length < 2) {
      setError("Informe seu nome");
      return;
    }
    if (!EMAIL_RE.test(emailTrim) || emailTrim.length > 255) {
      setError("E-mail inválido");
      return;
    }

    const digits = phoneInput.replace(/\D/g, "");
    if (digits.length < 6 || digits.length > country.maxNational) {
      setError("Telefone inválido — confira o DDD e o número");
      return;
    }
    const telefoneE164 = `+${country.dial}${digits}`;

    setSubmitting(true);
    try {
      const leadParams = getLeadParams();
      const landing_url =
        typeof window !== "undefined" ? window.location.href : "";
      const referrer =
        typeof document !== "undefined" ? document.referrer : "";
      // Lazy-load supabase client only when actually submitting,
      // so the click-to-open path stays instant.
      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error: fnError } = await supabase.functions.invoke(
        "ac-subscribe",
        {
          body: {
            nome: nomeTrim,
            email: emailTrim,
            telefone: telefoneE164,
            landing_url,
            referrer,
            ...leadParams,
          },
        },
      );
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const params = new URLSearchParams(
        typeof window !== "undefined" ? window.location.search : "",
      );
      params.set("nome", nomeTrim);
      params.set("email", emailTrim);
      params.set("telefone", telefoneE164);
      window.location.href = `/obrigado?${params.toString()}`;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Não foi possível enviar agora";
      setError(msg);
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div
      role="presentation"
      onClick={() => onOpenChange(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "grid",
        placeItems: "center",
        padding: "1rem",
        background: "rgba(0,0,0,0.78)",
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        aria-describedby="lead-modal-description"
        onClick={(event) => event.stopPropagation()}
        style={{
          position: "relative",
          width: "min(100%, 28rem)",
          overflow: "hidden",
          borderRadius: "1rem",
          background: "linear-gradient(180deg, #062234 0%, #031a28 100%)",
          color: "#fff",
        }}
      >
        <button
          type="button"
          aria-label="Fechar"
          onClick={() => onOpenChange(false)}
          style={closeButtonStyle}
        >
          ×
        </button>
        <div style={{ padding: "1.5rem 1.25rem 1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <h2
              id="lead-modal-title"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#fff",
                textAlign: "left",
              }}
            >
              Garanta sua vaga no Lote ZERO
            </h2>
            <p
              id="lead-modal-description"
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.875rem",
                textAlign: "left",
                margin: 0,
              }}
            >
              Preencha seus dados para receber o acesso prioritário.
            </p>
          </div>

          <form
            className="lead-form"
            data-utmify-ignore="true"
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              marginTop: "1.1rem",
            }}
          >
            <input
              type="text"
              placeholder="Nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              autoComplete="name"
              required
              maxLength={120}
              style={inputStyle}
            />
            <input
              type="email"
              placeholder="Seu melhor e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              maxLength={255}
              inputMode="email"
              style={inputStyle}
            />

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 7.5rem) 1fr",
                gap: "0.5rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <select
                  value={countryCode}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  aria-label="País"
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    paddingRight: "1.5rem",
                    cursor: "pointer",
                  }}
                >
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code} style={{ color: "#000" }}>
                      {c.flag} {c.code} +{c.dial}
                    </option>
                  ))}
                </select>
                <span
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: "0.6rem",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(255,255,255,0.5)",
                    pointerEvents: "none",
                    fontSize: "0.7rem",
                  }}
                >
                  ▾
                </span>
              </div>

              <input
                type="tel"
                placeholder={
                  country.code === "BR" ? "(11) 99999-9999" : `+${country.dial} número`
                }
                value={phoneInput}
                onChange={(e) => handlePhoneChange(e.target.value)}
                autoComplete="tel"
                inputMode="tel"
                required
                maxLength={32}
                style={{ ...inputStyle, minWidth: 0 }}
              />
            </div>

            {error && (
              <p
                style={{
                  color: "#ff9a9a",
                  fontSize: "0.85rem",
                  margin: "0.25rem 0 0",
                }}
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: "0.5rem",
                padding: "0.95rem 1.25rem",
                borderRadius: "999px",
                border: "none",
                background: submitting
                  ? "rgba(204,117,20,0.55)"
                  : "linear-gradient(135deg, #E8A554 0%, #CC7514 100%)",
                color: "#fff",
                fontWeight: 700,
                fontSize: "0.95rem",
                letterSpacing: "0.01em",
                cursor: submitting ? "not-allowed" : "pointer",
                transition: "transform 0.15s ease, opacity 0.2s ease",
              }}
            >
              {submitting ? "Enviando..." : "Quero garantir minha vaga"}
            </button>

            <p
              style={{
                fontSize: "0.7rem",
                color: "rgba(255,255,255,0.45)",
                textAlign: "center",
                margin: "0.4rem 0 0",
              }}
            >
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 0.9rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "16px",
  outline: "none",
  fontFamily: "inherit",
};

const closeButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "0.8rem",
  right: "0.9rem",
  zIndex: 2,
  width: "2rem",
  height: "2rem",
  border: "none",
  borderRadius: "999px",
  background: "rgba(255,255,255,0.08)",
  color: "rgba(255,255,255,0.78)",
  cursor: "pointer",
  fontSize: "1.4rem",
  lineHeight: 1,
};
