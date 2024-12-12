import { Stack } from "expo-router";
import { useMemo } from "react";
import { useTheme } from "tamagui";

export default function Layout({ segment }: { segment: string }) {
  const theme = useTheme();

  const rootScreen = useMemo(() => {
    switch (segment) {
      case "(index)":
        return (
          <Stack.Screen
            name="index"
            options={{ title: "Join Event", headerShown: false }}
          />
        );
      case "(host)":
        return (
          <Stack.Screen
            name="host"
            options={{ title: "Host", headerShown: false }}
          />
        );
    }
  }, [segment]);

  return (
    <Stack
      screenOptions={{
        contentStyle: { backgroundColor: theme.color1.val },
        headerStyle: { backgroundColor: theme.color1.val },
        headerShadowVisible: false,
      }}
    >
      {rootScreen}
      <Stack.Screen name="event/[id]/index" options={{ title: "Event" }} />
      <Stack.Screen
        name="event/[id]/join"
        options={{
          presentation: "modal",
          headerShown: true,
          headerLargeTitle: true,
          title: "Contact Information",
        }}
      />
      <Stack.Screen
        name="event/create"
        options={{
          title: "Create Event",
          headerLargeTitle: true,
        }}
      />
      <Stack.Screen
        name="joined-events/index"
        options={{ title: "Joined Events", headerLargeTitle: true }}
      />
      <Stack.Screen
        name="login"
        options={{ title: "Login", headerShown: false }}
      />
    </Stack>
  );
}
