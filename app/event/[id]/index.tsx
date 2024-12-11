import { Link, useLocalSearchParams } from "expo-router";
import React, { ReactNode } from "react";
import { ScrollView, SizableText, Text, View, XStack, YStack } from "tamagui";

import { ChipData, Chips } from "@/components/Chips";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAttendance } from "@/hooks/use-attendance";
import { useEventById } from "@/hooks/use-event";
import { useUser } from "@/hooks/use-user";

function DataContainer({ children }: { children: ReactNode }) {
  return (
    <YStack
      paddingInline="$4"
      paddingBlock="$4"
      backgroundColor="$color2"
      borderRadius="$radius.true"
      gap="$3"
    >
      {children}
    </YStack>
  );
}

function DataField({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <XStack alignItems="center" gap="$3">
      <View flex={0}>{icon}</View>
      <SizableText flex={1} color="$color8">
        {children}
      </SizableText>
    </XStack>
  );
}

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

  const chips: ChipData[] = [
    { text: `Event code: ${event.eventCode}`, theme: "alt1" },
  ];
  if (hasJoined) chips.push({ text: "Registered", theme: "accent" });

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <YStack padding="$4" gap="$3">
          <SizableText size="$9" fontWeight="bold" textWrap="wrap">
            {event.title}
          </SizableText>
          <Chips chips={chips} />

          <DataContainer>
            <DataField
              icon={<IconSymbol name="calendar" size={24} color="$color8" />}
            >
              {formattedDate}
            </DataField>
            <DataField
              icon={
                <IconSymbol
                  name="mappin.and.ellipse"
                  size={24}
                  color="$color8"
                />
              }
            >
              {event.address}
            </DataField>

            {typeof event.organizer !== "number" && (
              <DataField
                icon={
                  <IconSymbol name="person.fill" size={24} color="$color8" />
                }
              >
                {event.organizer.name}
              </DataField>
            )}
          </DataContainer>

          <SizableText size="$7" fontWeight="bold" textWrap="wrap">
            About this event
          </SizableText>
          <SizableText size="$4" color="$color8">
            {event.description}
          </SizableText>
          {event.attendees?.docs && event.attendees.docs?.length > 0 && (
            <>
              <SizableText size="$7" fontWeight="bold" textWrap="wrap">
                Attendees
              </SizableText>
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
              pathname: `/event/[id]/join`,
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
