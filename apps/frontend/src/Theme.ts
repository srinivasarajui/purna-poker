import { extendTheme, useColorMode, useColorModeValue, useContrastText } from "native-base";

export const theme = extendTheme({
    colors: {
        primary: {
            50: '#eef2fa',
            100: '#d1d5da',
            200: '#E5E6E6',
            300: '#9ca1ae',
            400: '#7f8697',
            500: '#666d7d',
            600: '#3c4451',
            700: '#383c46',
            800: '#20252E',
            900: '#16181d',
        },
    },
    config: {
        initialColorMode: 'dark',
    },
});
// BG COLOR
export function useThemeConfig() {
    const { colorMode } = useColorMode();
    const bgColor = useColorModeValue("primary.100", "primary.900")
    const txtColor = useContrastText(bgColor);
    const barBgColor = 'primary.600';
    const barTxtColor = useContrastText(barBgColor);
    return {
        colorMode,
        bgColor,
        txtColor,
        barBgColor,
        barTxtColor
    }
}