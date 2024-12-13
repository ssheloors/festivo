import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { showToastable } from "react-native-toastable";
import { YStack, SizableText, XStack } from "tamagui";

import { Button } from "@/components/Button";
import { CustomContainer } from "@/components/CustomContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { FormField } from "@/components/FormField";
import { TextArea } from "@/components/Input";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEventById } from "@/hooks/use-event";
import { useEventUpdate } from "@/hooks/use-event-update";
import { useUser } from "@/hooks/use-user";

export default function EditEvent() {
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: event } = useEventById(id);
  const { data: user, isLoading } = useUser();
  const updateEvent = useEventUpdate();
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      title: "",
      address: "",
      description: "",
      eventDate: new Date(),
    },
  });

  useEffect(() => {
    if (event) {
      form.reset({
        title: event.title,
        address: event.address,
        description: event.description ?? "",
        eventDate: new Date(event.eventDate),
      });
    }
  }, [event, form]);

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const onSubmit = form.handleSubmit(async ({ eventDate, ...data }) => {
    if (!user) {
      showToastable({
        message: "You must be logged in to create an event",
        duration: 2000,
        status: "success",
      });
    }
    try {
      await updateEvent.mutateAsync({
        id: id,
        eventDate: eventDate.toUTCString(),
        ...data,
      });
      showToastable({
        message: "Event edited successfully",
        duration: 2000,
        status: "success",
      });
      router.replace({
        pathname: `/event/[id]`,
        params: { id },
      });
    } catch {
      showToastable({
        message: "Error editing event",
        duration: 2000,
        status: "warning",
      });
    }
  });

  if (isLoading) {
    return <SizableText>Loading...</SizableText>;
  }

  return (
    <CustomContainer
      scroll
      cta={
        <FloatingActionButton
          iconAfter={<IconSymbol name="arrow.right" color="$color12" />}
          onPress={onSubmit}
          testID="submit-button"
        >
          Save changes
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
              field.onChange(date);
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
                <Button {...inputProps} onPress={showTimePicker} minWidth="$11">
                  {field.value.toTimeString().slice(0, 5)}
                </Button>
                <DateTimePickerModal
                  isVisible={isTimePickerVisible}
                  mode="time"
                  onConfirm={handleConfirm}
                  onCancel={hideTimePicker}
                />
              </XStack>
            );
          }}
        />
        <FormField
          form={form}
          name="description"
          label="Description"
          render={({ field, inputProps }) => (
            <TextArea
              placeholder="eg. Details about the event"
              height={100}
              {...inputProps}
              onChangeText={field.onChange}
              value={field.value}
              testID="description-input"
            />
          )}
        />
      </YStack>
    </CustomContainer>
  );
}
