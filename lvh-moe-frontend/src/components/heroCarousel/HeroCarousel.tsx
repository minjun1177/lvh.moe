import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { fetchDailyImages, imageUrl } from '../../lib/api';
import {
    carousel,
    dot,
    dotActive,
    dots,
    navButton,
    nextButton,
    prevButton,
    slide,
    slideActive,
} from './HeroCarousel.css';

const ROTATE_MS = 5000;

export interface HeroCarouselProps {
    /** Shown until today's picks load, or when the gallery is empty. */
    fallback: string;
    className?: string;
}

export function HeroCarousel({ fallback, className }: HeroCarouselProps) {
    const [images, setImages] = useState<string[]>([fallback]);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        let cancelled = false;
        fetchDailyImages()
            .then((daily) => {
                if (!cancelled && daily.length > 0) {
                    setImages(daily.map((image) => imageUrl(image.id)));
                    setIndex(0);
                }
            })
            .catch((err) => console.error('failed to load daily images', err));
        return () => {
            cancelled = true;
        };
    }, []);

    // Rotate automatically; any manual move changes `index` and restarts the timer.
    useEffect(() => {
        if (images.length < 2) return;
        const timer = setTimeout(
            () => setIndex((i) => (i + 1) % images.length),
            ROTATE_MS,
        );
        return () => clearTimeout(timer);
    }, [index, images.length]);

    const move = (delta: number) =>
        setIndex((i) => (i + delta + images.length) % images.length);

    return (
        <div className={clsx(carousel, className)}>
            {images.map((src, i) => (
                <img
                    key={src}
                    src={src}
                    alt={`LVH ${i + 1}`}
                    className={clsx(slide, i === index && slideActive)}
                    aria-hidden={i !== index}
                />
            ))}

            {images.length > 1 && (
                <>
                    <button
                        type="button"
                        className={clsx(navButton, prevButton)}
                        onClick={() => move(-1)}
                        aria-label="이전 이미지"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        className={clsx(navButton, nextButton)}
                        onClick={() => move(1)}
                        aria-label="다음 이미지"
                    >
                        ›
                    </button>
                    <div className={dots}>
                        {images.map((src, i) => (
                            <button
                                key={src}
                                type="button"
                                className={clsx(dot, i === index && dotActive)}
                                onClick={() => setIndex(i)}
                                aria-label={`${i + 1}번 이미지`}
                            />
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
