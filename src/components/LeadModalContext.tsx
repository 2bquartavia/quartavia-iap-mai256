import { useCallback, useSyncExternalStore, type ReactNode } from "react";

import LeadFormModal from "@/components/LeadFormModal";
import { leadModalStore } from "@/components/leadModalStore";

function LeadModalHost() {
  const isOpen = useIsLeadModalOpen();
  const onClose = useCallback(() => leadModalStore.close(), []);

  if (!isOpen) return null;
  return <LeadFormModal onClose={onClose} />;
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

/**
 * Lê o estado da modal sem precisar do React Context. Componentes com
 * setInterval / setTimeout pausáveis (ex.: CountdownBanner, HeroSlideshow,
 * VerticalTicker) usam isso pra suspender trabalho enquanto a modal estiver
 * aberta — caso contrário esses re-renders continuam rodando atrás da modal.
 */
export function useIsLeadModalOpen(): boolean {
  return useSyncExternalStore(
    leadModalStore.subscribe,
    leadModalStore.getSnapshot,
    leadModalStore.getServerSnapshot,
  );
}
