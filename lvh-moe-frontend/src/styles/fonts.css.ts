import { globalFontFace } from '@vanilla-extract/css';
import { vars } from './theme.css';

const gMarketSansFamily = 'GMarketSans';

globalFontFace(gMarketSansFamily, {
    src: 'url("/fonts/GMarketSansTTF/GMarketSansTTFLight.ttf") format("truetype")',
    fontWeight: vars.fontWeight.light,
});

globalFontFace(gMarketSansFamily, {
    src: 'url("/fonts/GMarketSansTTF/GMarketSansTTFMedium.ttf") format("truetype")',
    fontWeight: vars.fontWeight.medium,
});

globalFontFace(gMarketSansFamily, {
    src: 'url("/fonts/GMarketSansTTF/GMarketSansTTFBold.ttf") format("truetype")',
    fontWeight: vars.fontWeight.black,
});
