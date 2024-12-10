import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { TamaguiProvider } from "tamagui";

import { useColorScheme } from "@/hooks/use-color-scheme";
import tamaguiConfig from "@/tamagui.config";

const queryClient = new QueryClient();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const theme = tamaguiConfig.themes[colorScheme];

  useEffect(() => {
    const bgColor = theme.background.val;
    SystemUI.setBackgroundColorAsync(bgColor);
  }, [theme.background]);

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            // headerTransparent: true,
            headerTintColor: theme.accentColor.val,
            headerStyle: {
              backgroundColor: theme.color2.val,
            },
            contentStyle: {
              backgroundColor: "transparent",
            },
          }}
        >
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
          <Stack.Screen
            name="joinEvent"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="eventPage"
            options={{
              title: "",
            }}
          />
          <Stack.Screen
            name="myEvents"
            options={{
              title: "",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
