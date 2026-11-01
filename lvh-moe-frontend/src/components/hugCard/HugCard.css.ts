import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const mainTextStyle = style({
    fontSize: vars.fontSize.md,
    fontWeight: vars.fontWeight.medium,
});

export const buttonBox = style({
    display: 'flex',
    gap: vars.spacing.xs,
    marginTop: vars.spacing.md,
});
