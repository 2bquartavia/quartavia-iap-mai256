import PillButton from "@/components/PillButton";

export default function GarantiasSection() {
  return (
    <section className="relative w-full" style={{ background: "#031a28" }}>
      {/* Linha decorativa superior */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div className="mx-auto w-full max-w-[1180px] px-5 md:px-10 py-20 md:py-28">
        {/* Cabeçalho */}
        <div className="text-center max-w-[760px] mx-auto">
          <span className="inline-flex items-center text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-white/55">
            Compromisso QuartaVia
          </span>
          <h2
            className="mt-4 font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.4vw,3.4rem)]"
            style={{
              fontFamily:
                '"Source Serif 4", "Source Serif Pro", Georgia, serif',
            }}
          >
            Duas garantias. <em className="not-italic text-[#e6c674]">Zero risco.</em>
          </h2>
          <div
            aria-hidden
            className="mt-6 h-px w-24 mx-auto"
            style={{ background: "#ffffff", opacity: 0.4 }}
          />
        </div>

        {/* Selo central com "+" entre garantias */}
        <div className="relative mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Garantia 1 */}
          <article
            className="relative rounded-[22px] overflow-hidden p-7 md:p-9"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
            }}
          >
            {/* selo */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="relative h-14 w-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #f1d98a, #c9a24a 70%)",
                    boxShadow:
                      "0 0 0 4px rgba(201,162,74,0.18), 0 10px 30px -10px rgba(201,162,74,0.55)",
                  }}
                  aria-hidden
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#031a28"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-[#e6c674]">
                    Garantia 01
                  </p>
                  <h3
                    className="mt-1 text-white font-semibold leading-tight text-[clamp(1.4rem,2.4vw,1.9rem)]"
                    style={{
                      fontFamily:
                        '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                    }}
                  >
                    Garantia da Quarta-feira
                  </h3>
                </div>
              </div>
              <span className="hidden md:inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Até a 3ª noite
              </span>
            </div>

            <p className="mt-6 text-white/80 text-[15px] md:text-[16px] leading-[1.6]">
              Se até a terceira noite você não estiver convencido, pede o
              reembolso. <span className="text-white font-semibold">Integral. Sem perguntas.</span> Eu coloco na metade do evento
              porque confio no que entrego.
            </p>

            <ul className="mt-6 space-y-2 text-white/70 text-[13px] md:text-[14px]">
              {[
                "Reembolso integral",
                "Sem questionário",
                "Decisão no meio do evento",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#e6c674" }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </article>

          {/* "+" decorativo no centro (desktop) */}
          <div
            aria-hidden
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none"
          >
            <div
              className="h-12 w-12 rounded-full flex items-center justify-center text-[#031a28] font-bold text-[20px]"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, #f6f1e8, #d9cfbb)",
                boxShadow:
                  "0 0 0 6px #031a28, 0 10px 30px -10px rgba(0,0,0,0.6)",
              }}
            >
              +
            </div>
          </div>

          {/* Garantia 2 */}
          <article
            className="relative rounded-[22px] overflow-hidden p-7 md:p-9"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.12)",
              backdropFilter: "blur(6px)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div
                  className="relative h-14 w-14 rounded-full flex items-center justify-center shrink-0"
                  style={{
                    background:
                      "radial-gradient(circle at 30% 30%, #f6f1e8, #aebfc6 70%)",
                    boxShadow:
                      "0 0 0 4px rgba(255,255,255,0.12), 0 10px 30px -10px rgba(255,255,255,0.25)",
                  }}
                  aria-hidden
                >
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#031a28"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="9" />
                    <polyline points="12 7 12 12 15 14" />
                  </svg>
                </div>
                <div>
                  <p className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.22em] text-white/70">
                    Garantia 02
                  </p>
                  <h3
                    className="mt-1 text-white font-semibold leading-tight text-[clamp(1.4rem,2.4vw,1.9rem)]"
                    style={{
                      fontFamily:
                        '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                    }}
                  >
                    30 dias incondicionais
                  </h3>
                </div>
              </div>
              <span className="hidden md:inline-flex items-center rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70">
                Após a compra
              </span>
            </div>

            <p className="mt-6 text-white/80 text-[15px] md:text-[16px] leading-[1.6]">
              Você tem 30 dias após a compra pra pedir reembolso por qualquer
              motivo. <span className="text-white font-semibold">Pode assistir tudo, aplicar tudo, e ainda pedir o
              dinheiro de volta.</span> O risco é zero. O único risco é não estar
              lá.
            </p>

            <ul className="mt-6 space-y-2 text-white/70 text-[13px] md:text-[14px]">
              {[
                "Reembolso por qualquer motivo",
                "Vale após assistir o evento inteiro",
                "Sem letras miúdas",
              ].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <span
                    aria-hidden
                    className="inline-block h-1.5 w-1.5 rounded-full"
                    style={{ background: "#ffffff", opacity: 0.7 }}
                  />
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* CTA central */}
        <div className="mt-12 md:mt-16 text-center">
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