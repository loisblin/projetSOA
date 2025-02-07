import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    federation({
      name:"front",
      remotes: {
        remote: "http://localhost:5174/assets/remoteEntry.js",
        },
      shared: ["react","react-dom"],
    }),
  ],
})
