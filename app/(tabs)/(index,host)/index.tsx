import { useQuery } from "@tanstack/react-query";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { showToastable } from "react-native-toastable";
import { SizableText, YStack, XStack, styled, Text } from "tamagui";

import { Button } from "@/components/Button";
import { CustomContainer } from "@/components/CustomContainer";
import { useAllAttendance } from "@/hooks/use-attendance";
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
        showToastable({
          message: "Whoops! Event not found",
          duration: 2000,
          status: "success",
        });
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

  const attendance = useAllAttendance();

  return (
    <CustomContainer scroll>
      <YStack
        padding="$4"
        paddingTop={250}
        gap="$4"
        flex={1}
        justifyContent="center"
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
            borderRadius="$radius.12"
          >
            Join
          </Button>
        </XStack>
        {attendance.data && attendance.data.length > 0 && (
          <Link href="/(tabs)/(index)/joined-events" asChild>
            <TouchableOpacity>
              <SizableText color="$accentColor" textAlign="center">
                Attending {attendance.data.length} events
              </SizableText>
            </TouchableOpacity>
          </Link>
        )}
      </YStack>
    </CustomContainer>
  );
}
