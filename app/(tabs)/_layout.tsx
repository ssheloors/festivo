import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";
import { useTheme } from "tamagui";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { BlurTabBarBackground } from "@/components/ui/TabBarBackground";

export default function TabLayout() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarBackground: BlurTabBarBackground,
        // TODO: Verify that this actually works
        tabBarActiveTintColor: theme.accentColor.get(),
        tabBarActiveBackgroundColor: theme.color1.get(),
        tabBarStyle: {
          ...Platform.select({
            ios: {
              // Use a transparent background on iOS to show the blur effect
              position: "absolute",
            },
          }),
        },
        sceneStyle: {
          backgroundColor: theme.background.get(),
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <IconSymbol size={28} name="house.fill" color={color as any} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ color }) => (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            <IconSymbol size={28} name="paperplane.fill" color={color as any} />
          ),
        }}
      />
    </Tabs>
  );
}
