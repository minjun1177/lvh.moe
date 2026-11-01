import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
    color: {
        bgPrimary: '#F45601',
        fgPink: '#FC85F6',
        fgText: '#ffffff',
        borderColor: '#515151',
        bgMain: '#252525',
    },
    borderWidth: {
        sm: '2px',
    },
    spacing: {
        xs: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '3.75rem',
    },
    size: {
        topbarHeight: '75px',
    },
    borderRadius: {
        lg: '24px',
        md: '20px',
        xl: '36px',
    },
    fontSize: {
        xs: '1rem',
        sm: '1.25rem',
        md: '1.375rem',
        lg: '2rem',
    },
    fontWeight: {
        light: '200',
        medium: '400',
        black: '700',
    },
    effect: {
        hoverFilter: 'brightness(90%)',
        activeFilter: 'brightness(80%)',
    },
});
