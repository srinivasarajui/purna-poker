import { MoonIcon, SunIcon, IconButton, useColorMode } from "native-base";
import React from "react";
import { useThemeConfig } from "../Theme";
export function ToggleDarkMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { barTxtColor } = useThemeConfig();
    return (
        <IconButton colorScheme="indigo" icon={colorMode === 'light' ? <MoonIcon size="4" color={barTxtColor} /> : <SunIcon size="4" color={barTxtColor} />} onPress={() => toggleColorMode()} />
    );
}