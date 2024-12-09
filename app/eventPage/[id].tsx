import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { ScrollView, SizableText, Text, View, XStack, YStack } from "tamagui";

import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEventById } from "@/hooks/use-event";
import { useUser } from "@/hooks/use-user";

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const { data: events } = useEventById(Number(id));
  const { data: user } = useUser();
  const event = events?.docs[0];

  const router = useRouter();

  if (!event) {
    return <Text>Loading...</Text>;
  }

  const joinStatus = localStorage.getItem(event.eventCode);

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
    <View style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap="$3">
          <XStack>
            <SizableText size="$10">{event.title}</SizableText>
            {joinStatus === "joined" && (
              <SizableText
                size="$4"
                alignContent="center"
                marginLeft="$6"
                color="green" // TODO: Improve styling of this text
              >
                Registered!
              </SizableText>
            )}
          </XStack>
          <SizableText size="$4">{event.eventCode}</SizableText>
          <SizableText size="$4">
            <XStack gap="$2">
              <IconSymbol name="calendar" size={24} color="$color8" />
              <Text>{formattedDate}</Text>
            </XStack>
          </SizableText>
          <SizableText size="$4">
            <XStack gap="$2">
              <IconSymbol name="mappin.and.ellipse" size={24} color="$color8" />
              <Text>{event.address}</Text>
            </XStack>
          </SizableText>
          {typeof event.organizer !== "number" && (
            <>
              <SizableText size="$8">Organizer:</SizableText>
              <SizableText>
                <XStack gap="$2">
                  <IconSymbol name="person.fill" size={24} color="$color8" />
                  <Text>{event.organizer.name}</Text>
                </XStack>
              </SizableText>
            </>
          )}
          <SizableText size="$8">Details:</SizableText>
          <SizableText size="$4">{event.description}</SizableText>
          {event.attendees && event.attendees.length > 0 && (
            <>
              <SizableText size="$8">Attendees:</SizableText>
              {event.attendees.map(
                (attendee) =>
                  typeof attendee !== "number" && (
                    <SizableText key={attendee.id}>{attendee.name}</SizableText>
                  )
              )}
            </>
          )}
        </YStack>
      </ScrollView>
      {joinStatus !== "joined" &&
        typeof event.organizer !== "number" &&
        user?.id === event.organizer.id && (
          <FloatingActionButton
            iconAfter={
              <IconSymbol name="square.and.pencil" size={24} color="$color8" />
            }
            // onPress={() => navigation.navigate("eventEdit", { eventId: event.docs[0].id })}
          >
            Edit Event
          </FloatingActionButton>
        )}
      {joinStatus !== "joined" &&
        typeof event.organizer !== "number" &&
        user?.id !== event.organizer.id && (
          <FloatingActionButton
            iconAfter={
              <IconSymbol name="arrow.right" size={24} color="white" />
            }
            onPress={() =>
              router.push({
                pathname: "/joinEvent/attendeeDetails",
                params: { code: event.eventCode, id: event.id },
              })
            }
            color="white"
          >
            Join event
          </FloatingActionButton>
        )}
      {joinStatus === "joined" &&
        typeof event.organizer !== "number" &&
        user?.id !== event.organizer.id && (
          <FloatingActionButton
            iconAfter={<IconSymbol name="cross" size={24} color="white" />}
            // TODO: implement cancel attendance
            // onPress={() => {
            //   })
            // }
            color="white"
          >
            Cancel attendance
          </FloatingActionButton>
        )}
    </View>
  );
}
