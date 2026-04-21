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
const gtmInlineScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`;

// Injeta noscript do GTM + script da UTMify via DOM (evita hydration mismatch
// de manter esses nós no JSX do shell). Roda imediatamente no SSR via ScriptOnce.
const thirdPartyBootScript = `(function(){
  try {
    if (!document.getElementById('gtm-noscript-${GTM_ID}')) {
      var ns = document.createElement('noscript');
      ns.id = 'gtm-noscript-${GTM_ID}';
      ns.innerHTML = '<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>';
      (document.body || document.documentElement).appendChild(ns);
    }
    if (!document.getElementById('utmify-script')) {
      var s = document.createElement('script');
      s.id = 'utmify-script';
      s.src = 'https://cdn.utmify.com.br/scripts/utms/latest.js';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-utmify-prevent-subids','');
      s.setAttribute('data-utmify-ignore-retry','');
      s.setAttribute('data-utmify-ignore-iframe','');
      s.setAttribute('data-utmify-fast-start','');
      (document.head || document.documentElement).appendChild(s);
    }
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
      { title: "Aurum Capital — Inteligência para o Mercado Financeiro" },
      { name: "description", content: "Estratégias profissionais de renda variável, renda fixa e ativos alternativos." },
      { name: "author", content: "Aurum Capital" },
      { property: "og:title", content: "Aurum Capital — Inteligência para o Mercado Financeiro" },
      { property: "og:description", content: "Estratégias profissionais de renda variável, renda fixa e ativos alternativos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Aurum Capital — Inteligência para o Mercado Financeiro" },
      { name: "twitter:description", content: "Estratégias profissionais de renda variável, renda fixa e ativos alternativos." },
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
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <ScriptOnce>{gtmInlineScript}</ScriptOnce>
        <HeadContent />
      </head>
      <body>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
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
