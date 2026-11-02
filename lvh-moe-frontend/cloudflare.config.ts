import { bindings, defineConfig, exports } from 'cf/config';

import * as entrypoint from './worker/index.ts' with { type: 'cf-worker' };

export default defineConfig({
    worker: {
        name: 'lvh-moe',
        compatibilityDate: '2026-10-06',
        entrypoint,
        observability: {
            enabled: false,
        },
        assets: {
            notFoundHandling: 'single-page-application',
            // API requests go to the Worker; everything else is a static asset.
            runWorkerFirst: ['/api/*'],
        },
        env: {
            // Gallery images. R2 must be enabled on the account.
            GALLERY: bindings.r2({ name: 'lvh-moe-gallery' }),
            // Upload/delete password:
            //   cf workers secrets update GALLERY_PASSWORD --worker lvh-moe --type secret_text --text '<password>'
            // Locally, put GALLERY_PASSWORD=... in .dev.vars (gitignored).
            GALLERY_PASSWORD: bindings.secret(),
        },
        exports: {
            Counters: exports.durableObject({ storage: 'sqlite' }),
        },
        domains: ['lvh.moe'],
    },
});
