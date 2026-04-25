import { persistUtmsFromUrl } from "@/lib/leadUtms";

let isOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/**
 * Store fora de React: ao abrir, só o `LeadModalHost` re-renderiza (useSyncExternalStore).
 * Não mexe no DOM além de `isOpen` em memória.
 */
export const leadModalStore = {
  subscribe(callback: () => void) {
    listeners.add(callback);
    return () => {
      listeners.delete(callback);
    };
  },
  getSnapshot: () => isOpen,
  getServerSnapshot: () => false,
  open: () => {
    if (isOpen) return;
    isOpen = true;
    emit();
    if (typeof window !== "undefined") {
      setTimeout(() => {
        try {
          persistUtmsFromUrl();
        } catch {
          /* ignore */
        }
      }, 0);
    }
  },
  close: () => {
    if (!isOpen) return;
    isOpen = false;
    emit();
  },
};

/** Carrosséis/RAF: leitura barata, sem classList no DOM. */
export function isLeadModalOpenNow(): boolean {
  return isOpen;
}
