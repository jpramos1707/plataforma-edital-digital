
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "localhost",  // Mudando de "::" para "localhost" para melhor compatibilidade
    port: 8080,
    open: true,  // Abre o navegador automaticamente
    strictPort: true,  // Falha se a porta já estiver em uso
    logger: {
      transports: [
        {
          type: 'custom',
          handler: (message, level) => {
            console.log(message);
          }
        }
      ]
    }
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  logLevel: "info",  // Aumenta o nível de log para mais informações
}));
