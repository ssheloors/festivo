import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Button, ScrollView, SizableText, Text, XStack, YStack } from "tamagui";

import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEventById } from "@/hooks/use-event";
import { useUser } from "@/hooks/use-user";

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const { data: event } = useEventById(Number(id));
  const { data: user } = useUser();
  // const navigation = useNavigation();

  if (!event) {
    return <Text>Loading...</Text>;
  }

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format();

  return (
    <ScrollView>
      <YStack padding="$4" gap="$3">
        <SizableText size="$10">{event.docs[0].title}</SizableText>
        <SizableText size="$4">{event.docs[0].eventCode}</SizableText>
        <SizableText size="$4">
          <XStack gap="$2">
            <IconSymbol name="calendar" size={24} color="#000" />
            <Text>{formattedDate}</Text>
          </XStack>
        </SizableText>
        <SizableText size="$4">
          <XStack gap="$2">
            <IconSymbol name="mappin.and.ellipse" size={24} color="#000" />
            <Text>{event.docs[0].address}</Text>
          </XStack>
        </SizableText>
        {typeof event.docs[0].organizer !== "number" && (
          <>
            <SizableText size="$8">Organizer:</SizableText>
            <SizableText>
              <XStack gap="$2">
                <IconSymbol name="person.fill" size={24} color="#000" />
                <Text>{event.docs[0].organizer.name}</Text>
              </XStack>
            </SizableText>
          </>
        )}
        <SizableText size="$8">Details:</SizableText>
        <SizableText size="$4">{event.docs[0].description}</SizableText>
        {event.docs[0].attendees && event.docs[0].attendees.length > 0 && (
          <>
            <SizableText size="$8">Attendees:</SizableText>
            {event.docs[0].attendees.map(
              (attendee) =>
                typeof attendee !== "number" && (
                  <SizableText key={attendee.id}>{attendee.name}</SizableText>
                )
            )}
          </>
        )}
        {typeof event.docs[0].organizer !== "number" &&
          user?.id === event.docs[0].organizer.id && (
            <Button
              iconAfter={
                <IconSymbol name="square.and.pencil" size={24} color="white" />
              }
              // onPress={() => navigation.navigate("eventEdit", { eventId: event.docs[0].id })}
              backgroundColor="#282828"
              color="white"
            >
              Edit Event
            </Button>
          )}
      </YStack>
    </ScrollView>
  );
}
