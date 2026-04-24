import PillButton from "@/components/PillButton";

export default function GarantiasSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#031a28" }}
    >
      {/* Aurora animada de fundo */}
      <div aria-hidden className="absolute inset-0 pointer-events-none">
        <div
          className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full opacity-[0.18] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #e6c674 0%, transparent 70%)",
            animation: "garantia-orb-1 14s ease-in-out infinite",
          }}
        />
        <div
          className="absolute -bottom-40 -right-32 h-[520px] w-[520px] rounded-full opacity-[0.14] blur-3xl"
          style={{
            background:
              "radial-gradient(circle, #aebfc6 0%, transparent 70%)",
            animation: "garantia-orb-2 18s ease-in-out infinite",
          }}
        />
      </div>

      {/* Linha decorativa superior */}
      <div
        aria-hidden
        className="h-px w-full"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(255,255,255,0.18), transparent)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[1180px] px-5 md:px-10 py-20 md:py-28">
        {/* Cabeçalho */}
        <div className="text-center max-w-[780px] mx-auto">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#e6c674]/30 bg-[#e6c674]/[0.06] px-4 py-1.5 text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#e6c674]">
            <span
              className="h-1.5 w-1.5 rounded-full bg-[#e6c674]"
              style={{ animation: "garantia-pulse 2s ease-in-out infinite" }}
            />
            Blindagem dupla
          </span>
          <h2
            className="mt-5 font-semibold text-white leading-[1.05] tracking-[-0.02em] text-[clamp(2rem,4.6vw,3.6rem)]"
            style={{
              fontFamily:
                '"Source Serif 4", "Source Serif Pro", Georgia, serif',
            }}
          >
            Você arrisca <em className="not-italic text-[#e6c674]">zero</em>.
            <br className="hidden md:block" /> Eu arrisco{" "}
            <em className="not-italic text-[#e6c674]">tudo</em>.
          </h2>
          <p className="mt-5 text-white/65 text-[15px] md:text-[17px] leading-[1.6] max-w-[640px] mx-auto">
            Duas camadas de proteção sobrepostas. Se em qualquer momento você
            achar que não vale, o dinheiro volta. Inteiro.
          </p>
        </div>

        {/* Cartões de garantia */}
        <div className="relative mt-14 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {/* Garantia 1 */}
          <article
            className="group relative rounded-[24px] p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(160deg, rgba(230,198,116,0.08), rgba(255,255,255,0.02))",
              border: "1px solid rgba(230,198,116,0.22)",
              boxShadow:
                "0 30px 80px -40px rgba(230,198,116,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            {/* Borda animada (shimmer) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[24px] opacity-60"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(230,198,116,0.35) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "garantia-shimmer 6s linear infinite",
                mixBlendMode: "overlay",
              }}
            />

            {/* Selo flutuante */}
            <div
              className="absolute -top-7 left-8 flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: "linear-gradient(135deg, #f1d98a, #c9a24a)",
                color: "#031a28",
                boxShadow:
                  "0 14px 30px -10px rgba(201,162,74,0.6), inset 0 1px 0 rgba(255,255,255,0.5)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#031a28]"
                style={{ animation: "garantia-pulse 1.6s ease-in-out infinite" }}
              />
              Garantia 01
            </div>

            <div className="relative flex items-start gap-5">
              <div
                className="relative h-20 w-20 shrink-0 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #f6e3a8, #c9a24a 70%)",
                  boxShadow:
                    "0 0 0 6px rgba(201,162,74,0.12), 0 20px 40px -16px rgba(201,162,74,0.55)",
                  animation: "garantia-float 6s ease-in-out infinite",
                }}
                aria-hidden
              >
                <span
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.45), transparent 40%)",
                    animation: "garantia-spin 8s linear infinite",
                    mixBlendMode: "overlay",
                  }}
                />
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#031a28"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative"
                >
                  <path d="M12 2 4 6v6c0 5 3.5 9 8 10 4.5-1 8-5 8-10V6l-8-4z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </div>

              <div className="pt-2">
                <h3
                  className="text-white font-semibold leading-[1.1] text-[clamp(1.5rem,2.6vw,2.1rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  Garantia da Quarta-feira
                </h3>
                <p className="mt-1 text-[#e6c674] text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em]">
                  Até a 3ª noite · sem perguntas
                </p>
              </div>
            </div>

            <p className="relative mt-7 text-white/85 text-[15px] md:text-[17px] leading-[1.65]">
              Se até a terceira noite você não estiver convencido, pede o
              reembolso.{" "}
              <span className="text-white font-semibold">
                Integral. Sem questionário.
              </span>{" "}
              Coloco na metade do evento porque confio no que entrego.
            </p>

            <ul className="relative mt-7 space-y-3">
              {[
                "Reembolso 100% integral",
                "Sem questionário ou justificativa",
                "Decisão no meio do evento",
              ].map((t, i) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-white/80 text-[14px] md:text-[15px]"
                  style={{
                    animation: `garantia-fade-up 0.6s ease-out ${i * 0.1}s both`,
                  }}
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #f1d98a, #c9a24a)",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#031a28"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </article>

          {/* Conector animado central */}
          <div
            aria-hidden
            className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center justify-center pointer-events-none z-10"
          >
            <div className="relative h-16 w-16">
              <span
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "radial-gradient(circle, rgba(230,198,116,0.4), transparent 70%)",
                  animation: "garantia-pulse-ring 2.5s ease-out infinite",
                }}
              />
              <div
                className="relative h-16 w-16 rounded-full flex items-center justify-center text-[#031a28] font-bold text-[24px]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #f6f1e8, #d9cfbb)",
                  boxShadow:
                    "0 0 0 6px #031a28, 0 14px 40px -10px rgba(0,0,0,0.7)",
                }}
              >
                +
              </div>
            </div>
          </div>

          {/* Garantia 2 */}
          <article
            className="group relative rounded-[24px] p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1"
            style={{
              background:
                "linear-gradient(160deg, rgba(255,255,255,0.07), rgba(255,255,255,0.02))",
              border: "1px solid rgba(255,255,255,0.18)",
              boxShadow:
                "0 30px 80px -40px rgba(174,191,198,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
            }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[24px] opacity-50"
              style={{
                background:
                  "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%)",
                backgroundSize: "200% 100%",
                animation: "garantia-shimmer 7s linear infinite",
                mixBlendMode: "overlay",
              }}
            />

            <div
              className="absolute -top-7 left-8 flex items-center gap-2 rounded-full px-4 py-2 text-[10px] font-bold uppercase tracking-[0.22em]"
              style={{
                background: "linear-gradient(135deg, #f6f1e8, #aebfc6)",
                color: "#031a28",
                boxShadow:
                  "0 14px 30px -10px rgba(174,191,198,0.6), inset 0 1px 0 rgba(255,255,255,0.6)",
              }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-[#031a28]"
                style={{ animation: "garantia-pulse 1.6s ease-in-out infinite" }}
              />
              Garantia 02
            </div>

            <div className="relative flex items-start gap-5">
              <div
                className="relative h-20 w-20 shrink-0 rounded-2xl flex items-center justify-center"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, #ffffff, #aebfc6 70%)",
                  boxShadow:
                    "0 0 0 6px rgba(255,255,255,0.08), 0 20px 40px -16px rgba(255,255,255,0.25)",
                  animation: "garantia-float 6s ease-in-out infinite 1s",
                }}
                aria-hidden
              >
                <span
                  className="absolute inset-0 rounded-2xl"
                  style={{
                    background:
                      "conic-gradient(from 180deg, transparent, rgba(255,255,255,0.5), transparent 40%)",
                    animation: "garantia-spin 9s linear infinite reverse",
                    mixBlendMode: "overlay",
                  }}
                />
                <svg
                  width="34"
                  height="34"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#031a28"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="relative"
                >
                  <circle cx="12" cy="12" r="9" />
                  <polyline points="12 7 12 12 15 14" />
                </svg>
              </div>

              <div className="pt-2">
                <h3
                  className="text-white font-semibold leading-[1.1] text-[clamp(1.5rem,2.6vw,2.1rem)]"
                  style={{
                    fontFamily:
                      '"Source Serif 4", "Source Serif Pro", Georgia, serif',
                  }}
                >
                  30 dias incondicionais
                </h3>
                <p className="mt-1 text-white/65 text-[12px] md:text-[13px] font-semibold uppercase tracking-[0.18em]">
                  Após a compra · qualquer motivo
                </p>
              </div>
            </div>

            <p className="relative mt-7 text-white/85 text-[15px] md:text-[17px] leading-[1.65]">
              30 dias após a compra pra pedir reembolso por qualquer motivo.{" "}
              <span className="text-white font-semibold">
                Assiste tudo, aplica tudo, e ainda pede o dinheiro de volta.
              </span>{" "}
              O único risco é não estar lá.
            </p>

            <ul className="relative mt-7 space-y-3">
              {[
                "Reembolso por qualquer motivo",
                "Vale mesmo após assistir tudo",
                "Sem letras miúdas",
              ].map((t, i) => (
                <li
                  key={t}
                  className="flex items-center gap-3 text-white/80 text-[14px] md:text-[15px]"
                  style={{
                    animation: `garantia-fade-up 0.6s ease-out ${0.3 + i * 0.1}s both`,
                  }}
                >
                  <span
                    aria-hidden
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      background:
                        "linear-gradient(135deg, #ffffff, #aebfc6)",
                    }}
                  >
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#031a28"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </article>
        </div>

        {/* Faixa de reforço */}
        <div
          className="relative mt-12 md:mt-16 mx-auto max-w-[820px] rounded-2xl px-6 py-5 text-center"
          style={{
            background:
              "linear-gradient(90deg, rgba(230,198,116,0.08), rgba(255,255,255,0.05), rgba(230,198,116,0.08))",
            border: "1px solid rgba(230,198,116,0.2)",
          }}
        >
          <p className="text-white/85 text-[14px] md:text-[16px]">
            <span className="font-semibold text-[#e6c674]">
              Eu absorvo o risco.
            </span>{" "}
            Você só precisa aparecer e aplicar.
          </p>
        </div>

        {/* CTA central */}
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

      {/* Keyframes */}
      <style>{`
        @keyframes garantia-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(60px, 40px) scale(1.1); }
        }
        @keyframes garantia-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-50px, -30px) scale(1.15); }
        }
        @keyframes garantia-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.4); }
        }
        @keyframes garantia-pulse-ring {
          0% { transform: scale(0.8); opacity: 0.8; }
          100% { transform: scale(1.8); opacity: 0; }
        }
        @keyframes garantia-shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes garantia-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        @keyframes garantia-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes garantia-fade-up {
          0% { opacity: 0; transform: translateY(8px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}