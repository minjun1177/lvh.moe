import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { cloudflare } from '@cloudflare/vite-plugin';

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        react(),
        vanillaExtractPlugin(),
        // vanilla-extract configures the "ssr" environment with
        // resolve.external, which the Worker environment cannot use.
        cloudflare({ viteEnvironment: { name: 'worker' } }),
    ],
});
