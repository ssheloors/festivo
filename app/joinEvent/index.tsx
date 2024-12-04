import { usePayload } from "@/hooks/use-payload";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { SizableText, YStack, Button } from "tamagui";
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

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

  const router = useRouter();

  const onSubmit = form.handleSubmit(() => {
    if (form.getValues("code")) {
      refetch().then((response) => {
        if (response.data?.docs.length === 0) {
          alert("Event not found");
        } else {
          router.push({
            pathname: "/joinEvent/attendeeDetails",
            params: {code: form.getValues("code")}
          })
        }
      });
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
      </YStack>
    </KeyboardAvoidingView>
  );
}
