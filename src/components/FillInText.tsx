type Props = {
  text: string;
  highlight?: string;
  /** ms per letter */
  stagger?: number;
};

export default function FillInText({ text, highlight, stagger = 45 }: Props) {
  const chars = Array.from(text);
  const hStart = highlight ? text.indexOf(highlight) : -1;
  const hEnd = hStart >= 0 ? hStart + highlight!.length : -1;

  return (
    <span className="fill-in-text">
      {chars.map((ch, i) => {
        const isHighlight = i >= hStart && i < hEnd;
        return (
          <span
            key={i}
            className={`fill-in-text__char${isHighlight ? " is-highlight" : ""}`}
            style={{ animationDelay: `${i * stagger}ms` }}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        );
      })}
    </span>
  );
}
