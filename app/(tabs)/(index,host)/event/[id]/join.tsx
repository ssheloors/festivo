import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useLocalSearchParams } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Spinner, YStack } from "tamagui";
import { z } from "zod";

import { CustomContainer } from "@/components/CustomContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { FormField } from "@/components/FormField";
import { TextArea } from "@/components/Input";
import { useAddAttendeeToEvent } from "@/hooks/use-add-attendee-to-event";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email(),
  comments: z.string(),
});

export default function AttendeeDetails() {
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const addAttendeeMutation = useAddAttendeeToEvent(Number(id));

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
      await addAttendeeMutation.mutateAsync(form.getValues());
      router.dismiss();
    } catch (error) {
      alert("Error adding you to the event" + error);
    }
  });

  return (
    <CustomContainer
      scroll
      cta={
        <FloatingActionButton
          onPress={onSubmit}
          disabled={!form.formState.isValid}
          icon={addAttendeeMutation.isPending ? <Spinner /> : null}
          testID="submit-button"
        >
          Submit
        </FloatingActionButton>
      }
    >
      <YStack padding="$4" gap="$2">
        <FormField
          form={form}
          name="name"
          label="Your Name *"
          inputProps={{
            placeholder: "Jane Doe",
            textContentType: "name",
            autoCapitalize: "words",
            testID: "name-input",
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
            testID: "email-input",
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
              testID="comments-input"
            />
          )}
        />
      </YStack>
    </CustomContainer>
  );
}
