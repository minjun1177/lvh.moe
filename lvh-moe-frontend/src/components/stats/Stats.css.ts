import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const lightName = style({
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.medium,
    marginRight: vars.spacing.xs,
});

export const boldValue = style({
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.black,
});

export const wrapperDiv = style({
    display: 'flex',
    justifyContent: 'space-between',
});

export const box = style({
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.xs,
});
