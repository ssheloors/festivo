import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
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

  return (
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
  );
}
