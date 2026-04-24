import { useEffect, useState } from "react";

// Domingo, 26/04/2026 às 09:00 (horário de Brasília, UTC-3)
const TARGET = new Date("2026-04-26T09:00:00-03:00").getTime();

function getRemaining() {
  const diff = Math.max(0, TARGET - Date.now());
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);
  return { d, h, m, s };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function CountdownBanner() {
  const [t, setT] = useState(getRemaining);

  useEffect(() => {
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const items: { label: string; value: string }[] = [
    { label: "dias", value: pad(t.d) },
    { label: "horas", value: pad(t.h) },
    { label: "min", value: pad(t.m) },
    { label: "seg", value: pad(t.s) },
  ];

  return (
    <section
      aria-label="Contagem regressiva para abertura do Lote ZERO"
      style={{ background: "#000" }}
      className="relative py-10 md:py-14 px-4"
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-60"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 50%, rgba(204,117,20,0.18), transparent 70%)",
        }}
      />
      <div className="relative max-w-3xl mx-auto text-center">
        <p
          className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em]"
          style={{ color: "#CC7514" }}
        >
          O LOTE ZERO ABRE EM
        </p>

        <div className="mt-5 flex items-stretch justify-center gap-2 md:gap-4">
          {items.map((it, i) => (
            <div key={it.label} className="flex items-stretch">
              <div
                className="flex flex-col items-center justify-center rounded-xl px-3 md:px-5 py-3 md:py-4 min-w-[64px] md:min-w-[92px]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(230,198,116,0.25)",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.06), 0 10px 30px -18px rgba(204,117,20,0.6)",
                }}
              >
                <span
                  className="font-semibold tabular-nums text-white leading-none"
                  style={{ fontSize: "clamp(1.75rem, 5vw, 2.75rem)" }}
                >
                  {it.value}
                </span>
                <span className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.18em] text-white/55">
                  {it.label}
                </span>
              </div>
              {i < items.length - 1 && (
                <span
                  className="self-center mx-1 md:mx-2 font-light text-white/30"
                  style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}
                >
                  :
                </span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-5 text-xs md:text-sm text-white/55">
          Domingo, 26/04 — 9h (horário de Brasília)
        </p>
      </div>
    </section>
  );
}