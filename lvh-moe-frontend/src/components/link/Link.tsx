import type React from 'react';
import { navigate } from '../../lib/router';

export interface LinkProps {
    to: string;
    className?: string;
    children?: React.ReactNode;
}

export function Link({ to, className, children }: LinkProps) {
    function onClick(event: React.MouseEvent<HTMLAnchorElement>) {
        // Let the browser handle new-tab / modified clicks.
        if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }
        event.preventDefault();
        navigate(to);
    }

    return (
        <a href={to} className={className} onClick={onClick}>
            {children}
        </a>
    );
}
