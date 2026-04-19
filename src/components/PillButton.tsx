import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "dark" | "gold" | "ghost";
  icon?: ReactNode;
}

export default function PillButton({
  label,
  variant = "dark",
  icon,
  className = "",
  ...rest
}: PillButtonProps) {
  const variantClass =
    variant === "gold" ? "pill-btn--gold" : variant === "ghost" ? "pill-btn--ghost" : "";
  return (
    <button className={`pill-btn ${variantClass} ${className}`} {...rest}>
      <span className="pill-btn__label">{label}</span>
      <span className="pill-btn__circle">{icon ?? <ArrowRight size={18} strokeWidth={2.2} />}</span>
    </button>
  );
}
