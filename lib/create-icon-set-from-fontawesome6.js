import { Platform } from 'react-native';
import createMultiStyleIconSet from './create-multi-style-icon-set';

const FA6Style = {
  regular: 'regular',
  light: 'light',
  solid: 'solid',
  brand: 'brand',
};

function createFA6iconSet(glyphMap, metadata = {}, pro = false) {
  const metadataKeys = Object.keys(metadata);
  const fontFamily = `FontAwesome6${pro ? 'Pro' : 'Free'}`;

  function fallbackFamily(glyph) {
    for (let i = 0; i < metadataKeys.length; i += 1) {
      const family = metadataKeys[i];
      if (metadata[family].indexOf(glyph) !== -1) {
        return family === 'brands' ? 'brand' : family;
      }
    }

    return 'regular';
  }

  function glyphValidator(glyph, style) {
    const family = style === 'brand' ? 'brands' : style;
    if (metadataKeys.indexOf(family) === -1) return false;
    return metadata[family].indexOf(glyph) !== -1;
  }

  function createFontAwesomeStyle(style, fontWeight, family = fontFamily) {
    let styleName = style;
    let fontFile = `FontAwesome6_${pro ? `Pro_${styleName}` : styleName}.ttf`;

    if (styleName === 'Brands') {
      styleName = 'Regular';
      fontFile = 'FontAwesome6_Brands.ttf';
    }

    return {
      fontFamily: `${family}-${styleName}`,
      fontFile,
      fontStyle: Platform.select({
        ios: {
          fontWeight,
        },
        default: {},
      }),
      glyphMap,
    };
  }

  const brandIcons = createFontAwesomeStyle(
    'Brands',
    '400',
    'FontAwesome6Brands'
  );
  const lightIcons = createFontAwesomeStyle('Light', '300');
  const regularIcons = createFontAwesomeStyle('Regular', '400');
  const solidIcons = createFontAwesomeStyle('Solid', '900');
  const Icon = createMultiStyleIconSet(
    {
      brand: brandIcons,
      light: lightIcons,
      regular: regularIcons,
      solid: solidIcons,
    },
    {
      defaultStyle: 'regular',
      fallbackFamily,
      glyphValidator,
    }
  );

  return Icon;
}

export { createFA6iconSet, FA6Style };
