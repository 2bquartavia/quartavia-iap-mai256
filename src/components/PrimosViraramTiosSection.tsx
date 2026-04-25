import { useEffect, useRef } from "react";
import { Quote, Sparkles } from "lucide-react";
import PillButton from "@/components/PillButton";

type Depo = {
  quote: string;
  name: string;
  role: string;
  badge?: string;
};

const DEPOIMENTOS: Depo[] = [
  {
    quote:
      "Trabalhava 14 horas por dia achando que o problema era ganhar pouco. Depois de 18 meses, tenho R$12 mil por mês entrando sem depender de plantão. Hoje trabalho porque quero.",
    name: "Dr. Felipe Hurtado",
    role: "Médico — era primo, virou tio",
  },
  {
    quote:
      "Tinha dinheiro parado em fundo que rendia 8% ao ano. Em uma única operação na economia real, tive ganho de capital equivalente a 3 anos dessa rentabilidade. O ativo continua gerando renda.",
    name: "Leonardo Akira",
    role: "Empresário",
  },
  {
    quote:
      "Meu medo era investir errado. Pela primeira vez, sei quais são os próximos 3 ativos que vou adquirir — e como adquiri-los sem tirar do bolso.",
    name: "Mariana Franceschini",
    role: "Profissional de alta renda",
  },
  {
    quote:
      "Passei por 2 assessorias e 1 consultoria financeira. Nenhuma me deu um plano real. Aqui, o que foi prometido foi entregue. Simples.",
    name: "Renato Oberg",
    role: "Profissional",
  },
  {
    quote:
      "Ganhava R$45 mil por mês e não sobrava nada. Não era problema de renda — era problema de arquitetura. Em 12 meses, montei 2 operações que geram R$8 mil passivos. Nunca mais olhei pra rentabilidade de fundo.",
    name: "Participante PHARUS",
    role: "Empresário, 41 anos",
    badge: "PHARUS",
  },
  {
    quote:
      "Minha esposa já não acreditava mais que eu ia resolver isso. Depois de aplicar o método, pela primeira vez ela viu o patrimônio sendo construído de verdade. Não é conta em corretora — e escritura.",
    name: "Participante PHARUS",
    role: "Advogado, 47 anos",
    badge: "PHARUS",
  },
  {
    quote:
      "Eu era o primo clássico: CFP, 3 certificações, R$1.2M em investimentos financeiros que mal batiam a inflação. Em 2 anos aplicando as alavancas, construir mais patrimônio real do que nos 10 anos anteriores.",
    name: "Participante PHARUS",
    role: "Profissional de mercado financeiro, 38 anos",
    badge: "PHARUS",
  },
];

