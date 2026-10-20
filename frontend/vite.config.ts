import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
    server: {
    host: "::",
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://139.59.154.26:8000',  // Django backend címe
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          "Connection": "keep-alive"
        }
      }
    },
    allowedHosts: [
      "office60f91ab.ngrok-free.app",
      ".ngrok-free.app",
      "revfalvi-art-2.onrender.com",
      ".onrender.com",
    ],
  },
  preview: {
    host: "::",
    port: 8080,
    allowedHosts: [
      "revfalvi-art-2.onrender.com", // Render.com domain hozzáadva
      ".onrender.com", // minden Render altartomány engedélyezése
    ],
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
