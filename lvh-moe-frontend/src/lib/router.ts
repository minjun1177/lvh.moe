import { useSyncExternalStore } from 'react';

// Minimal pushState router; the Worker serves index.html for every
// non-API path (assets.notFoundHandling = single-page-application).

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);
    window.addEventListener('popstate', listener);
    return () => {
        listeners.delete(listener);
        window.removeEventListener('popstate', listener);
    };
}

export function usePathname(): string {
    return useSyncExternalStore(subscribe, () => window.location.pathname);
}

export function navigate(to: string) {
    if (to === window.location.pathname) return;
    window.history.pushState(null, '', to);
    listeners.forEach((listener) => listener());
    window.scrollTo(0, 0);
}
