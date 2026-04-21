import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  lazy,
  Suspense,
  type ReactNode,
} from "react";

const LeadFormModal = lazy(() => import("@/components/LeadFormModal"));

interface LeadModalContextValue {
  open: () => void;
  close: () => void;
}

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}
      {isOpen && (
        <Suspense fallback={null}>
          <LeadFormModal open={isOpen} onOpenChange={setIsOpen} />
        </Suspense>
      )}
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    return {
      open: () => {
        if (typeof window !== "undefined") {
          console.warn("LeadModalProvider not mounted");
        }
      },
      close: () => {},
    };
  }
  return ctx;
}
