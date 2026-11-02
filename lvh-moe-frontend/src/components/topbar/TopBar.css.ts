import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const topBar = style({
    height: vars.size.topbarHeight,
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: vars.spacing.xl,
    gap: vars.spacing.lg,
});

export const text = style({
    fontSize: vars.fontSize.sm,
    fontWeight: vars.fontWeight.medium,
    color: 'inherit',
    textDecoration: 'none',
});

export const nav = style({
    display: 'flex',
    gap: vars.spacing.md,
    marginLeft: vars.spacing.md,
});

export const navLink = style({
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.medium,
    color: 'inherit',
    textDecoration: 'none',
    opacity: 0.7,
    ':hover': {
        opacity: 1,
    },
});

export const activeNavLink = style({
    opacity: 1,
    color: vars.color.fgPink,
    fontWeight: vars.fontWeight.black,
});
