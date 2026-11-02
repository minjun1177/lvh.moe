import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const carousel = style({
    position: 'relative',
    // Same footprint as the original hero image.
    width: '961px',
    maxWidth: '100%',
    aspectRatio: '961 / 604',
    flexShrink: 0,
    borderRadius: vars.borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: '#000',
});

export const slide = style({
    position: 'absolute',
    inset: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    opacity: 0,
    transition: 'opacity 0.6s ease',
});

export const slideActive = style({
    opacity: 1,
});

export const navButton = style({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    border: 'none',
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    color: vars.color.fgText,
    fontSize: vars.fontSize.lg,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: '0.2rem',
    ':hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
    },
});

export const prevButton = style({
    left: vars.spacing.md,
});

export const nextButton = style({
    right: vars.spacing.md,
});

export const dots = style({
    position: 'absolute',
    bottom: vars.spacing.md,
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: vars.spacing.xs,
});

export const dot = style({
    width: '0.6rem',
    height: '0.6rem',
    padding: 0,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.45)',
});

export const dotActive = style({
    backgroundColor: vars.color.fgPink,
});
