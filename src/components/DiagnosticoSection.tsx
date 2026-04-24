import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import renatoOberg from "@/assets/renato-oberg.png";
import profissionalDiagnostico from "@/assets/profissional-diagnostico.png";

const PERFIL_ITEMS = [
  "Renda acima de R$20 mil.",
  "Patrimônio que não reflete essa renda.",
  "Investimentos que mal acompanham a inflação real.",
  "Zero fontes de renda que funcionam sem eles.",
];

function ScrollPhrases() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progress: 0 quando o topo da seção atinge o topo da viewport;
      // 1 quando o final da seção sai pela parte de cima.
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / Math.max(1, total)));
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const n = PERFIL_ITEMS.length;
  // cada frase ocupa uma "fatia" da rolagem
  const slice = 1 / (n + 0.5);

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${(n + 1) * 100}vh` }}
    >
      <div className="sticky top-0 h-screen w-full flex items-center justify-center">
        <div className="relative w-full max-w-[640px] mx-auto px-5">
          {/* Imagem central sticky */}
          <div className="relative mx-auto w-full max-w-[420px]">
            <img
              src={profissionalDiagnostico}
              alt="Profissional concentrado diante do computador"
              className="w-full h-auto rounded-xl"
              loading="lazy"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-xl"
              style={{
                background:
                  "linear-gradient(to bottom, #FAEDDD 0%, rgba(250,237,221,0) 100%)",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 rounded-b-xl"
              style={{
                background:
                  "linear-gradient(to top, #FAEDDD 0%, rgba(250,237,221,0) 100%)",
              }}
            />

            {/* Frases alternadas */}
            {PERFIL_ITEMS.map((text, i) => {
              const start = i * slice;
              const end = start + slice;
              const local = (progress - start) / (end - start);
              const t = Math.max(0, Math.min(1, local));
              // entra de cima (-120px) e estaciona no centro (0) na metade do slice;
              // depois sai por baixo (+120px) na segunda metade.
              let translateY = 0;
              let opacity = 0;
              if (t < 0.5) {
                const k = t / 0.5; // 0 -> 1
                translateY = -140 + k * 140;
                opacity = k;
              } else {
                const k = (t - 0.5) / 0.5; // 0 -> 1
                translateY = k * 140;
                opacity = 1 - k;
              }
              const isLeft = i % 2 === 0;
              return (
                <div
                  key={i}
                  className="absolute top-1/2 -translate-y-1/2 w-[78%] sm:w-[70%] pointer-events-none"
                  style={{
                    left: isLeft ? "-12%" : "auto",
                    right: isLeft ? "auto" : "-12%",
                    transform: `translateY(calc(-50% + ${translateY}px))`,
                    opacity,
                    transition: "opacity 120ms linear",
                  }}
                >
                  <div
                    className="rounded-xl px-5 py-4 md:px-6 md:py-5 border"
                    style={{
                      background: "rgba(2,27,40,0.55)",
                      backdropFilter: "blur(14px) saturate(140%)",
                      WebkitBackdropFilter: "blur(14px) saturate(140%)",
                      borderColor: "rgba(250,237,221,0.18)",
                      boxShadow:
                        "0 20px 50px -20px rgba(2,27,40,0.55), inset 0 1px 0 rgba(250,237,221,0.08)",
                    }}
                  >
                    <p className="text-[#FAEDDD] text-[15px] md:text-[17px] font-medium leading-[1.35]">
                      {text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function DiagnosticoSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#FAEDDD" }}
    >
      {/* Glow sutil de fundo (azul) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-50"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(3,26,40,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[860px] px-5 md:px-8 py-16 md:py-24">
        {/* Card de depoimento */}
        <figure className="mx-auto rounded-2xl border border-[#031a28]/15 bg-white/60 backdrop-blur-sm px-6 md:px-9 py-7 md:py-8 shadow-xl">
          <div className="flex items-center gap-1 text-[#031a28] mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="text-[#031a28] text-[17px] md:text-[19px] leading-[1.55] font-medium">
            “Passei por 2 assessorias e 1 consultoria. Nenhuma me deu um plano real de construção de ativos. Aqui, o que foi prometido foi entregue.”
          </blockquote>
          <figcaption className="mt-5 flex items-center gap-3">
            <img
              src={renatoOberg}
              alt="Renato Oberg"
              className="h-10 w-10 rounded-full object-cover object-top ring-1 ring-[#031a28]/20"
              loading="lazy"
            />
            <span className="text-[#031a28]/70 text-[13px] md:text-[14px] uppercase tracking-[0.12em]">
              Renato Oberg <span className="text-[#031a28]/40">— Médico</span>
            </span>
          </figcaption>
        </figure>

        {/* Pergunta de abertura */}
        <h2 className="mt-14 md:mt-20 text-[#031a28] font-semibold leading-[1.15] tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
          Deixa eu te fazer uma pergunta.
        </h2>

        <p className="mt-6 text-[#031a28]/85 text-[17px] md:text-[19px] leading-[1.6]">
          Se você parar de trabalhar por <span className="text-[#031a28] font-semibold">6 meses</span> — não por escolha, por necessidade — o que acontece?
        </p>

        <p className="mt-5 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65]">
          A escola dos seus filhos continua sendo paga? O plano de saúde continua ativo? A parcela do apartamento continua caindo? O seguro, o condomínio, a viagem que você já prometeu?
        </p>

        <p className="mt-5 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65]">
          Se a resposta é <em className="not-italic text-[#031a28]">“aperta”</em> ou <em className="not-italic text-[#031a28]">“não sei”</em>, você tem um problema. Mas não é o problema que você pensa.
        </p>

        {/* Bloco "Não é..." com barra lateral azul */}
        <div className="mt-10 border-l-2 border-[#031a28]/60 pl-5 md:pl-6 space-y-4">
          <p className="text-[#031a28]/85 text-[16px] md:text-[17px] leading-[1.65]">
            <span className="text-[#031a28] font-semibold">Não é falta de renda.</span> Você ganha bem. Provavelmente melhor que 95% do país.
          </p>
          <p className="text-[#031a28]/85 text-[16px] md:text-[17px] leading-[1.65]">
            <span className="text-[#031a28] font-semibold">Não é falta de conhecimento.</span> Você já leu sobre investimentos, já montou carteira, já conversou com assessor.
          </p>
        </div>

        <p className="mt-10 text-[#031a28]/80 text-[16px] md:text-[17px] leading-[1.65]">
          O problema é outro. Mais simples e mais grave ao mesmo tempo:
        </p>

        {/* Frase-âncora destacada */}
        <p className="mt-6 text-[#031a28] text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-[1.3] tracking-[-0.01em]">
          Você não tem <span className="relative inline-block px-1">
            <span className="relative z-10">Engenharia Patrimonial</span>
            <span aria-hidden className="absolute inset-x-0 bottom-1 h-[6px] bg-[#031a28]/15 -z-0" />
          </span>. Tem um amontoado de produtos financeiros que não conversam entre si, não geram renda e não constroem nada.
        </p>

        <p className="mt-10 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65]">
          Eu sei disso porque já sentei com mais de <span className="text-[#031a28] font-semibold">3.000 profissionais</span> nessa situação. Médicos, empresários, advogados, engenheiros. Gente que acorda cedo, dorme tarde e faz mais do que a maioria. Quase todos tinham o mesmo perfil:
        </p>

        {/* Imagem sticky com frases entrando de cima */}
      </div>

      <ScrollPhrases />

      <div className="relative mx-auto w-full max-w-[860px] px-5 md:px-8 pb-16 md:pb-24">

        <p className="mt-10 text-[#031a28]/75 text-[16px] md:text-[17px] leading-[1.65]">
          E o que pouca gente admite: essa situação não fica só no extrato bancário. Ela entra no casamento. No sono. Na relação com os filhos. Já vi profissional de R$80 mil por mês com vergonha de falar de dinheiro em casa. Já vi empresário que ganha mais do que o pai sonhou ganhar na vida inteira e sente que não construiu nada de verdade.
        </p>

        <p className="mt-6 text-[#031a28]/85 text-[16px] md:text-[17px] leading-[1.65]">
          Não é falta de esforço. <span className="text-[#031a28] font-semibold">Você recebeu o diagnóstico errado</span> e passou anos tentando resolver o problema errado.
        </p>

        {/* Conclusão destacada */}
        <div className="mt-10 rounded-xl border border-[#031a28]/25 bg-[#031a28]/[0.05] px-6 md:px-8 py-6 md:py-7">
          <p className="text-[#031a28] text-[clamp(1.15rem,2.1vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.01em]">
            Você não precisa investir melhor. Você precisa de <span className="underline decoration-[#031a28]/40 underline-offset-4">Engenharia Patrimonial</span>.
          </p>
        </div>

        <p className="mt-10 text-[#031a28]/70 text-[16px] md:text-[17px] leading-[1.65] italic">
          E pra entender o que isso muda, precisa conhecer duas pessoas…
        </p>
      </div>
    </section>
  );
}
