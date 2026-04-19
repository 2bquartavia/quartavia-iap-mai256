const tickers = [
  { sym: "IBOV", val: "134.820", chg: "+1,24%", up: true },
  { sym: "S&P 500", val: "5.823", chg: "+0,42%", up: true },
  { sym: "USD/BRL", val: "5,18", chg: "-0,31%", up: false },
  { sym: "BTC", val: "98.420", chg: "+3,18%", up: true },
  { sym: "OURO", val: "2.687", chg: "+0,84%", up: true },
  { sym: "PETR4", val: "38,42", chg: "+0,67%", up: true },
  { sym: "VALE3", val: "62,18", chg: "-1,12%", up: false },
  { sym: "ITUB4", val: "33,90", chg: "+0,28%", up: true },
];

export default function Ticker() {
  const items = [...tickers, ...tickers];
  return (
    <div className="ticker">
      <div className="ticker__track">
        {items.map((t, i) => (
          <span key={i} className="ticker__item">
            <strong>{t.sym}</strong>
            <span>{t.val}</span>
            <span className={t.up ? "up" : "down"}>{t.chg}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
