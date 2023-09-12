import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      devOptions: {
        enabled: true, // For making sure that the PWA is testable from the Local dev environment
      },
      manifest: {
        name: "Sports News application",
        short_name: "Sports News",
        icons: [
          {
            src: "/favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon",
          },
          {
            src: "/16.png",
            type: "image/png",
            sizes: "16x16",
          },
          {
            src: "/32.png",
            type: "image/png",
            sizes: "32x32",
          },
          {
            src: "/192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/512.png",
            type: "image/png",
            sizes: "512x512",
            purpose: "any maskable", // Icon format that ensures that your PWA icon looks great on all Android devices
          },
        ],
        theme_color: "#AAF",
      },
    }),
  ],
  mode: "production",
});
