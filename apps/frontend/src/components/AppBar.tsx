import { Box, Center, Heading, HStack, StatusBar, Text, VStack } from "native-base";
import React from "react";
import { ToggleDarkMode } from "./ToggleDarkMode";
import { useThemeConfig } from "../Theme";
import LogoIcon from "./svg/LogoIcon";
export interface IAppBarProps {
    title?: string
    menu?: JSX.Element;
}

export function AppBar(props: IAppBarProps) {
    const { barBgColor, barTxtColor } = useThemeConfig();
    return <>
        <StatusBar />
        <Box safeAreaTop bg={barBgColor} />
        <HStack bg={barBgColor} px="1" py="3" justifyContent="space-between" alignItems="center" w="100%" >
            <HStack>
                <HStack>
                    <LogoIcon />
                    <Center >
                        <VStack alignItems="center"    >

                            <Text bold fontSize="lg" color={barTxtColor}>PURNA</Text>
                            <Text fontSize="xs" color={barTxtColor}>SCRUM POKER</Text>

                        </VStack>
                    </Center>
                </HStack>
            </HStack>
            <HStack alignItems="center">
                <ToggleDarkMode />
                {
                    (props.menu)
                }
            </HStack>
        </HStack>
    </>;
}