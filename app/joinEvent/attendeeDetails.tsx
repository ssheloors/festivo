import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Button, SizableText, TextArea, YStack } from "tamagui";

import { FormField } from "@/components/FormField";
import { useAddAttendeeToEvent } from "@/hooks/use-add-attendee-to-event";

export default function AttendeeDetails() {
  const { code } = useLocalSearchParams() as { code: string };
  const router = useRouter();
  const addAttendeeMutation = useAddAttendeeToEvent(code);

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      comments: "",
      code: code,
    },
  });
  const onSubmit = form.handleSubmit(() => {
    try {
      addAttendeeMutation.mutate({
        eventId: code,
        name: form.getValues("name"),
        email: form.getValues("email"),
        comments: form.getValues("comments"),
      });
      router.push({
        pathname: "/joinEvent/success",
        params: { code: code },
      });
    } catch (error) {
      alert("Error adding you to the event" + error);
    }
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <SizableText size="$9" fontWeight="bold" padding="$4" paddingBottom="$1">
        Your Contact <br />
        Information
      </SizableText>
      <YStack padding="$4" gap="$2">
        <FormField
          form={form}
          name="name"
          label="Your Name *"
          inputProps={{
            placeholder: "Jane Doe",
          }}
        />
        <FormField
          form={form}
          name="email"
          label="Email *"
          inputProps={{
            placeholder: "jane.doe@gmail.com",
          }}
        />

        <FormField
          form={form}
          name="comments"
          label="Comments"
          render={({ field, inputProps }) => (
            <TextArea
              style={{ textAlignVertical: "top" }}
              placeholder="eg. I'm bringing a friend, diet restrictions, etc."
              height={100}
              {...inputProps}
              onChangeText={field.onChange}
            />
          )}
        />
        <Button backgroundColor="#282828" color="white" onPress={onSubmit}>
          Submit
        </Button>
      </YStack>
    </KeyboardAvoidingView>
  );
}
