import { useEffect, useState, type FormEvent } from "react";
import { z } from "zod";

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

const schema = z.object({
  nome: z.string().trim().min(2, "Informe seu nome").max(120),
  email: z.string().trim().email("E-mail inválido").max(255),
  telefone: z
    .string()
    .trim()
    .min(8, "Telefone inválido")
    .max(40, "Telefone inválido"),
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
  const [telefone, setTelefone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) {
      setError(null);
      setSubmitting(false);
    }
  }, [open]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    const parsed = schema.safeParse({ nome, email, telefone });
    if (!parsed.success) {
      setError(parsed.error.issues[0]?.message ?? "Verifique os dados");
      return;
    }

    setSubmitting(true);
    try {
      const utms = getUtms();
      const { data, error: fnError } = await supabase.functions.invoke(
        "ac-subscribe",
        {
          body: { ...parsed.data, ...utms },
        },
      );
      if (fnError) throw fnError;
      if (data?.error) throw new Error(data.error);

      // success → redirect to thank-you page, preserving UTMs
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
        className="sm:max-w-md border-0 p-0 overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, #062234 0%, #031a28 100%)",
          color: "#fff",
        }}
      >
        <div style={{ padding: "1.75rem 1.5rem 1.5rem" }}>
          <DialogHeader>
            <DialogTitle
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.35rem",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "#fff",
              }}
            >
              Garanta sua vaga no Lote ZERO
            </DialogTitle>
            <DialogDescription
              style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}
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
              marginTop: "1.25rem",
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
              style={inputStyle}
            />
            <input
              type="tel"
              placeholder="WhatsApp com DDD"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              autoComplete="tel"
              required
              maxLength={40}
              style={inputStyle}
            />

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
  padding: "0.85rem 1rem",
  borderRadius: "0.75rem",
  border: "1px solid rgba(255,255,255,0.12)",
  background: "rgba(255,255,255,0.04)",
  color: "#fff",
  fontSize: "0.95rem",
  outline: "none",
};
