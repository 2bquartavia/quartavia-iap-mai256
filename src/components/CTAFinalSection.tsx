
import PillButton from "@/components/PillButton";
import ctaBg from "@/assets/cta-bg.jpg";

export default function CTAFinalSection() {
  return (
    <section id="cadastro" className="cta-thirds">
      <div
        className="cta-thirds__bg"
        style={{ backgroundImage: `url(${ctaBg})` }}
        aria-hidden
      />
      <div className="cta-thirds__overlay" aria-hidden />

      {/* Rule of thirds grid */}
      <div className="cta-thirds__grid" aria-hidden>
        <span className="cta-thirds__line cta-thirds__line--v1" />
        <span className="cta-thirds__line cta-thirds__line--v2" />
        <span className="cta-thirds__line cta-thirds__line--h1" />
        <span className="cta-thirds__line cta-thirds__line--h2" />
      </div>

      <div className="cta-thirds__inner">
        <div className="cta-thirds__center">
          <h2 className="cta-thirds__title">
            Você já provou que sabe <em>ganhar dinheiro</em>. Isso não está em discussão.
          </h2>
          <p className="cta-thirds__lead">
            Mas o dinheiro que você ganhou até hoje construiu algo que funciona sem você?
          </p>
          <p className="cta-thirds__lead">
            Daqui a 5 anos você vai estar em um de dois lugares. No mesmo — ganhando bem,
            trabalhando muito, dependendo do próximo mês. Ou recebendo depósito de aluguel
            no dia 5 sem ter levantado da cama pra isso.
          </p>
          <p className="cta-thirds__lead">
            A Imersão não garante o segundo lugar. Mas é o passo que <strong>1.917 famílias</strong> deram
            antes de você. 5 noites. Engenharia Patrimonial. <strong>R$97</strong>. Risco zero.
          </p>
          <p className="cta-thirds__lead">
            A Imersão começa dia <strong>25 de maio</strong>. Apenas <strong>50 Diagnósticos Individuais</strong> serão
            realizados. Quando acabar, acabou.
          </p>

          <PillButton
            label="Quero construir meus ativos — R$97"
            variant="gold"
            size="lg"
          />

          <div className="cta-thirds__signature">
            <p className="cta-thirds__sig-name">Adrian Carvalho</p>
            <p className="cta-thirds__sig-role">Engenheiro Patrimonial. CEO da Quartavia.</p>
            <p className="cta-thirds__sig-meta">
              Ex-primo. Tio com 100+ ativos. 1.917 famílias. R$3 bilhões sob aconselhamento.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
