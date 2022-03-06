import { Box, HStack, StatusBar, Text } from "native-base";
import React from "react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { useThemeConfig } from "../theme";
export interface IAppBarProps {
  title: string
  menu?: JSX.Element;
}

export function AppBar(props: IAppBarProps) {
  const { barBgColor, barTxtColor } = useThemeConfig();
  return <>
    <StatusBar />
    <Box safeAreaTop bg={barBgColor} />
    <HStack bg={barBgColor} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
      <Text color={barTxtColor} fontSize="20" fontWeight="bold">
        {props.title}
      </Text>
      <HStack alignItems="center">
        <ToggleDarkMode />
        {
          (props.menu)
        }
      </HStack>
    </HStack>
  </>;
}
