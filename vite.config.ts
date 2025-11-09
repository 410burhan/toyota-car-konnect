import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig(({ mode }) => {
  // For GitHub Pages, set base to repository name if GITHUB_PAGES env var is set
  // Otherwise, use '/' for other deployments (Vercel, Netlify, etc.)
  const base = process.env.GITHUB_PAGES === 'true' 
    ? `/${process.env.GITHUB_REPOSITORY?.split('/')[1] || 'toyota-car-konnect-4'}/` 
    : '/';

  return {
    base,
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
