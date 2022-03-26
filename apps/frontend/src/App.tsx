import { StatusBar } from 'expo-status-bar';
import { QueryClient, QueryClientProvider } from 'react-query';
import { NativeBaseProvider, Box, Text } from "native-base";
import { AppBar } from './components/AppBar';
import { theme, useThemeConfig } from './Theme';
import { trpc, client } from './utils/trpc';
import { useState } from 'react';
import CopyToClipboard from './components/CopyToClipboard';
function InnerApp() {
  const { bgColor, txtColor } = useThemeConfig();
  return (
    <>
      <AppBar ></AppBar>
      <Box flex={1} alignItems="center" justifyContent="center" bgColor={bgColor}>
        <Text color={txtColor}>Open up App.js to start working on your app!</Text>
        <CopyToClipboard label='label' value='TESTING' />
      </Box>
    </>
  );
}

export default function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <trpc.Provider client={client} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <NativeBaseProvider theme={theme}>
          <InnerApp></InnerApp>
          <StatusBar style="auto" />
        </NativeBaseProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}
