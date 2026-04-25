import { lazy, Suspense, useCallback, useSyncExternalStore, type ReactNode } from "react";

import { leadModalStore } from "@/components/leadModalStore";

const LeadFormModal = lazy(() => import("@/components/LeadFormModal"));

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

  return isOpen ? (
    <Suspense fallback={null}>
      <LeadFormModal onClose={onClose} />
    </Suspense>
  ) : null;
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
