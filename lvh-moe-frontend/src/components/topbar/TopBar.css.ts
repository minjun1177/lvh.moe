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
});
