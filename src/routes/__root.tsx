import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  ScriptOnce,
} from "@tanstack/react-router";

import { LeadModalProvider } from "@/components/LeadModalContext";
import appCss from "../styles.css?url";

const GTM_ID = "GTM-N483RZTK";
// Tracking é carregado só depois da hidratação/idle para não disputar CPU com o formulário.
const trackingBootScript = `(function(){
  try {
    try {
      var params = new URLSearchParams(window.location.search || '');
      if (params && params.toString()) {
        params.forEach(function(value, key){
          if (!value || !key) return;
          var safeValue = String(value).slice(0, 255);
          sessionStorage.setItem('lead_param_' + key, safeValue);
          if (key.indexOf('utm_') === 0) sessionStorage.setItem(key, safeValue);
        });
      }
    } catch(e) {}
    function loadTracking(){
      window.dataLayer = window.dataLayer || [];
      if (!window.__gtmLoaded) {
        window.__gtmLoaded = true;
        window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        var gj = document.createElement('script');
        gj.async = true;
        gj.src = 'https://www.googletagmanager.com/gtm.js?id=${GTM_ID}';
        (document.head || document.documentElement).appendChild(gj);
      }
      if (document.getElementById('utmify-script')) return;
      var s = document.createElement('script');
      s.id = 'utmify-script';
      s.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
      s.async = true; s.defer = true;
      s.setAttribute('data-utmify-prevent-subids','');
      s.setAttribute('data-utmify-ignore-retry','');
      s.setAttribute('data-utmify-ignore-iframe','');
      s.setAttribute('data-utmify-ignore-forms','');
      s.setAttribute('data-utmify-ignore-classes','lead-form');
      (document.head || document.documentElement).appendChild(s);
    }
    function schedule(){
      if ('requestIdleCallback' in window) window.requestIdleCallback(loadTracking, { timeout: 3500 });
      else setTimeout(loadTracking, 2500);
    }
    if (document.readyState === 'complete') schedule();
    else window.addEventListener('load', schedule, { once: true });
  } catch(e) {}
})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "QuartaVia — Imersão Alavanca Patrimonial" },
      { name: "description", content: "5 encontros pra você sair do improviso financeiro e entrar num plano real de construção de patrimônio — usando alavancagem, crédito inteligente e os ativos certos." },
      { name: "author", content: "QuartaVia" },
      { property: "og:title", content: "QuartaVia — Imersão Alavanca Patrimonial" },
      { property: "og:description", content: "5 encontros pra você sair do improviso financeiro e entrar num plano real de construção de patrimônio — usando alavancagem, crédito inteligente e os ativos certos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "QuartaVia — Imersão Alavanca Patrimonial" },
      { name: "twitter:description", content: "5 encontros pra você sair do improviso financeiro e entrar num plano real de construção de patrimônio — usando alavancagem, crédito inteligente e os ativos certos." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e090813-50f4-47ee-8148-8442949c3e88/id-preview-97fb3713--a07d5729-6853-49b6-99b2-8873d0bc14e0.lovable.app-1776739634797.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/4e090813-50f4-47ee-8148-8442949c3e88/id-preview-97fb3713--a07d5729-6853-49b6-99b2-8873d0bc14e0.lovable.app-1776739634797.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://www.googletagmanager.com" },
      { rel: "dns-prefetch", href: "https://www.googletagmanager.com" },
      { rel: "preconnect", href: "https://cdn.utmify.com.br" },
      { rel: "dns-prefetch", href: "https://cdn.utmify.com.br" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <ScriptOnce>{trackingBootScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LeadModalProvider>
      <Outlet />
    </LeadModalProvider>
  );
}
