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
  const [mounted, setMounted] = useState(false);
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    setMounted(true);
    setT(getRemaining());
    const id = setInterval(() => setT(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const display = mounted
    ? `${pad(t.d)}d : ${pad(t.h)}h : ${pad(t.m)}m : ${pad(t.s)}s`
    : "--d : --h : --m : --s";

  return (
    <section
      aria-label="Contagem regressiva para abertura do Lote ZERO"
      className="relative w-full px-4 py-4 md:py-5"
      style={{
        background:
          "linear-gradient(90deg, #000 0%, #000 50%, #f5efe3 50%, #f5efe3 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-center">
        <span
          className="text-[11px] md:text-sm font-semibold uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ color: "#CC7514" }}
        >
          O LOTE ZERO ABRE EM
        </span>
        <span
          className="font-semibold tabular-nums whitespace-nowrap text-base md:text-xl"
          style={{ color: "#CC7514" }}
          suppressHydrationWarning
        >
          {display}
        </span>
        <span
          className="text-[11px] md:text-sm uppercase tracking-[0.2em] whitespace-nowrap"
          style={{ color: "#CC7514" }}
        >
          · Domingo, 26/04 — 9h (Brasília)
        </span>
      </div>
    </section>
  );
}
