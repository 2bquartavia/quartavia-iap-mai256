import { Star } from "lucide-react";

export default function DiagnosticoSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#031a28" }}
    >
      {/* Glow sutil de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[420px] opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(212,175,110,0.10), transparent 60%)",
        }}
      />

      <div className="relative mx-auto w-full max-w-[860px] px-5 md:px-8 py-16 md:py-24">
        {/* Card de depoimento */}
        <figure className="mx-auto rounded-2xl border border-white/15 bg-white/[0.04] backdrop-blur-sm px-6 md:px-9 py-7 md:py-8 shadow-2xl">
          <div className="flex items-center gap-1 text-[#d4af6e] mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current" strokeWidth={0} />
            ))}
          </div>
          <blockquote className="text-white text-[17px] md:text-[19px] leading-[1.55] font-medium">
            “Passei por 2 assessorias e 1 consultoria. Nenhuma me deu um plano real de construção de ativos. Aqui, o que foi prometido foi entregue.”
          </blockquote>
          <figcaption className="mt-4 text-white/70 text-[13px] md:text-[14px] uppercase tracking-[0.12em]">
            Renato Oberg <span className="text-white/40">— Médico</span>
          </figcaption>
        </figure>

        {/* Pergunta de abertura */}
        <h2 className="mt-14 md:mt-20 text-white font-semibold leading-[1.15] tracking-[-0.02em] text-[clamp(1.6rem,3.4vw,2.6rem)]">
          Deixa eu te fazer uma pergunta.
        </h2>

        <p className="mt-6 text-white/85 text-[17px] md:text-[19px] leading-[1.6]">
          Se você parar de trabalhar por <span className="text-white font-semibold">6 meses</span> — não por escolha, por necessidade — o que acontece?
        </p>

        <p className="mt-5 text-white/75 text-[16px] md:text-[17px] leading-[1.65]">
          A escola dos seus filhos continua sendo paga? O plano de saúde continua ativo? A parcela do apartamento continua caindo? O seguro, o condomínio, a viagem que você já prometeu?
        </p>

        <p className="mt-5 text-white/75 text-[16px] md:text-[17px] leading-[1.65]">
          Se a resposta é <em className="not-italic text-white">“aperta”</em> ou <em className="not-italic text-white">“não sei”</em>, você tem um problema. Mas não é o problema que você pensa.
        </p>

        {/* Bloco "Não é..." com barra lateral dourada */}
        <div className="mt-10 border-l-2 border-[#d4af6e]/70 pl-5 md:pl-6 space-y-4">
          <p className="text-white/85 text-[16px] md:text-[17px] leading-[1.65]">
            <span className="text-white font-semibold">Não é falta de renda.</span> Você ganha bem. Provavelmente melhor que 95% do país.
          </p>
          <p className="text-white/85 text-[16px] md:text-[17px] leading-[1.65]">
            <span className="text-white font-semibold">Não é falta de conhecimento.</span> Você já leu sobre investimentos, já montou carteira, já conversou com assessor.
          </p>
        </div>

        <p className="mt-10 text-white/80 text-[16px] md:text-[17px] leading-[1.65]">
          O problema é outro. Mais simples e mais grave ao mesmo tempo:
        </p>

        {/* Frase-âncora destacada */}
        <p className="mt-6 text-white text-[clamp(1.25rem,2.4vw,1.75rem)] font-semibold leading-[1.3] tracking-[-0.01em]">
          Você não tem <span className="text-[#d4af6e]">Engenharia Patrimonial</span>. Tem um amontoado de produtos financeiros que não conversam entre si, não geram renda e não constroem nada.
        </p>

        <p className="mt-10 text-white/75 text-[16px] md:text-[17px] leading-[1.65]">
          Eu sei disso porque já sentei com mais de <span className="text-white font-semibold">3.000 profissionais</span> nessa situação. Médicos, empresários, advogados, engenheiros. Gente que acorda cedo, dorme tarde e faz mais do que a maioria.
        </p>

        <p className="mt-5 text-white/75 text-[16px] md:text-[17px] leading-[1.65]">
          Quase todos tinham o mesmo perfil:
        </p>

        {/* Lista de perfil */}
        <ul className="mt-5 space-y-3">
          {[
            "Renda acima de R$20 mil.",
            "Patrimônio que não reflete essa renda.",
            "Investimentos que mal acompanham a inflação real.",
            "Zero fontes de renda que funcionam sem eles.",
          ].map((item) => (
            <li
              key={item}
              className="flex gap-3 text-white/85 text-[16px] md:text-[17px] leading-[1.6]"
            >
              <span aria-hidden className="mt-[10px] h-[6px] w-[6px] shrink-0 rounded-full bg-[#d4af6e]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-white/75 text-[16px] md:text-[17px] leading-[1.65]">
          E o que pouca gente admite: essa situação não fica só no extrato bancário. Ela entra no casamento. No sono. Na relação com os filhos. Já vi profissional de R$80 mil por mês com vergonha de falar de dinheiro em casa. Já vi empresário que ganha mais do que o pai sonhou ganhar na vida inteira e sente que não construiu nada de verdade.
        </p>

        <p className="mt-6 text-white/85 text-[16px] md:text-[17px] leading-[1.65]">
          Não é falta de esforço. <span className="text-white font-semibold">Você recebeu o diagnóstico errado</span> e passou anos tentando resolver o problema errado.
        </p>

        {/* Conclusão destacada */}
        <div className="mt-10 rounded-xl border border-[#d4af6e]/40 bg-[#d4af6e]/[0.06] px-6 md:px-8 py-6 md:py-7">
          <p className="text-white text-[clamp(1.15rem,2.1vw,1.5rem)] font-semibold leading-[1.35] tracking-[-0.01em]">
            Você não precisa investir melhor. Você precisa de <span className="text-[#d4af6e]">Engenharia Patrimonial</span>.
          </p>
        </div>

        <p className="mt-10 text-white/70 text-[16px] md:text-[17px] leading-[1.65] italic">
          E pra entender o que isso muda, precisa conhecer duas pessoas…
        </p>
      </div>
    </section>
  );
}
