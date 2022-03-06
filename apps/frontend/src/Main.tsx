import React from "react";
import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Box,
  Menu,
  Pressable,
  HamburgerIcon,
} from "native-base";
import { theme, useThemeConfig } from "./theme";
import { AppBar } from "./components/AppBar";
import { GameMenu } from "./components/GameMenu";
import { LandingPage } from "./pages/LandingPage";
import { GamePage } from "./pages/GamePage";

export default function Main() {
  return (
    <NativeBaseProvider theme={theme}>
      <Body />
    </NativeBaseProvider>
  );
}

function Body(){
  const { bgColor } = useThemeConfig();
  return (

    <VStack alignItems="center" flex={1}>
      <AppBar title="PSP" menu={<GameMenu />} />
      <Center
      bg={bgColor}
        flex={1}
        width="100%"
      >
        <GamePage />
      </Center>
    </VStack>
  )
}

