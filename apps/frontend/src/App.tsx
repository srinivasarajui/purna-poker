import { StatusBar } from 'expo-status-bar';
import { NativeBaseProvider, Box, Text } from "native-base";
import { AppBar } from './components/AppBar';
import { ToggleDarkMode } from './components/ToggleDarkMode';
import { theme, useThemeConfig } from './Theme';

function InnerApp() {
  const { bgColor, txtColor } = useThemeConfig();
  return (
    <>
      <AppBar ></AppBar>
      <Box flex={1} alignItems="center" justifyContent="center" bgColor={bgColor}>
        <Text color={txtColor}>Open up App.js to start working on your app!</Text>
      </Box>
    </>
  );
}

export default function App() {
  return (
    <NativeBaseProvider theme={theme}>
      <InnerApp></InnerApp>
      <StatusBar style="auto" />
    </NativeBaseProvider>
  );
}
