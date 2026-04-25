// Vite config dedicado para deploy estático na Vercel.
// NÃO usa o preset @lovable.dev/vite-tanstack-config (que ativa SSR + Cloudflare Workers).
// Em vez disso, gera uma SPA pura via @tanstack/router-plugin (file-based routing) + React.
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import path from "node:path";

export default defineConfig({
  // Raiz do site; evita resolução errada de chunks em deploy.
  base: "/",
  plugins: [
    tanstackRouter({
      target: "react",
      // Evita chunk por rota (iap-lp02-h01-xxx.js) com import() — elimina
      // "Failed to fetch dynamically imported module" pós-deploy / cache.
      autoCodeSplitting: false,
      routesDirectory: "./src/routes",
      generatedRouteTree: "./src/routeTree.gen.ts",
    }),
    react(),
    tsconfigPaths(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    target: "es2022",
    cssCodeSplit: true,
    /** Melhor minificação de CSS; ~120kb → ligeiramente menor que esbuild. */
    cssMinify: "lightningcss",
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react-dom") || id.includes("/react/") || id.includes("scheduler")) {
              return "react-vendor";
            }
            if (id.includes("@tanstack/react-router") || id.includes("@tanstack/router-")) {
              return "router";
            }
            if (id.includes("@tanstack/react-query")) {
              return "query";
            }
            if (id.includes("@radix-ui")) {
              return "radix";
            }
            if (id.includes("lucide-react")) {
              return "icons";
            }
            // @supabase: só com import() dinâmico em acSubscribe / submit — não isolar
            // num chunk nomeado, evita referência a SDK no carregamento inicial.
          }
        },
      },
    },
  },
  server: {
    headers: {
      "X-Content-Type-Options": "nosniff",
      "X-Frame-Options": "SAMEORIGIN",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
  },
});
