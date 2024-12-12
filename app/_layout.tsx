import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamaguiProvider } from "tamagui";

import { PayloadClientProvider } from "@/components/PayloadClientProvider";
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

  const safeAreaInsets = useSafeAreaInsets();

  const reactNavigationTheme = useMemo(
    () =>
      ({
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          background: theme.color1.val,
          primary: theme.color7.val,
          text: theme.color7.val,
        },
      }) satisfies typeof DefaultTheme,
    [theme],
  );

  return (
    <ThemeProvider value={reactNavigationTheme}>
      <TamaguiProvider config={tamaguiConfig} defaultTheme={colorScheme}>
        <QueryClientProvider client={queryClient}>
          <PayloadClientProvider>
            <Stack
              screenOptions={{
                headerTintColor: theme.accentColor.val,
                headerStyle: {
                  backgroundColor: theme.color2.val,
                },
              }}
            >
              <Stack.Screen
                name="(tabs)"
                options={{
                  title: "Home",
                  headerShown: false,
                  contentStyle: {
                    paddingTop: safeAreaInsets.top,
                    backgroundColor: theme.background.val,
                  },
                }}
              />
            </Stack>
          </PayloadClientProvider>
        </QueryClientProvider>
      </TamaguiProvider>
    </ThemeProvider>
  );
}
