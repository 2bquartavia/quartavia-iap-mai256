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
      <LeadFormModal open={isOpen} onOpenChange={setIsOpen} />
    </LeadModalContext.Provider>
  );
}

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) {
    // Safe fallback for routes that don't mount the provider
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
