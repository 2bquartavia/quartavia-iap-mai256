import { useEffect, useRef, useState, type CSSProperties, type FormEvent } from "react";
import { createPortal } from "react-dom";

import { collectLeadParams } from "@/lib/leadUtms";

interface LeadFormModalProps {
  onClose: () => void;
}

type CountryEntry = {
  code: string;
  name: string;
  flag: string;
  dial: string;
  maxNational: number;
  format?: (digits: string) => string;
};

const formatBR = (d: string) => {
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

/**
 * Versão mínima: sem bloquear scroll em body/html, sem class em #root, sem efeito de layout
 * síncrono. Só portal + overlay com wheel/touch não-passive para reduzir scroll de fundo.
 * Pausa de carrossel via `isLeadModalOpenNow()` no store, não via CSS.
 */
export default function LeadFormModal({ onClose }: LeadFormModalProps) {
  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const [countryCode, setCountryCode] = useState<string>("BR");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const country = COUNTRIES.find((c) => c.code === countryCode) ?? COUNTRIES[0];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onPhoneInput = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const digits = target.value.replace(/\D/g, "").slice(0, country.maxNational);
    target.value = country.format ? country.format(digits) : digits;
  };

  const onCountryChange = (code: string) => {
    const next = COUNTRIES.find((c) => c.code === code) ?? COUNTRIES[0];
    setCountryCode(code);
    if (phoneRef.current) {
      const digits = phoneRef.current.value.replace(/\D/g, "").slice(0, next.maxNational);
      phoneRef.current.value = next.format ? next.format(digits) : digits;
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    const nome = (nomeRef.current?.value ?? "").trim();
    const email = (emailRef.current?.value ?? "").trim();
    const phoneRaw = (phoneRef.current?.value ?? "").trim();
    const digits = phoneRaw.replace(/\D/g, "");

    if (nome.length < 2) {
      setError("Informe seu nome");
      return;
    }
    if (!EMAIL_RE.test(email) || email.length > 255) {
      setError("E-mail inválido");
      return;
    }
    if (digits.length < 6 || digits.length > country.maxNational) {
      setError("Telefone inválido — confira o DDD e o número");
      return;
    }
    const telefoneE164 = `+${country.dial}${digits}`;

    setSubmitting(true);
    try {
      const leadParams = collectLeadParams();
      const landing_url = typeof window !== "undefined" ? window.location.href : "";
      const referrer = typeof document !== "undefined" ? document.referrer : "";

      const { supabase } = await import("@/integrations/supabase/client");
      const { data, error: fnError } = await supabase.functions.invoke("ac-subscribe", {
        body: {
          nome,
          email,
          telefone: telefoneE164,
          landing_url,
          referrer,
          ...leadParams,
        },
      });
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(leadParams)) {
        if (value) params.set(key, value);
      }
      params.set("nome", nome);
      params.set("email", email);
      params.set("telefone", telefoneE164);
      window.location.href = `/obrigado?${params.toString()}`;
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Não foi possível enviar agora";
      setError(msg);
      setSubmitting(false);
    }
  };

  if (typeof document === "undefined") return null;

  const portalNode = document.getElementById("modal-root") ?? document.body;
  if (!portalNode.isConnected) return null;

  return createPortal(
    <div role="presentation" onClick={onClose} style={overlayStyle}>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        aria-describedby="lead-modal-description"
        onClick={(event) => event.stopPropagation()}
        style={dialogStyle}
      >
        <button type="button" aria-label="Fechar" onClick={onClose} style={closeButtonStyle}>
          ×
        </button>
        <div style={{ padding: "1.5rem 1.25rem 1.25rem" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
            <h2 id="lead-modal-title" style={titleStyle}>
              Garanta sua vaga no Lote ZERO
            </h2>
            <p id="lead-modal-description" style={descriptionStyle}>
              Preencha seus dados para receber o acesso prioritário.
            </p>
          </div>

          <form
            className="lead-form"
            data-utmify-ignore="true"
            onSubmit={onSubmit}
            style={formStyle}
          >
            <input
              ref={nomeRef}
              type="text"
              name="nome"
              placeholder="Nome completo"
              defaultValue=""
              autoComplete="name"
              spellCheck={false}
              required
              maxLength={120}
              style={inputStyle}
            />
            <input
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Seu melhor e-mail"
              defaultValue=""
              autoComplete="email"
              spellCheck={false}
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
                  onChange={(e) => onCountryChange(e.target.value)}
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
                <span aria-hidden style={selectArrowStyle}>
                  ▾
                </span>
              </div>

              <input
                ref={phoneRef}
                type="tel"
                name="telefone"
                placeholder={country.code === "BR" ? "(11) 99999-9999" : `+${country.dial} número`}
                defaultValue=""
                onInput={onPhoneInput}
                autoComplete="tel"
                spellCheck={false}
                inputMode="tel"
                required
                maxLength={32}
                style={{ ...inputStyle, minWidth: 0 }}
              />
            </div>

            {error && <p style={errorStyle}>{error}</p>}

            <button type="submit" disabled={submitting} style={submitStyle(submitting)}>
              {submitting ? "Enviando..." : "Quero garantir minha vaga"}
            </button>

            <p style={footerStyle}>Seus dados estão seguros. Não enviamos spam.</p>
          </form>
        </div>
      </div>
    </div>,
    portalNode,
  );
}

const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  zIndex: 99999,
  display: "grid",
  placeItems: "center",
  padding: "1rem",
  background: "rgba(0,0,0,0.78)",
  overscrollBehavior: "contain",
  isolation: "isolate",
};

const dialogStyle: CSSProperties = {
  position: "relative",
  width: "min(100%, 28rem)",
  maxHeight: "min(100dvh, 32rem)",
  overflow: "auto",
  borderRadius: "1rem",
  background: "linear-gradient(180deg, #062234 0%, #031a28 100%)",
  color: "#fff",
  touchAction: "auto",
};

const inputStyle: CSSProperties = {
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

const closeButtonStyle: CSSProperties = {
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

const titleStyle: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
  fontWeight: 600,
  letterSpacing: "-0.01em",
  color: "#fff",
  textAlign: "left",
};

const descriptionStyle: CSSProperties = {
  color: "rgba(255,255,255,0.65)",
  fontSize: "0.875rem",
  textAlign: "left",
  margin: 0,
};

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "0.75rem",
  marginTop: "1.1rem",
};

const selectArrowStyle: CSSProperties = {
  position: "absolute",
  right: "0.6rem",
  top: "50%",
  transform: "translateY(-50%)",
  color: "rgba(255,255,255,0.5)",
  pointerEvents: "none",
  fontSize: "0.7rem",
};

const errorStyle: CSSProperties = {
  color: "#ff9a9a",
  fontSize: "0.85rem",
  margin: "0.25rem 0 0",
};

const submitStyle = (submitting: boolean): CSSProperties => ({
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
});

const footerStyle: CSSProperties = {
  fontSize: "0.7rem",
  color: "rgba(255,255,255,0.45)",
  textAlign: "center",
  margin: "0.4rem 0 0",
};
