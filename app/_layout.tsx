import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { config } from '@tamagui/config/v3';
import { TamaguiProvider, createTamagui } from 'tamagui';

const queryClient = new QueryClient();
const tamaguiConfig = createTamagui(config)

// TypeScript types across all Tamagui APIs
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf { }
}

export default function RootLayout() {
  return (
    <TamaguiProvider config={tamaguiConfig}>
      <QueryClientProvider client={queryClient}>
        <Stack>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </QueryClientProvider>
    </TamaguiProvider >
  );
}
