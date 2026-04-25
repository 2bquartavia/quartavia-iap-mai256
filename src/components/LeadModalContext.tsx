import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import LeadFormModal from "@/components/LeadFormModal";

interface LeadModalContextValue {
  open: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  // open é estável (deps vazias) — não recria a value do Provider e não invalida
  // consumidores via context.
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadModalContext.Provider value={{ open }}>
      {children}
      {/* Render condicional: modal só existe na árvore quando aberto.
          Quando fecha, o componente é desmontado totalmente — nenhum hook
          continua rodando em background. */}
      {isOpen && <LeadFormModal onClose={close} />}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    return {
      open: () => {
        if (typeof window !== "undefined") {
          // eslint-disable-next-line no-console
          console.warn("LeadModalProvider not mounted");
        }
      },
      close: () => {},
    };
  }
  return { open: ctx.open, close: () => {} };
}
