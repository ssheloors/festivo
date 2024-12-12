import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { ReactNode } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, View } from "tamagui";

export function CustomContainer({
  cta,
  children,
  scroll = false,
}: {
  cta?: ReactNode;
  children: ReactNode;
  scroll?: boolean;
}) {
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {scroll ? (
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          paddingBottom={cta != null ? "$4" : "$0"}
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingBottom: tabBarHeight + (cta != null ? 24 : 0),
          }}
        >
          {children}
        </ScrollView>
      ) : (
        <View paddingBottom={cta != null ? "$4" : "$0"} flex={1}>
          {children}
        </View>
      )}
      {cta}
    </KeyboardAvoidingView>
  );
}
