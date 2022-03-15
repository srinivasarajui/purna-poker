import React, { useState } from "react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { trpc } from './utils/trpc';

import {
  Center,
  NativeBaseProvider,
  VStack,
} from "native-base";
import { theme, useThemeConfig } from "./theme";
import { AppBar } from "./components/AppBar";
import { GameMenu } from "./components/GameMenu";
import { LandingPage } from "./pages/LandingPage";

import { GamePage } from "./pages/GamePage";
import { AppStateProvider, useAppDataContext } from "./utils/state";

export default function Main() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: 'http://localhost:3000/api',
    }),
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <AppStateProvider >
            <Body />
          </AppStateProvider>
        </NativeBaseProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

function Body() {
  const { bgColor } = useThemeConfig();
  const { isInGame } = useAppDataContext()
  return (
    <VStack alignItems="center" flex={1}>
      <AppBar title="PSP" menu={isInGame ? (
        <GameMenu />
      ) : undefined} />
      <Center
        bg={bgColor}
        flex={1}
        width="100%"
      >
        {isInGame ? (
          <GamePage />
        ) : (
          <LandingPage />
        )}
      </Center>
    </VStack>
  )
}

