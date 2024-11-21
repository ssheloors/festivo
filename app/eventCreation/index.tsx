import { View, ScrollView, KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import { Button, Label, YStack, SizableText, TextArea, Text } from "tamagui";
import React, { useState } from "react";
import DateTimePicker from '@react-native-community/datetimepicker';
import { FormField } from "@/components/FormField";
import { useForm } from "react-hook-form";
import { Link, router } from "expo-router";
import { useEventCreation } from "@/hooks/use-event-creation";
import { useUser } from "@/hooks/use-user";
import { date } from "zod";

export default function EventCreation() {
  const form = useForm({ defaultValues: { title: "", address: "", description: "", eventDate: "" } });
  // const showDatepicker = () => {
  //   setShow(true);
  // };
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
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    form.setValue("eventDate", currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <YStack
             padding="$4"
             gap="$2">
          <SizableText size="$9">Create an event</SizableText>
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
          <Label>Event Date</Label>
          <SafeAreaView>
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
                />
                <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onChange}
                minimumDate={new Date()}
                />
                <Text>{date.toString()}</Text>
            </SafeAreaView>

          <Label>Event description</Label>
          <TextArea
            placeholder="Event description"
            onChangeText={(text) => form.setValue("description", text)}
           />
           
          <Button
            onPress={onSubmit}
          >Create event</Button>
        </YStack>
    </KeyboardAvoidingView>
  );
}