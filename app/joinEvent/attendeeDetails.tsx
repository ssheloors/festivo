import { zodResolver } from "@hookform/resolvers/zod";
import { useLocalSearchParams } from "expo-router";
import { useRouter } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform } from "react-native";
import { ScrollView, SizableText, Spinner, YStack } from "tamagui";
import { z } from "zod";

import { FloatingActionButton } from "@/components/FloatingActionButton";
import { FormField } from "@/components/FormField";
import { TextArea } from "@/components/Input";
import { useAddAttendeeToEvent } from "@/hooks/use-add-attendee-to-event";
import { useStorage } from "@/hooks/use-storage";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  comments: z.string(),
});

export default function AttendeeDetails() {
  const { code } = useLocalSearchParams() as { code: string };
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const addAttendeeMutation = useAddAttendeeToEvent(code);
  const storage = useStorage();

  const form = useForm<z.infer<typeof formSchema>>({
    defaultValues: {
      name: "",
      email: "",
      comments: "",
    },
    resolver: zodResolver(formSchema),
  });
  const onSubmit = form.handleSubmit(async () => {
    try {
      await addAttendeeMutation.mutate({
        eventId: code,
        ...form.getValues(),
      });
      storage.setString(code, "joined");
      router.replace({
        pathname: "/eventPage/[id]",
        params: { id: id },
      });
    } catch (error) {
      alert("Error adding you to the event" + error);
    }
  });

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <SizableText
          size="$9"
          fontWeight="bold"
          padding="$4"
          paddingBottom="$1"
        >
          Your Contact Information
        </SizableText>
        <YStack padding="$4" gap="$2">
          <FormField
            form={form}
            name="name"
            label="Your Name *"
            inputProps={{
              placeholder: "Jane Doe",
              textContentType: "name",
              autoCapitalize: "words",
            }}
          />
          <FormField
            form={form}
            name="email"
            label="Email *"
            inputProps={{
              placeholder: "jane.doe@gmail.com",
              keyboardType: "email-address",
              textContentType: "emailAddress",
              autoCapitalize: "none",
            }}
          />

          <FormField
            form={form}
            name="comments"
            label="Comments"
            render={({ field, inputProps }) => (
              <TextArea
                placeholder="eg. I'm bringing a friend, diet restrictions, etc."
                height={100}
                {...inputProps}
                onChangeText={field.onChange}
              />
            )}
          />
        </YStack>
      </ScrollView>

      <FloatingActionButton
        theme="accent"
        onPress={onSubmit}
        disabled={!form.formState.isValid}
        icon={addAttendeeMutation.isPending ? <Spinner /> : null}
      >
        Submit
      </FloatingActionButton>
    </KeyboardAvoidingView>
  );
}
