import clsx from 'clsx';
import { cardStyles, titleStyles } from './Card.css';

export interface CardProps {
    title: string;
    children: React.ReactNode;
    className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
    return (
        <div className={clsx(cardStyles, className)}>
            <div className={titleStyles}>{title}</div>
            <div>{children}</div>
        </div>
    );
}
