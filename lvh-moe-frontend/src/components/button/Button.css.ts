import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const buttonBase = style({
    padding: `${vars.spacing.md} ${vars.spacing.lg}`,
    borderRadius: vars.borderRadius.md,
    cursor: 'pointer',
    border: 'none',
    fontSize: vars.fontSize.xs,
    ':hover': {
        filter: vars.effect.hoverFilter,
    },
    ':active': {
        filter: vars.effect.activeFilter,
    },
});

export const primaryButton = style([
    buttonBase,
    {
        backgroundColor: vars.color.bgPrimary,
        color: vars.color.fgText,
    },
]);
