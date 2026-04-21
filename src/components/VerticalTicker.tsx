import { useEffect, useState } from "react";

interface VerticalTickerProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export default function VerticalTicker({
  items,
  intervalMs = 2600,
  className = "",
}: VerticalTickerProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs]);

  return (
    <div className={`vticker ${className}`} aria-live="polite">
      <div
        className="vticker__track"
        style={{ transform: `translateY(-${index * 100}%)` }}
      >
        {items.map((text, i) => (
          <div className="vticker__item" key={i}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
}
