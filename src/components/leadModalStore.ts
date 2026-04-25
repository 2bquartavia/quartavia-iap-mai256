let isOpen = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

/**
 * Store global do modal (fora de React). Abrir/fechar dispara re-render
 * somente do componente que chama `useSyncExternalStore` — nunca da LP inteira.
 * Colocar `isOpen` em useState no Provider pedia re-render a todos os
 * filhos (HeadContent + rota) a cada clique, o que congelava a aba em produção.
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
  },
  close: () => {
    if (!isOpen) return;
    isOpen = false;
    emit();
  },
};
