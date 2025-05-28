export const palette = {
  primary: {
    900: '#0e0b16',
    800: '#1a1325',
    700: '#251b34',
    600: '#322245',
    500: '#402a57',
    400: '#5d4380',
    300: '#876bb3',
    200: '#c3b3e6',
    100: '#f1edfa',
  },
  secondary: {
    900: '#460073',
    800: '#5a0093',
    700: '#6f00b2',
    600: '#8400d2',
    500: '#a44ce5',
    400: '#bf80f0',
    300: '#d6aef7',
    200: '#ebd7fb',
    100: '#faf1fe',
  },
  neutral: {
    900: '#111111',
    800: '#2c2c2c',
    700: '#444444',
    600: '#666666',
    500: '#999999',
    400: '#bbbbbb',
    300: '#dddddd',
    200: '#f0f0f0',
    100: '#ffffff',
  },
};

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