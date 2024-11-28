import { usePayload } from "@/hooks/use-payload";
import React from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { SizableText, YStack, Button, Text, XStack } from "tamagui";
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";

export default function EventCreation() {
  const form = useForm({
    defaultValues: {
      code: "",
    },
  });

  const payload = usePayload();

  const { data, refetch } = useQuery({
    queryKey: ["events"],
    queryFn: () =>
      payload.collections.event.find({
        where: {
          eventCode: {
            equals: form.getValues("code"),
          },
        },
      }),
    enabled: false,
  });

  const onSubmit = form.handleSubmit(() => {
    if (form.getValues("code")) {
      refetch();
    } else {
      alert("Please input the code");
    }
  });

  console.log(data?.docs[0]);

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <YStack padding="$4">
        <SizableText size="$9" fontWeight="bold">
          Join an event
        </SizableText>
        <FormField
          form={form}
          name="code"
          label="Event code"
          inputProps={{
            placeholder: "input code here",
          }}
        />
        <Button onPress={onSubmit}>Join</Button>
        {data?.docs[0] ? (
          <XStack marginTop="$14">
            <YStack>
              <Text>Event title</Text>
              <Text>Event address</Text>
            </YStack>
            <YStack>
              <Text>{data.docs[0].title}</Text>
              <Text>{data.docs[0].address}</Text>
            </YStack>
          </XStack>
        ) : null}
      </YStack>
    </KeyboardAvoidingView>
  );
}
