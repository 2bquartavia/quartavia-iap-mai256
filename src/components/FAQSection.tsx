import { useState } from "react";
import { Plus, HelpCircle } from "lucide-react";

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "O que é a Imersão Alavanca Patrimonial?",
    a: [
      "São 5 encontros ao vivo com Adrian Carvalho, de 25 a 29 de maio, sempre às 20h.",
      "Não é um curso. Não é uma palestra de motivação financeira. É uma imersão estratégica onde você vai entender, na prática, como funciona a Engenharia Patrimonial — e sair com um plano real de construção de ativos que geram renda sem depender do seu trabalho.",
    ],
  },
  {
    q: "Para quem é essa Imersão?",
    a: [
      "Para empresários e profissionais com renda acima de R$20 mil mensais que já venceram o jogo da renda — mas ainda não estruturaram o jogo do patrimônio.",
      "Se você gera dinheiro com consistência, mas sua segurança financeira ainda depende do seu trabalho direto, essa Imersão existe pra mudar isso.",
    ],
  },
  {
    q: "Preciso ter experiência em finanças ou investimentos?",
    a: [
      "Não. O método não parte de produtos financeiros nem exige conhecimento prévio. Ele parte de decisão, estrutura e lógica patrimonial.",
      "Funciona tanto pra quem nunca investiu quanto pra quem já investe, mas sente falta de clareza e estratégia de longo prazo.",
    ],
  },
  {
    q: "Preciso ter imóvel ou dinheiro guardado pra participar?",
    a: [
      "Não. O método parte da sua renda e da sua capacidade de geração — não do que você já tem acumulado. Ele se adapta tanto a quem está estruturando os primeiros ativos quanto a quem já tem patrimônio, mas sente que tudo está desconectado.",
    ],
  },
  {
    q: "O que vou ver em cada noite?",
    a: [
      "Noite 1 — Os fundamentos da construção de patrimônio e o Quarto Caminho explicado.",
      "Noite 2 — O mapa da renda passiva e os 3 motores do patrimônio.",
      "Noite 3 — O arsenal de mecanismos da economia real: leilão, consórcio, incorporação, crédito estruturado (Garantia da Quarta-feira entra aqui).",
      "Noite 4 — Os mercados milenares: imobiliário, agro e energia pela Zona de Originação.",
      "Noite 5 — O mecanismo de alavancagem: como adquirir ativos sem tirar dinheiro do bolso.",
    ],
  },
  {
    q: "Em quanto tempo começo a ver resultado?",
    a: [
      "A aplicação começa imediatamente. Os sistemas de decisão e estruturação geram ganhos rápidos de clareza e controle financeiro. O modelo completo foi projetado para conduzir à liberdade patrimonial em até 7 anos — com método, não com improviso.",
    ],
  },
  {
    q: "Já participei de outros eventos de finanças. Por que esse é diferente?",
    a: [
      "Porque a Imersão não ensina onde investir. Ensina como pensar e estruturar patrimônio.",
      "A maioria dos eventos foca em produtos, rentabilidade ou oportunidades pontuais. O Quarto Caminho foca no sistema que vem antes disso: comportamento, engenharia financeira e estratégia patrimonial integrada.",
      "É a diferença entre investir melhor — e construir patrimônio de forma inevitável.",
    ],
  },
  {
    q: "O evento é teórico ou prático?",
    a: [
      "Essencialmente prático. Você vai ver casos reais de famílias atendidas, simulações patrimoniais e ferramentas como o Canva da Construção Patrimonial. No final das 5 noites, você sai com um Caderno de Implementação preenchido — com onde você está, o que tem, o que falta e quais são os próximos passos.",
    ],
  },
  {
    q: "Por que custa R$67 se o conteúdo é tão avançado?",
    a: [
      "Porque essa Imersão foi desenhada como porta de entrada para profissionais de alta renda que querem estruturar seu patrimônio de forma sistêmica — antes de qualquer decisão patrimonial mais profunda.",
      "Você não está pagando pelo \"valor total do conhecimento\". Está pagando pelo acesso ao método, à clareza e ao modelo mental que já foi aplicado em mais de 3.000 famílias.",
      "O preço não reflete o valor do conteúdo. Reflete a intenção de tornar esse acesso irrecusável.",
    ],
  },
  {
    q: "Qual é a garantia?",
    a: [
      "Duas garantias.",
      "A Garantia da Quarta-feira: se até a terceira noite você não estiver convencido de que o método é real e aplicável à sua vida, pede o reembolso. Integral. Sem perguntas.",
      "A Garantia de 30 dias: além da garantia da quarta-feira, você tem 30 dias após a compra pra pedir reembolso por qualquer motivo.",
      "Na prática: você pode assistir toda a Imersão, aplicar o conteúdo, e ainda assim pedir o dinheiro de volta. O risco é zero.",
    ],
  },
  {
    q: "Quem conduz a Imersão?",
    a: [
      "Adrian Carvalho — empresário, investidor e fundador da Quarta Via. CFP certificado. Mais de 3.000 famílias atendidas pessoalmente. Responsável pelo aconselhamento de mais de R$3 bilhões em patrimônio.",
      "Essa Imersão é a forma mais direta de acessar o modelo mental e estratégico que antecede o trabalho patrimonial realizado com seus clientes privados.",
    ],
  },
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{ background: "#FAEDDD" }}
    >
      {/* decorative orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, #f4d4a8 0%, transparent 70%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 -right-32 h-[480px] w-[480px] rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, #e8c89c 0%, transparent 70%)" }}
      />

      <div className="relative wrap mx-auto max-w-[1100px] px-5">
        {/* header */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#0b2a3a]/15 bg-white/60 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0b2a3a]/70 backdrop-blur-sm">
            <HelpCircle className="h-3.5 w-3.5" />
            Perguntas frequentes
          </span>
          <h2 className="mt-5 font-serif text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] text-[#0b2a3a]">
            Perguntas Frequentes
          </h2>
        </div>

        {/* accordion */}
        <ul className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = open === i;
            return (
              <li
                key={i}
                className={[
                  "group rounded-2xl border bg-white/70 backdrop-blur-sm transition-all duration-300",
                  isOpen
                    ? "border-[#0b2a3a]/25 shadow-[0_18px_40px_-22px_rgba(11,42,58,0.35)]"
                    : "border-[#0b2a3a]/10 hover:border-[#0b2a3a]/20 hover:bg-white/85",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center gap-5 px-6 py-5 text-left md:px-8 md:py-6"
                >
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-serif text-[14px] font-semibold transition-colors",
                      isOpen
                        ? "bg-[#0b2a3a] text-[#FAEDDD]"
                        : "bg-[#0b2a3a]/8 text-[#0b2a3a]/70 group-hover:bg-[#0b2a3a]/15",
                    ].join(" ")}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 font-serif text-[17px] leading-snug text-[#0b2a3a] md:text-[19px]">
                    {item.q}
                  </span>
                  <span
                    className={[
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                      isOpen
                        ? "rotate-45 border-[#0b2a3a] bg-[#0b2a3a] text-[#FAEDDD]"
                        : "border-[#0b2a3a]/25 text-[#0b2a3a]/70",
                    ].join(" ")}
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </button>

                <div
                  className="grid overflow-hidden transition-[grid-template-rows] duration-400 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 pl-[4.25rem] md:px-8 md:pb-7 md:pl-[5.25rem]">
                      <div className="mb-4 h-px w-12 bg-[#0b2a3a]/20" />
                      <div className="space-y-3 text-[15px] leading-relaxed text-[#0b2a3a]/75">
                        {item.a.map((p, j) => (
                          <p key={j}>{p}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

      </div>
    </section>
  );
}