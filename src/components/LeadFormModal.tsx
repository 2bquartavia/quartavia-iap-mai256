import { useEffect, useMemo, useState, type FormEvent } from "react";
import { z } from "zod";
import {
  AsYouType,
  parsePhoneNumberFromString,
  getCountryCallingCode,
  type CountryCode,
} from "libphonenumber-js";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { supabase } from "@/integrations/supabase/client";

interface LeadFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Curated list — Brazil first, then common ones
const COUNTRIES: { code: CountryCode; name: string; flag: string }[] = [
  { code: "BR", name: "Brasil", flag: "🇧🇷" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colômbia", flag: "🇨🇴" },
  { code: "MX", name: "México", flag: "🇲🇽" },
  { code: "PY", name: "Paraguai", flag: "🇵🇾" },
  { code: "UY", name: "Uruguai", flag: "🇺🇾" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
  { code: "ES", name: "Espanha", flag: "🇪🇸" },
  { code: "IT", name: "Itália", flag: "🇮🇹" },
  { code: "FR", name: "França", flag: "🇫🇷" },
  { code: "DE", name: "Alemanha", flag: "🇩🇪" },
  { code: "GB", name: "Reino Unido", flag: "🇬🇧" },
  { code: "CA", name: "Canadá", flag: "🇨🇦" },
  { code: "JP", name: "Japão", flag: "🇯🇵" },
  { code: "AU", name: "Austrália", flag: "🇦🇺" },
];

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
});

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "utm_id",
] as const;

function getUtms(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const out: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const fromUrl = params.get(key);
    if (fromUrl) {
      out[key] = fromUrl;
      try {
        sessionStorage.setItem(key, fromUrl);
      } catch {
        /* ignore */
      }
    } else {
      try {
        const stored = sessionStorage.getItem(key);
        if (stored) out[key] = stored;
      } catch {
        /* ignore */
      }
    }
  }
  out.utm_pagina =
    (typeof document !== "undefined" ? document.title : "") || "";
  return out;
}

export default function LeadFormModal({ open, onOpenChange }: LeadFormModalProps) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState<CountryCode>("BR");
  const [phoneInput, setPhoneInput] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  const callingCode = useMemo(() => {
    try {
      return `+${getCountryCallingCode(country)}`;
    } catch {
      return "";
    }
  }, [country]);

  const handlePhoneChange = (value: string) => {
    // Strip anything that's not digit (mask is purely visual)
    const digits = value.replace(/\D/g, "").slice(0, 15);
    const formatter = new AsYouType(country);
    const formatted = formatter.input(digits);
    setPhoneInput(formatted);
  };

  const handleCountryChange = (code: CountryCode) => {
    setCountry(code);
    // Re-format current digits under new country
    const digits = phoneInput.replace(/\D/g, "");
    const formatter = new AsYouType(code);
    setPhoneInput(formatter.input(digits));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ nome, email });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }

    // Normalize phone to E.164: "+" + digits only, no spaces or punctuation
    const phoneNumber = parsePhoneNumberFromString(phoneInput, country);
    if (!phoneNumber || !phoneNumber.isValid()) {
      setError("Telefone inválido — confira o DDD e o número");
      return;
    }
    const telefoneE164 = phoneNumber.number; // e.g. "+5511999999999"

    setSubmitting(true);
    try {
      const utms = getUtms();
      const { data, error: fnError } = await supabase.functions.invoke(
        "ac-subscribe",
        {
          body: {
            ...parsed.data,
            telefone: telefoneE164,
            ...utms,
          },
        },
      );
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      const search =
        typeof window !== "undefined" ? window.location.search : "";
      window.location.href = `/obrigado${search}`;
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Não foi possível enviar agora";
      setError(msg);
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="w-[calc(100vw-2rem)] max-w-md border-0 p-0 overflow-hidden"
        style={{
          background: "linear-gradient(180deg, #062234 0%, #031a28 100%)",
          color: "#fff",
        }}
      >
        <div style={{ padding: "1.5rem 1.25rem 1.25rem" }}>
          <DialogHeader>
            <DialogTitle
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
            </DialogTitle>
            <DialogDescription
              style={{
                color: "rgba(255,255,255,0.65)",
                fontSize: "0.875rem",
                textAlign: "left",
              }}
            >
              Preencha seus dados para receber o acesso prioritário.
            </DialogDescription>
          </DialogHeader>

          <form
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

            {/* Phone with country selector */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 7.5rem) 1fr",
                gap: "0.5rem",
              }}
            >
              <div style={{ position: "relative" }}>
                <select
                  value={country}
                  onChange={(e) => handleCountryChange(e.target.value as CountryCode)}
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
                      {c.flag} {c.code} {`+${getCountryCallingCode(c.code)}`}
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
                  country === "BR" ? "(11) 99999-9999" : `${callingCode} número`
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
      </DialogContent>
    </Dialog>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.85rem 0.9rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "16px", // prevents iOS zoom on focus
  outline: "none",
  fontFamily: "inherit",
};
