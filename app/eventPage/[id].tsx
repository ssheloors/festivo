import { Link, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, SizableText, Text, View, XStack, YStack } from "tamagui";

import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAttendance } from "@/hooks/use-attendance";
import { useEventById } from "@/hooks/use-event";
import { useUser } from "@/hooks/use-user";

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const { data: event } = useEventById(Number(id));
  const { data: user } = useUser();

  const attendance = useAttendance(typeof id === "string" ? id : id[0]);
  const userOwnsEvent =
    user != null &&
    typeof event?.organizer !== "number" &&
    user?.id === event?.organizer.id;
  const hasJoined = attendance.data != null;

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
  }).format(new Date(event.eventDate));

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap="$3">
          <XStack>
            <SizableText size="$10">{event.title}</SizableText>
            {hasJoined && (
              <SizableText
                size="$4"
                alignContent="center"
                marginLeft="$6"
                color="green" // TODO: Improve styling of this text
                testID="joined-message"
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
          {event.attendees?.docs && event.attendees.docs?.length > 0 && (
            <>
              <SizableText size="$8">Attendees:</SizableText>
              {event.attendees.docs.map(
                (attendee) =>
                  typeof attendee !== "number" && (
                    <SizableText key={attendee.id}>{attendee.name}</SizableText>
                  ),
              )}
            </>
          )}
        </YStack>
      </ScrollView>
      {userOwnsEvent ? (
        <FloatingActionButton
          iconAfter={
            <IconSymbol name="square.and.pencil" size={24} color="$color8" />
          }
          testID="edit-button"
        >
          Edit Event
        </FloatingActionButton>
      ) : !attendance.isPending ? (
        hasJoined ? (
          <FloatingActionButton
            iconAfter={<IconSymbol name="cross" size={24} color="white" />}
            // TODO: implement cancel attendance
            // onPress={() => {
            //   })
            // }
            color="accent" // I like white for the text color, let's look into it
            testID="cancel-button"
          >
            Cancel attendance
          </FloatingActionButton>
        ) : (
          <Link
            push
            href={{
              pathname: "/joinEvent/attendeeDetails",
              params: { code: event.eventCode, id: event.id },
            }}
            asChild
            testID="join-button"
          >
            <FloatingActionButton
              iconAfter={
                <IconSymbol name="arrow.right" size={24} color="white" />
              }
              color="white"
            >
              Join event
            </FloatingActionButton>
          </Link>
        )
      ) : null}
    </View>
  );
}
