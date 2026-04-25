import { useCallback, useSyncExternalStore, type ReactNode } from "react";
import LeadFormModal from "@/components/LeadFormModal";
import { leadModalStore } from "@/components/leadModalStore";

/**
 * Só quem inscreve no store — alternar o modal re-renderiza este subtree,
 * nunca as rotas/sections filhas do provider.
 */
function LeadModalHost() {
  const isOpen = useSyncExternalStore(
    leadModalStore.subscribe,
    leadModalStore.getSnapshot,
    leadModalStore.getServerSnapshot,
  );
  const onClose = useCallback(() => leadModalStore.close(), []);

  return isOpen ? <LeadFormModal onClose={onClose} /> : null;
}

export function LeadModalProvider({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <LeadModalHost />
    </>
  );
}

export function useLeadModal() {
  return {
    open: leadModalStore.open,
    close: leadModalStore.close,
  };
}
