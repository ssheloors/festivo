import React from "react";
import { SizableText, TextArea, YStack } from "tamagui";
import { KeyboardAvoidingView, Platform } from "react-native";
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";

export default function AttendeeDetails() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      comments: "",
    },
  });
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <YStack padding="$4">
        <SizableText size="$9" fontWeight="bold">
          Your Contact <br />
          Information
        </SizableText>
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
          name="name"
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
              placeholder="eg. I'm bringing a friend, Diet restrictions, etc."
              height={100}
              {...inputProps}
              onChangeText={field.onChange}
            />
          )}
        />
      </YStack>
    </KeyboardAvoidingView>
  );
}