export default function PrimosViraramTiosSection() {
  const loop = [...DEPOIMENTOS, ...DEPOIMENTOS, ...DEPOIMENTOS];
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const cycle = track.scrollWidth / 3;
    track.scrollLeft = cycle;

    const BASE_SPEED = 70;
    let pointerDown = false;
    let draggingHorizontally = false;
    let startX = 0;
    let startY = 0;

    const tick = (t: number) => {
      if (document.body.classList.contains("lead-modal-open")) {
        lastTimeRef.current = t;
        rafRef.current = requestAnimationFrame(tick);
        return;
      }
      if (!lastTimeRef.current) lastTimeRef.current = t;
      const dt = Math.min((t - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = t;

      if (!draggingHorizontally) {
        track.scrollLeft += BASE_SPEED * dt;
      }

      const c = track.scrollWidth / 3;
      if (track.scrollLeft >= c * 2) track.scrollLeft -= c;
      else if (track.scrollLeft <= 0) track.scrollLeft += c;

      updateCenter();
      rafRef.current = requestAnimationFrame(tick);
    };

    const updateCenter = () => {
      const rect = track.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      let bestEl: HTMLElement | null = null;
      let bestDist = Infinity;
      track.querySelectorAll<HTMLElement>(".depo-card").forEach((el) => {
        const r = el.getBoundingClientRect();
        const c = r.left + r.width / 2;
        const d = Math.abs(c - centerX);
        if (d < bestDist) {
          bestDist = d;
          bestEl = el;
        }
      });
      track.querySelectorAll(".depo-card.is-center").forEach((el) => {
        if (el !== bestEl) el.classList.remove("is-center");
      });
      if (bestEl) (bestEl as HTMLElement).classList.add("is-center");
    };

    const beginGesture = (x: number, y: number) => {
      pointerDown = true;
      draggingHorizontally = false;
      startX = x;
      startY = y;
    };
    const trackGesture = (x: number, y: number) => {
      if (!pointerDown) return;
      const dx = Math.abs(x - startX);
      const dy = Math.abs(y - startY);
      draggingHorizontally = dx > dy && dx > 8;
    };
    const endGesture = () => {
      pointerDown = false;
      draggingHorizontally = false;
    };

    const onTouchStart = (e: TouchEvent) =>
      beginGesture(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e: TouchEvent) =>
      trackGesture(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchEnd = () => endGesture();
    const onMouseDown = (e: MouseEvent) => beginGesture(e.clientX, e.clientY);
    const onMouseMove = (e: MouseEvent) => trackGesture(e.clientX, e.clientY);
    const onMouseUp = () => endGesture();

    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });
    track.addEventListener("touchcancel", onTouchEnd, { passive: true });
    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    track.addEventListener("scroll", updateCenter, { passive: true });

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
      track.removeEventListener("touchcancel", onTouchEnd);
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      track.removeEventListener("scroll", updateCenter);
    };
  }, []);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FAEDDD" }}
    >
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8 pt-20 md:pt-20 pb-6 md:pb-8">
        <header className="text-center max-w-[760px] mx-auto mb-6 md:mb-8">
          <span className="inline-flex items-center gap-2 text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.24em] text-[#031a28]/65">
            <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
            <Sparkles className="h-3 w-3" /> Provas reais · 1.917 famílias
            <span aria-hidden className="block h-px w-7 bg-[#031a28]/40" />
          </span>
          <h2 className="mt-4 md:mt-5 text-[#031a28] font-semibold leading-[1.12] tracking-[-0.02em] text-[clamp(1.7rem,3.6vw,2.7rem)]">
            Primos que viraram tios.
          </h2>
        </header>
      </div>

      <div className="depo-carousel">
        <div ref={trackRef} className="depo-track">
          {loop.map((d, i) => (
            <article key={i} className="depo-card">
              <div className="depo-card__inner">
                {d.badge && (
                  <span className="absolute -top-2.5 right-6 inline-flex items-center rounded-full bg-[#FAEDDD] text-[#031a28] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] shadow-md z-10">
                    {d.badge}
                  </span>
                )}
                <Quote
                  aria-hidden
                  className="h-7 w-7 text-white/40 mb-4 shrink-0"
                  strokeWidth={2}
                />
                <p className="text-white text-[15px] md:text-[16px] leading-[1.7] flex-1">
                  {d.quote}
                </p>
                <div className="mt-6 pt-5 border-t border-white/15">
                  <p className="text-white font-semibold text-[15px]">
                    {d.name}
                  </p>
                  <p className="text-white/65 text-[12.5px] mt-0.5">
                    {d.role}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1280px] px-5 md:px-8 pb-20 md:pb-20">
        <div
          className="max-w-[820px] mx-auto rounded-2xl px-8 md:px-12 py-12 md:py-14 text-center shadow-2xl mt-8 md:mt-10"
          style={{
            background: "linear-gradient(180deg, #042234 0%, #021b28 100%)",
          }}
        >
          <p className="text-white/70 text-[13px] md:text-[14px] uppercase tracking-[0.16em] font-semibold mb-4">
            Sua vez
          </p>
          <p className="text-white text-[clamp(1.15rem,2vw,1.5rem)] font-semibold leading-[1.5] tracking-[-0.01em] max-w-[600px] mx-auto">
            Junte-se a{" "}
            <span className="text-[#FAEDDD]">1.917 famílias</span> que
            escolheram o caminho do tio.
          </p>

          <div className="mt-8 inline-block relative">
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-3 rounded-full blur-2xl opacity-70"
              style={{
                background:
                  "radial-gradient(ellipse at center, rgba(250,237,221,0.45), rgba(250,237,221,0.15) 50%, transparent 75%)",
              }}
            />
            <div className="relative">
              <PillButton
                label="Entrar na Imersão com garantia — R$97"
                variant="gold"
                size="lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
