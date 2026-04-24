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
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setT(getRemaining());
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
      className="relative z-20 px-4 -mt-8 md:-mt-10 -mb-8 md:-mb-10 pointer-events-none"
    >
      <div className="relative max-w-6xl mx-auto pointer-events-auto">
        <div
          className="mx-auto flex flex-nowrap items-center justify-center gap-3 md:gap-6 rounded-full px-4 md:px-8 py-2.5 md:py-3 w-fit max-w-full overflow-x-auto"
          style={{
            background: "rgba(20,14,6,0.45)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            border: "1px solid rgba(230,198,116,0.35)",
            boxShadow:
              "0 10px 40px -12px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          <span
            className="shrink-0 font-semibold uppercase tracking-[0.18em] text-[10px] md:text-xs whitespace-nowrap"
            style={{ color: "#E6C674" }}
          >
            O LOTE ZERO ABRE EM
          </span>

          <span
            aria-hidden
            className="hidden md:inline-block h-6 w-px"
            style={{ background: "rgba(230,198,116,0.35)" }}
          />

          <div className="flex items-center gap-1.5 md:gap-3 shrink-0">
            {items.map((it, i) => (
              <div key={it.label} className="flex items-center">
                <div className="flex items-baseline gap-1">
                  <span
                    className="font-semibold tabular-nums text-white leading-none"
                    style={{ fontSize: "clamp(1.1rem, 2.6vw, 1.6rem)" }}
                  >
                    {mounted ? it.value : "--"}
                  </span>
                  <span className="text-[9px] md:text-[10px] uppercase tracking-[0.14em] text-white/70">
                    {it.label}
                  </span>
                </div>
                {i < items.length - 1 && (
                  <span
                    className="mx-1 md:mx-2 font-light text-white/40"
                    style={{ fontSize: "clamp(1rem, 2.2vw, 1.4rem)" }}
                  >
                    :
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}