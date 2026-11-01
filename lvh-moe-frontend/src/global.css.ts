import { globalStyle } from '@vanilla-extract/css';
import { vars } from './styles/theme.css';
import './styles/fonts.css';

globalStyle('body', {
    backgroundColor: vars.color.bgMain,
    margin: 0,
    color: vars.color.fgText,
});

globalStyle('*', {
    boxSizing: 'border-box',
    fontFamily: 'GMarketSans, Roboto, sans-serif',
});
