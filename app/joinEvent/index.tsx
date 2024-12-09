import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SizableText, YStack, ScrollView, Input, XStack } from "tamagui";

import { Button } from "@/components/Button";
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
          router.push({
            pathname: "/joinEvent/attendeeDetails",
            params: { code: value },
          });
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

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
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
            rootStyle={{ gap: 10, justifyContent: "center" }}
            renderCell={({ index, symbol, isFocused }) => (
              <Input
                key={index}
                onLayout={getCellOnLayoutHandler(index)}
                aspectRatio={1}
                textAlign="center"
                fontWeight="bold"
                fontSize="$6"
              >
                {symbol || (isFocused ? <Cursor /> : null)}
              </Input>
            )}
          />
          <XStack justifyContent="center">
            <Button
              theme="accent"
              onPress={onSubmit}
              minWidth="$10"
              disabled={value.length !== CELL_COUNT}
            >
              Join
            </Button>
          </XStack>
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
