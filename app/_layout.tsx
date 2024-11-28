import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TamaguiProvider, createTamagui } from "tamagui";
import tamaguiConfig from "@/tamagui.config";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
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
          <Stack.Screen
            name="joinEvent"
            options={{
              title: "",
            }}
          />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider>
  );
}
