import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from "@originjs/vite-plugin-federation";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Order": "./src/Order",
      },
      shared: ["react","react-dom"],
    }),

  ],
  build: {
    modulePreload:false,
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  },
})
