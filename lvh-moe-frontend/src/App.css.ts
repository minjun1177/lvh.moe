import { style } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';

export const mainStyle = style({
    width: '100%',
    padding: vars.spacing.xl,
    justifyContent: 'space-between',
    display: 'flex',
    '@media': {
        'screen and (max-width: 1440px)': {
            flexDirection: 'column',
        },
    },
});

export const leftBox = style({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: vars.spacing.xl,
    width: '100%',
    height: '100%',
    gap: vars.spacing.xl,
});

export const image = style({
    borderRadius: vars.borderRadius.xl,
});

export const mainText = style({
    color: vars.color.fgText,
    fontWeight: vars.fontWeight.medium,
    fontSize: vars.fontSize.md,
});

export const pinkText = style({
    color: vars.color.fgPink,
    fontWeight: vars.fontWeight.black,
});

export const redText = style({
    color: vars.color.bgPrimary,
    fontWeight: vars.fontWeight.black,
});

export const cardBox = style({
    display: 'flex',
    gap: vars.spacing.xs,
});
