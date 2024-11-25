import { View, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { Button, Label, YStack, SizableText, TextArea, Text } from "tamagui";
import React, { useState } from "react";
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { useEventCreation } from "@/hooks/use-event-creation";
import { useUser } from "@/hooks/use-user";
import { date } from "zod";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { hide } from "expo-router/build/utils/splash";
import { bold } from "colorette";
import { ArrowRight } from 'lucide-react-native';


export default function EventCreation() {
  const form = useForm({ defaultValues: { title: "", address: "", description: "", eventDate: "" } });

  const createEvent = useEventCreation();
  const { data: user, isLoading } = useUser();

  const onSubmit = form.handleSubmit(async (data) => {
    if (!user) {
      alert("You must be logged in to create an event.");
      return;
    }

    try {
      await createEvent.mutateAsync(data);
      router.push("/yourEvents");
    } catch (error) {
      alert("You are not allowed to perform this action.");
    }
  });

  if (isLoading) {
    return <SizableText>Loading...</SizableText>;
  }

  const [eventDate, setEventDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false); //for date picker
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false); //for time picker

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
    setEventDate(date);
    hideDatePicker();
    hideTimePicker();
    form.setValue("eventDate", date); //passing the full UTC date to the form
  };


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack
          padding="$4"
          gap="$2">
          <SizableText size="$9" fontSize={32} fontWeight={"bold"}>Create an event</SizableText>
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
                  <Label>Date</Label>
                  <Button variant="outlined" onPress={showDatePicker}>{eventDate.toDateString()}</Button>
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    minimumDate={eventDate}
                  />
                </View>
                <View>
                  <Label>Time</Label>
                  <Button variant="outlined" onPress={showTimePicker}>{eventDate.toLocaleTimeString()}</Button>
                  <DateTimePickerModal
                    isVisible={isTimePickerVisible}
                    mode="time"
                    onConfirm={handleConfirm}
                    onCancel={hideTimePicker}
                    minimumDate={eventDate}
                  />
                </View>
              </View>
            </View>
            <Label>Event description</Label>
            <TextArea
              placeholder="Event description"
              height={100}
              onChangeText={(text) => form.setValue("description", text)}
            />
          </View>
          <Button
            iconAfter={<ArrowRight />}
            backgroundColor={"#282828"}
            color={"white"}
            onPress={onSubmit}
          >Create event</Button>
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView >
  );
}
