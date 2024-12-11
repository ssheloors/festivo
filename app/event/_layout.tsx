import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        contentStyle: {
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Stack.Screen name="[id]/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="[id]/join"
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />
    </Stack>
  );
}
