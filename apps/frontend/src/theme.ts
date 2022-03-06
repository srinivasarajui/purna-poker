import { extendTheme, useColorMode, useColorModeValue, useContrastText } from "native-base";

export const theme = extendTheme({
  colors: {
    primary: {
      50: '#eef2fa',
      100: '#d4d7de',
      200: '#b8bcc5',
      300: '#9ca1ae',
      400: '#7f8697',
      500: '#666d7d',
      600: '#4f5562',
      700: '#383c46',
      800: '#21242b',
      900: '#080c13',
    },
  },
  config: {
    initialColorMode: 'dark',
  },
});

export function useThemeConfig() {
  const { colorMode } = useColorMode();
  const bgColor = useColorModeValue("primary.200", "primary.800")
  const txtColor = useContrastText(bgColor);
  const barBgColor = 'primary.600';
  const barTxtColor = 'white';
  return {
    colorMode,
    bgColor,
    txtColor,
    barBgColor,
    barTxtColor
  }
}