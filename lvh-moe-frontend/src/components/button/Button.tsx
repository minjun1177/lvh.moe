import type React from 'react';
import { primaryButton } from './Button.css';

export interface ButtonProps {
    onClick?: () => void;
    children?: React.ReactNode;
}

export function Button({ onClick = () => {}, children = '' }: ButtonProps) {
    return (
        <button className={primaryButton} onClick={onClick}>
            {children}
        </button>
    );
}
