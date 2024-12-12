import { router } from "expo-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showToastable } from "react-native-toastable";
import { YStack, SizableText, XStack } from "tamagui";

import { IconSymbol } from "../../../../components/ui/IconSymbol";

import { Button } from "@/components/Button";
import { CustomContainer } from "@/components/CustomContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { FormField } from "@/components/FormField";
import { TextArea } from "@/components/Input";
import { useEventCreation } from "@/hooks/use-event-creation";
import { useUser } from "@/hooks/use-user";

export default function EventCreation() {
  const form = useForm({
    defaultValues: {
      title: "",
      address: "",
      description: "",
      eventDate: new Date(),
    },
  });

  const createEvent = useEventCreation();
  const { data: user, isLoading } = useUser();

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); // for date picker
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false); // for time picker

  const onSubmit = form.handleSubmit(async ({ eventDate, ...data }) => {
    if (!user) {
      showToastable({
        message: "You must be logged in to create an event",
        duration: 2000,
        status: "success",
      });
      return;
    }

    try {
      const createdEvent = await createEvent.mutateAsync({
        eventDate: eventDate.toUTCString(),
        ...data,
        organizer: user.id,
      });
      showToastable({
        message: "Hooray! Event created successfully",
        duration: 2000,
        status: "success",
      });
      router.replace({
        pathname: "/event/[id]",
        params: { id: createdEvent.doc.id },
      });
    } catch {
      showToastable({
        message: "Error creating event",
        duration: 2000,
        status: "warning",
      });
    }
  });

  if (isLoading) {
    return <SizableText>Loading...</SizableText>;
  }

  // controller for the date
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  // controller for the time
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  return (
    <CustomContainer
      scroll
      cta={
        <FloatingActionButton
          iconAfter={<IconSymbol name="arrow.right" color="$color12" />}
          onPress={onSubmit}
          testID="submit-button"
        >
          Create event
        </FloatingActionButton>
      }
    >
      <YStack padding="$4" paddingTop="$0" gap="$2">
        <FormField
          form={form}
          name="title"
          label="Event title"
          inputProps={{
            placeholder: "eg. Bingo night",
            testID: "title-input",
          }}
        />
        <FormField
          form={form}
          name="address"
          label="Event address"
          inputProps={{
            placeholder: "eg. Kungsportsplatsen 1",
            testID: "address-input",
          }}
        />
        <FormField
          form={form}
          name="eventDate"
          label="Date & Time"
          render={({ field, inputProps }) => {
            const handleConfirm = (date: Date) => {
              hideDatePicker();
              hideTimePicker();
              field.onChange(date); // passing the full UTC date to the form
            };
            return (
              <XStack gap="$4" width="100%">
                <Button
                  {...inputProps}
                  onPress={showDatePicker}
                  flex={1}
                  variant="input"
                >
                  {field.value.toDateString()}
                </Button>
                <DateTimePickerModal
                  isVisible={isDatePickerVisible}
                  mode="date"
                  onConfirm={handleConfirm}
                  onCancel={hideDatePicker}
                  minimumDate={new Date()}
                />
                <Button
                  {...inputProps}
                  onPress={showTimePicker}
                  minWidth="$11"
                  variant="input"
                >
                  {field.value.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Button>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                  minimumDate={new Date()}
                />
              </XStack>
            );
          }}
        />
        <FormField
          form={form}
          name="description"
          label="Event Description"
          render={({ field, inputProps }) => (
            <TextArea
              placeholder="Event description"
              height={100}
              {...inputProps}
              onChangeText={field.onChange}
              testID="description-input"
            />
          )}
        />
      </YStack>
    </CustomContainer>
  );
}
