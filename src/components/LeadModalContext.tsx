import { useCallback, useSyncExternalStore, type ReactNode } from "react";

import LeadFormModal from "@/components/LeadFormModal";
import { leadModalStore } from "@/components/leadModalStore";

function LeadModalHost() {
  const isOpen = useSyncExternalStore(
    leadModalStore.subscribe,
    leadModalStore.getSnapshot,
    leadModalStore.getServerSnapshot,
  );
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
