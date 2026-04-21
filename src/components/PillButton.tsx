import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "dark" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
}

export default function PillButton({
  label,
  variant = "dark",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  ...rest
}: PillButtonProps) {
  const variantClass =
    variant === "gold" ? "pill-btn--gold" : variant === "ghost" ? "pill-btn--ghost" : "";
  const sizeClass = `pill-btn--${size}`;
  const widthClass = fullWidth ? "pill-btn--full" : "";
  return (
    <button
      className={`pill-btn ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      {...rest}
    >
      <span className="pill-btn__label">{label}</span>
      <span className="pill-btn__circle" aria-hidden>
        {icon ?? <ArrowRight strokeWidth={2.2} />}
      </span>
    </button>
  );
}
