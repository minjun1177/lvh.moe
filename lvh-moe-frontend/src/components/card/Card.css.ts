import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const cardStyles = style({
    borderStyle: 'solid',
    borderWidth: vars.borderWidth.sm,
    borderColor: vars.color.borderColor,
    borderRadius: vars.borderRadius.lg,
    padding: `${vars.spacing.md} ${vars.spacing.lg}`,
    display: 'flex',
    flexDirection: 'column',
    gap: vars.spacing.md,
});

export const titleStyles = style({
    fontSize: vars.fontSize.xs,
    fontWeight: vars.fontWeight.black,
});
