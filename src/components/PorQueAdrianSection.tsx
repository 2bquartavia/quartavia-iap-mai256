import adrianEsposa from "@/assets/adrian-esposa.jpg";

const paragrafos = [
  "Eu fui primo durante 10 anos.",
  "Comecei como estagiário num escritório de investimentos. Passei no CFP. Virei sócio de um dos maiores escritórios do Brasil. Atendia famílias com patrimônios de R$5 milhões a R$500 milhoes.",
  "E nos primeiros anos, eu acreditava no que vendia.",
  "Até que percebi que meus próprios investimentos — supostamente os melhores, montados pelos melhores analistas — andavam de lado. Enquanto os poucos ativos que eu tinha na economia real cresciam mais rápido, com menos risco e com mais previsibilidade.",
  "E percebi outra coisa: todos os bilionários que eu atendia tinham construído patrimônio na economia real. Nenhum no mercado financeiro. Eles usavam o mercado financeiro pra guardar dinheiro. Não pra construir. Eram todos tios.",
  "Decidi seguir um caminho diferente. Abri mão de R$4 a 5 milhões em participação. Só tive coragem porque meu patrimônio pessoal — construído pelo mesmo método que vou te mostrar na Imersão — já me sustentava. Eu não tinha pago por esses ativos. Eles se pagaram sozinhos.",
  "Hoje: mais de 100 ativos. Imóveis, usinas solares, operações imobiliárias estruturadas, carros antigos (Sim, são ativos. Pelos menos é a desculpa que dou pra minha esposa kkkk), imóveis nos Estados Unidos. Nenhum depende de mim.",
  "Eu criei a QuartaVia pra entregar Engenharia Patrimonial a quem não tem R$5 milhões pra contratar um family office. Nos últimos anos, 1.917 famílias fizeram a transição de primo pra tio com esse método. E em 5 noites por R$97, eu vou te mostrar como.",
];

export default function PorQueAdrianSection() {
  return (
    <section className="relative w-full" style={{ background: "#f9f4ee" }}>
      <div className="mx-auto w-full max-w-[1200px] px-5 md:px-10 py-20 md:py-28">
        {/* Cabeçalho jornalístico */}
        <div className="max-w-[820px]">
          <span className="inline-flex items-center text-[11px] md:text-xs font-semibold uppercase tracking-[0.22em] text-[#031a28]/60">
            Quem fala com você
          </span>
          <h2 className="mt-4 font-semibold text-[#031a28] leading-[1.05] tracking-[-0.02em] text-[clamp(1.9rem,4vw,3.2rem)]">
            Por que eu sou a melhor pessoa para te ajudar?
          </h2>
          <div
            aria-hidden
            className="mt-6 h-px w-24"
            style={{ background: "#031a28", opacity: 0.5 }}
          />
        </div>

        {/* Layout jornalístico: imagem + texto */}
        <div className="mt-10 md:mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Foto à esquerda, estilo editorial */}
          <figure className="md:col-span-5 md:sticky md:top-24 self-start">
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "1 / 1",
                boxShadow: "0 30px 60px -20px rgba(3,26,40,0.35)",
              }}
            >
              <img
                src={adrianEsposa}
                alt="Adrian Carvalho com sua esposa"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: "grayscale(100%) contrast(1.05)" }}
                decoding="async"
                loading="lazy"
              />
            </div>
            <figcaption className="mt-3 text-[12px] md:text-[13px] text-[#031a28]/60 leading-snug font-serif italic">
              Adrian Carvalho — fundador da QuartaVia. Mais de 100 ativos pessoais
              construídos pelo mesmo método que ensina na Imersão.
            </figcaption>
          </figure>

          {/* Texto à direita */}
          <div className="md:col-span-7">
            <div
              className="space-y-5 md:space-y-6 text-[#031a28] text-[16px] md:text-[18px] leading-[1.7]"
              style={{ fontFamily: '"Source Serif 4", "Source Serif Pro", Georgia, serif' }}
            >
              {paragrafos.map((p, i) => (
                <p
                  key={i}
                  className={i === 0 ? "text-[20px] md:text-[24px] font-semibold leading-[1.35]" : ""}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}