import { style } from '@vanilla-extract/css';
import { vars } from '../styles/theme.css';

export const page = style({
    width: '100%',
    padding: `${vars.spacing.lg} ${vars.spacing.xl}`,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.lg,
    '@media': {
        'screen and (max-width: 768px)': {
            padding: vars.spacing.md,
        },
    },
});

export const header = style({
    display: 'flex',
    alignItems: 'baseline',
    gap: vars.spacing.md,
});

export const title = style({
    margin: 0,
    fontSize: vars.fontSize.lg,
    fontWeight: vars.fontWeight.black,
    color: vars.color.fgPink,
});

export const adminRow = style({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: vars.spacing.xs,
});

export const input = style({
    padding: `${vars.spacing.xs} ${vars.spacing.md}`,
    borderRadius: vars.borderRadius.md,
    border: `${vars.borderWidth.sm} solid ${vars.color.borderColor}`,
    backgroundColor: 'transparent',
    color: vars.color.fgText,
    fontSize: vars.fontSize.xs,
    minWidth: 0,
});

export const statusText = style({
    fontSize: vars.fontSize.xs,
    opacity: 0.8,
});

export const emptyText = style({
    fontSize: vars.fontSize.sm,
    opacity: 0.7,
});

export const grid = style({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: vars.spacing.md,
});

export const thumb = style({
    position: 'relative',
    aspectRatio: '1 / 1',
    borderRadius: vars.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#000',
});

export const thumbButton = style({
    padding: 0,
    border: 'none',
    width: '100%',
    height: '100%',
    cursor: 'zoom-in',
    background: 'none',
    ':hover': {
        filter: vars.effect.hoverFilter,
    },
});

export const thumbImage = style({
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
});

export const deleteButton = style({
    position: 'absolute',
    top: vars.spacing.xs,
    right: vars.spacing.xs,
    width: '2rem',
    height: '2rem',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: vars.color.bgPrimary,
    color: vars.color.fgText,
    fontSize: vars.fontSize.sm,
    lineHeight: 1,
});

export const lightbox = style({
    position: 'fixed',
    inset: 0,
    zIndex: 100,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
});

export const lightboxImage = style({
    maxWidth: '90vw',
    maxHeight: '85vh',
    borderRadius: vars.borderRadius.lg,
    objectFit: 'contain',
});

export const lightboxNav = style({
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '3.5rem',
    height: '3.5rem',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: vars.color.fgText,
    fontSize: vars.fontSize.lg,
    lineHeight: 1,
    ':hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
});

export const lightboxPrev = style({
    left: vars.spacing.lg,
});

export const lightboxNext = style({
    right: vars.spacing.lg,
});

export const closeButton = style({
    position: 'absolute',
    top: vars.spacing.lg,
    right: vars.spacing.lg,
    width: '3rem',
    height: '3rem',
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    color: vars.color.fgText,
    fontSize: vars.fontSize.lg,
    lineHeight: 1,
});
