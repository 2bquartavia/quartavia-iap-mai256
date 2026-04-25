import {
  createContext,
  useCallback,
  useContext,
  useMemo,
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

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  // useMemo CRÍTICO: sem ele, o objeto `value` é recriado a cada render do
  // Provider, invalidando o Context e re-renderizando TODOS os consumidores
  // (todos os PillButtons da página). Em uma LP com muitos CTAs isso cascateia
  // num evento síncrono de click e trava a aba.
  const value = useMemo(() => ({ open }), [open]);

  return (
    <LeadModalContext.Provider value={value}>
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
