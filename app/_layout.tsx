import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { TamaguiProvider, useTheme } from "tamagui";

import { useColorScheme } from "@/hooks/use-color-scheme";
import tamaguiConfig from "@/tamagui.config";

const queryClient = new QueryClient();

// HACK: This is ugly. But somewhat needed.
function SetBackgroundColor() {
  const theme = useTheme();

  useEffect(() => {
    const bgColor = theme.background.get();
    SystemUI.setBackgroundColorAsync(bgColor);
  }, [theme.background]);

  return null;
}

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <SetBackgroundColor />
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" />
          <Stack.Screen
            name="login"
            options={{
              title: "Sign in",
            }}
          />
          <Stack.Screen
            name="yourEvents"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="eventCreation"
            options={{
              title: "",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
