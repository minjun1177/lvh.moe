import { defineConfig, exports } from 'cf/config';

import * as entrypoint from './worker/index.ts' with { type: 'cf-worker' };

export default defineConfig({
    worker: {
        name: 'lvh-moe',
        compatibilityDate: '2026-10-06',
        entrypoint,
        observability: {
            enabled: true,
        },
        assets: {
            notFoundHandling: 'single-page-application',
            // API requests go to the Worker; everything else is a static asset.
            runWorkerFirst: ['/api/*'],
        },
        exports: {
            Counters: exports.durableObject({ storage: 'sqlite' }),
        },
        domains: ['lvh.moe'],
    },
});
