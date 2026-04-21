import {
  createContext,
  useCallback,
  useContext,
  useEffect,
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

  // Warm up the form chunk during browser idle so first click is instant
  useEffect(() => {
    if (typeof window === "undefined") return;
    const idle =
      (window as unknown as { requestIdleCallback?: (cb: () => void) => number })
        .requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1));
    idle(() => {
      // touching the import is enough — module is already in the bundle
      void LeadFormModal;
    });
  }, []);

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
