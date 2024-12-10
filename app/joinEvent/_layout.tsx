import { Stack } from "expo-router";
import { useTheme } from "tamagui";

export default function Layout() {
  const theme = useTheme();

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Stack.Screen name="joinEvent/attendeeDetails" />
      <Stack.Screen name="joinEvent/success" />
    </Stack>
  );
}
