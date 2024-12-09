import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, StyleSheet } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SizableText, YStack, Button, ScrollView } from "tamagui";

import { usePayload } from "@/hooks/use-payload";

export default function EventCreation() {
  const payload = usePayload();

  const { refetch } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      payload.collections.event.find({
        where: {
          eventCode: {
            equals: value,
          },
        },
      }),
    enabled: false,
  });

  const router = useRouter();

  const onSubmit = () => {
    if (value !== "") {
      refetch().then((response) => {
        if (response.data?.docs.length === 0) {
          alert("Event not found");
        } else {
          const eventId = response.data?.docs[0].id;
          if (eventId !== undefined) {
            router.push({
              pathname: "/eventPage/[id]",
              params: { id: eventId },
            });
          }
        }
      });
    } else {
      alert("Please input the code");
    }
  };

  // for the separated input field
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const styles = StyleSheet.create({
    // color handling might change later with the theme so i am not touching it
    cell: {
      width: 44,
      height: 44,
      lineHeight: 38,
      fontSize: 20,
      borderWidth: 2,
      borderColor: "#00000030",
      textAlign: "center",
      borderRadius: 9,
      textTransform: "uppercase",
    },
    focusCell: {
      borderColor: "#000",
    },
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <ScrollView>
        <YStack padding="$4" gap="$4" marginTop="$17">
          <SizableText size="$9" fontWeight="bold" textAlign="center">
            Join an event
          </SizableText>
          <SizableText textAlign="center">
            Type in the code of an event to sign up
          </SizableText>
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue}
            cellCount={CELL_COUNT}
            keyboardType="default"
            textContentType="oneTimeCode"
            renderCell={({ index, symbol, isFocused }) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}
                onLayout={getCellOnLayoutHandler(index)}
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
          <Button backgroundColor="#282828" color="white" onPress={onSubmit}>
            Join
          </Button>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
