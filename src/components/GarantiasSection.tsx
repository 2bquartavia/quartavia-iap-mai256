import { Clock3, ShieldCheck, Check } from "lucide-react";
import PillButton from "@/components/PillButton";

type Garantia = {
  label: string;
  title: string;
  kicker: string;
  body: React.ReactNode;
  items: string[];
  Icon: typeof Clock3;
  accent: string;
};

const GARANTIAS: Garantia[] = [
  {
    label: "Garantia 01",
    title: "Garantia da Quarta-feira",
    kicker: "Até a 3ª noite · sem perguntas",
    body: (
      <>
        Se até a terceira noite você não estiver convencido, pede o reembolso.{" "}
        <span className="text-white font-semibold">
          Integral. Sem questionário.
        </span>{" "}
        Coloco na metade do evento porque confio no que entrego.
      </>
    ),
    items: [
      "Reembolso 100% integral",
      "Sem questionário ou justificativa",
      "Decisão no meio do evento",
    ],
    Icon: Clock3,
    accent: "#e6c674",
  },
  {
    label: "Garantia 02",
    title: "30 dias incondicionais",
    kicker: "Após a compra · qualquer motivo",
    body: (
      <>
        30 dias após a compra pra pedir reembolso por qualquer motivo.{" "}
        <span className="text-white font-semibold">
          Assiste tudo, aplica tudo, e ainda pede o dinheiro de volta.
        </span>{" "}
        O único risco é não estar lá.
      </>
    ),
    items: [
      "Reembolso por qualquer motivo",
      "Vale mesmo após assistir tudo",
      "Sem letras miúdas",
    ],
    Icon: ShieldCheck,
    accent: "#aebfc6",
  },
];

export default function GarantiasSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#031a28" }}
    >
      {/* Hairline topo */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      {/* Aurora sutil (uma só, bem suave — sem animação tosca) */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 left-1/4 h-[420px] w-[420px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: "radial-gradient(circle, #e6c674 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1100px] px-5 md:px-10 py-16 md:py-24">
        {/* Header */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60">
            <span aria-hidden className="block h-px w-7 bg-white/30" />
            Risco zero
            <span aria-hidden className="block h-px w-7 bg-white/30" />
          </span>
          <h2
            className="mt-4 md:mt-5 font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(1.85rem,4.6vw,3.4rem)]"
            style={{
              fontFamily:
                '"Source Serif 4", "Source Serif Pro", Georgia, serif',
            }}
          >
            Duas garantias.{" "}
            <em className="not-italic" style={{ color: "#e6c674" }}>
              Zero risco.
            </em>
          </h2>
        </div>

        {/* Grid editorial — duas colunas separadas por hairlines */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-2 border-t border-b border-white/15">
          {GARANTIAS.map((g, i) => {
            const Icon = g.Icon;
            const isFirst = i === 0;
            return (
              <article
                key={g.label}
                className={`px-5 md:px-8 py-8 md:py-10 ${
                  isFirst
                    ? "border-b md:border-b-0 md:border-r border-white/15"
                    : ""
                }`}
              >
                {/* Top: ícone com halo + label mono */}
                <div className="flex items-center gap-3">
                  <span
                    className="relative inline-flex h-8 w-8 md:h-9 md:w-9 items-center justify-center"
                    style={{
                      ["--halo-color" as never]: `${g.accent}80`,
                    }}
                  >
                    {/* Halos expansivos — anéis em sequência staggered */}
                    <span
                      aria-hidden
                      className="garantia-halo absolute inset-0 rounded-full"
                      style={{
                        border: `1.5px solid ${g.accent}`,
                        animation: "garantia-halo 3.2s ease-out infinite",
                      }}
                    />
                    <span
                      aria-hidden
                      className="garantia-halo absolute inset-0 rounded-full"
                      style={{
                        border: `1.5px solid ${g.accent}`,
                        animation: "garantia-halo 3.2s ease-out infinite 1.6s",
                      }}
                    />
                    {/* Disco do ícone com glow pulsante */}
                    <span
                      aria-hidden
                      className="garantia-glow relative inline-flex h-full w-full items-center justify-center rounded-full"
                      style={{
                        background: `${g.accent}15`,
                        boxShadow: `inset 0 0 0 1px ${g.accent}55`,
                        animation: "garantia-glow 3.2s ease-in-out infinite",
                      }}
                    >
                      <Icon
                        className="h-4 w-4 md:h-[17px] md:w-[17px]"
                        strokeWidth={2}
                        style={{ color: g.accent }}
                      />
                    </span>
                  </span>
                  <span
                    className="font-mono text-[10.5px] md:text-[11.5px] font-bold uppercase tracking-[0.22em]"
                    style={{ color: g.accent }}
                  >
                    {g.label}
                  </span>
                </div>

                {/* Title */}
                <h3
                  className="mt-4 md:mt-5 text-white font-semibold leading-[1.15] tracking-[-0.018em] text-[clamp(1.35rem,2.4vw,1.85rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  {g.title}
                </h3>

                {/* Kicker */}
                <p
                  className="mt-1.5 font-mono text-[10.5px] md:text-[11.5px] font-semibold uppercase tracking-[0.18em]"
                  style={{ color: `${g.accent}` }}
                >
                  {g.kicker}
                </p>

                {/* Body */}
                <p className="mt-4 md:mt-5 text-white/80 text-[14px] md:text-[15.5px] leading-[1.65]">
                  {g.body}
                </p>

                {/* Lista — checkmarks lucide simples */}
                <ul className="mt-5 md:mt-6 space-y-2.5">
                  {g.items.map((t) => (
                    <li
                      key={t}
                      className="flex items-start gap-2.5 text-white/75 text-[13px] md:text-[14.5px] leading-snug"
                    >
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 md:h-4 md:w-4 shrink-0"
                        strokeWidth={3}
                        style={{ color: g.accent }}
                      />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-10 md:mt-14 text-center">
          <PillButton
            label="Começar minha Engenharia Patrimonial — R$97"
            variant="gold"
            size="lg"
          />
          <p className="mt-4 text-white/55 text-[12px] md:text-[13px]">
            Pagamento seguro <span className="mx-2 opacity-50">//</span> Garantia
            dupla <span className="mx-2 opacity-50">//</span> Apenas 200
            Diagnósticos Individuais
          </p>
        </div>
      </div>
    </section>
  );
}
