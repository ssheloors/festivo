import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="joinEvent/attendeeDetails" />
      <Stack.Screen name="joinEvent/success" />
    </Stack>
  );
}
