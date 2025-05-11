export const palette = {
  primary: {
    900: '#0d020d',
    800: '#1a041a',
    700: '#270627',
    600: '#340834',
    500: '#410a41',
    400: '#5c175c',
    300: '#883d88',
    200: '#c28bc2',
    100: '#fcf3fc',
  },
  secondary: {
    900: '#56009e',
    800: '#6700bb',
    700: '#7800d9',
    600: '#8900f6',
    500: '#9a33ff',
    400: '#ab66ff',
    300: '#bc99ff',
    200: '#cdccff',
    100: '#f6e3f6',
  },
} as const;

export const mainBackgroundColor = palette.primary[900];
export const headerHeight = '80px';
export const headerZIndex = 3;
export const heroHeight = `calc(100vh - ${headerHeight})`;

export const headerStyles = {
  width: '100%',
  height: headerHeight,
  position: 'sticky',
  top: 0,
  left: 0,
  zIndex: headerZIndex,
  backgroundColor: mainBackgroundColor,
  borderBottom: '1px solid',
  borderColor: 'divider',
  opacity: 0.9,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};