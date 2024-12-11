import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { SizableText, YStack, XStack, styled, Text } from "tamagui";

import { Button } from "@/components/Button";
import { usePayload } from "@/hooks/use-payload";

const Cell = styled(Text, {
  borderWidth: 1,
  borderColor: "$color5",
  backgroundColor: "$color2",
  color: "$color9",
  justifyContent: "flex-start",
  aspectRatio: 1,
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "$6",
  height: 44,
  lineHeight: 42,
  borderRadius: "$radius.true",
});

export default function EventCreation() {
  const payload = usePayload();

  // for the separated input field
  const CELL_COUNT = 6;
  const [value, setValue] = useState("");
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT });
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const { refetch } = useQuery({
    queryKey: ["events", value],
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
    refetch().then((response) => {
      if (response.data?.docs.length === 0) {
        alert("Event not found");
      } else {
        const eventId = response.data?.docs[0].id;
        if (eventId !== undefined) {
          router.push({
            pathname: "/event/[id]",
            params: { id: eventId },
          });
        }
      }
    });
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <YStack
        padding="$4"
        gap="$4"
        flex={1}
        justifyContent="center"
        paddingBottom="$14"
        onPress={Keyboard.dismiss}
      >
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
          onChangeText={(v) => setValue(v.toUpperCase())}
          cellCount={CELL_COUNT}
          keyboardType="default"
          textContentType="oneTimeCode"
          rootStyle={{ gap: 10, justifyContent: "center" }}
          renderCell={({ index, symbol, isFocused }) => (
            <Cell key={index} onLayout={getCellOnLayoutHandler(index)}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Cell>
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
    </KeyboardAvoidingView>
  );
}
