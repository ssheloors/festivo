import {
  View,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import { Button, Label, YStack, SizableText, TextArea, Text, XStack } from "tamagui";
import React, { useState } from "react";
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { useEventCreation } from "@/hooks/use-event-creation";
import { useUser } from "@/hooks/use-user";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { ArrowRight } from "lucide-react-native";

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

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); //for date picker
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false); //for time picker

  const onSubmit = form.handleSubmit(async ({ eventDate, ...data }) => {
    if (!user) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      await createEvent.mutateAsync({ eventDate: eventDate.toUTCString(), ...data, organizer: user.id });
      router.push("/yourEvents");
    } catch (error) {
      alert("You are not allowed to perform this action.");
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

  const handleConfirm = (date: any) => {
    hideDatePicker();
    hideTimePicker();
    form.setValue("eventDate", date); //passing the full UTC date to the form
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 500 })}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <Pressable onPress={Keyboard.dismiss}>
        <YStack padding="$4" gap="$2">
          <SizableText size="$9" fontSize={32} fontWeight={"bold"}>
            Create an event
          </SizableText>
          <View>
            <FormField
              form={form}
              name="title"
              label="Event title"
              inputProps={{
                placeholder: "eg. Bingo night",
              }}
            />
            <FormField
              form={form}
              name="address"
              label="Event address"
              inputProps={{
                placeholder: "eg. Kungsportsplatsen 1",
              }}
            />
            <View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ marginRight: 30 }}>
                  <FormField
                    form={form}
                    name="eventDate"
                    label="Date & Time"
                    render={({ field, inputProps }) => {
                      const handleConfirm = (date: any) => {
                        hideDatePicker();
                        hideTimePicker();
                        field.onChange(date); //passing the full UTC date to the form
                      };
                      return (
                        <XStack gap="$4">
                          <Button
                            {...inputProps}
                            variant="outlined"
                            onPress={showDatePicker}
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
                            {...inputProps} variant="outlined" onPress={showTimePicker}>
                            {field.value.toLocaleTimeString()}
                          </Button>
                          <DateTimePickerModal
                            isVisible={isTimePickerVisible}
                            mode="time"
                            onConfirm={handleConfirm}
                            onCancel={hideTimePicker}
                            minimumDate={new Date()}
                          />
                        </XStack>
                      )
                    }}
                  />
                </View>
              </View>
            </View>
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
                />
              )}
            />
          </View>
          <Button
            iconAfter={<ArrowRight />}
            backgroundColor={"#282828"}
            color={"white"}
            onPress={onSubmit}
          >
            Create event
          </Button>
        </YStack>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
