import { Star } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import renatoOberg from "@/assets/renato-oberg.png";
import profissionalDiagnostico from "@/assets/profissional-diagnostico.png";

const PERFIL_FRASES = [
  "Renda acima de R$20 mil.",
  "Patrimônio que não reflete essa renda.",
  "Investimentos que mal acompanham a inflação real.",
  "Zero fontes de renda que funcionam sem eles.",
];

function FloatingPhrase({
  text,
  side,
  index,
  total,
  progress,
}: {
  text: string;
  side: "left" | "right";
  index: number;
  total: number;
  progress: number;
}) {
  // Cada frase ocupa uma fatia do progresso (0..1)
  const slice = 1 / total;
  const start = index * slice;
  const end = start + slice;
  const local = Math.min(1, Math.max(0, (progress - start) / (end - start)));

  // Animação: vem de cima (-40px) para a posição final
  const translateY = (1 - local) * -40;
  const opacity = local;

  return (
    <div
      className={`pointer-events-none absolute z-20 hidden md:block ${
        side === "left" ? "left-0 -translate-x-[55%]" : "right-0 translate-x-[55%]"
      }`}
      style={{
        // distribui verticalmente entre 10% e 85% da altura da imagem
        top: `${10 + (75 * index) / (total - 1)}%`,
      }}
    >
      <div
        className="rounded-xl px-4 py-3 border backdrop-blur-md shadow-lg whitespace-nowrap"
        style={{
          transform: `translateY(${translateY}px)`,
          opacity,
          transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
          background: "rgba(2,27,40,0.55)",
          borderColor: "rgba(2,27,40,0.35)",
          boxShadow: "0 10px 30px -10px rgba(2,27,40,0.45)",
        }}
      >
        <span className="text-white text-[14px] md:text-[15px] font-medium">
          → {text}
        </span>
      </div>
    </div>
  );
}

export default function DiagnosticoSection() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // progresso: 0 quando topo da img toca a base da viewport,
      // 1 quando base da img toca o topo da viewport
      const total = rect.height + vh;
      const passed = vh - rect.top;
      const p = Math.min(1, Math.max(0, passed / total));
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

        {/* Imagem do profissional com degradês + frases flutuantes */}
        <div ref={wrapperRef} className="relative mx-auto my-10 w-full max-w-[520px]">
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

          {/* Frases flutuantes alternando lados, ativadas pela rolagem */}
          {PERFIL_FRASES.map((frase, i) => (
            <FloatingPhrase
              key={i}
              text={frase}
              side={i % 2 === 0 ? "left" : "right"}
              index={i}
              total={PERFIL_FRASES.length}
              progress={progress}
            />
          ))}
        </div>

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
