import { ArrowRight } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

import { useLeadModal } from "@/components/LeadModalContext";

interface PillButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: "dark" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  fullWidth?: boolean;
  /** When true, the button does NOT open the lead modal (use for WhatsApp/external CTAs). */
  noModal?: boolean;
}

export default function PillButton({
  label,
  variant = "dark",
  size = "md",
  icon,
  fullWidth = false,
  className = "",
  noModal = false,
  onClick,
  ...rest
}: PillButtonProps) {
  const { open } = useLeadModal();

  const variantClass =
    variant === "gold" ? "pill-btn--gold" : variant === "ghost" ? "pill-btn--ghost" : "";
  const sizeClass = `pill-btn--${size}`;
  const widthClass = fullWidth ? "pill-btn--full" : "";

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e);
    if (!e.defaultPrevented && !noModal) {
      open();
    }
  };

  return (
    <button
      className={`pill-btn ${variantClass} ${sizeClass} ${widthClass} ${className}`.trim()}
      onClick={handleClick}
      {...rest}
    >
      <span className="pill-btn__label">{label}</span>
      <span className="pill-btn__circle" aria-hidden>
        {icon ?? <ArrowRight strokeWidth={2.2} />}
      </span>
    </button>
  );
}
