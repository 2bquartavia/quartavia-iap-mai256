import { useEffect, useState } from "react";

import { useIsLeadModalOpen } from "@/components/LeadModalContext";

interface VerticalTickerProps {
  items: string[];
  intervalMs?: number;
  className?: string;
}

export default function VerticalTicker({
  items,
  intervalMs = 2800,
  className = "",
}: VerticalTickerProps) {
  const [index, setIndex] = useState(0);
  const modalOpen = useIsLeadModalOpen();

  useEffect(() => {
    if (items.length <= 1 || modalOpen) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs, modalOpen]);

  return (
    <div className={`vticker ${className}`} aria-live="polite">
      {items.map((text, i) => (
        <span
          key={i}
          className={`vticker__item ${i === index ? "is-active" : ""}`}
          aria-hidden={i !== index}
        >
          {text}
        </span>
      ))}
    </div>
  );
}
