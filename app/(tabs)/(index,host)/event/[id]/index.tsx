import { Link, Stack, useLocalSearchParams, router } from "expo-router";
import React, { ReactNode } from "react";
import { showToastable } from "react-native-toastable";
import { SizableText, Text, View, XStack, YStack } from "tamagui";

import { ChipData, Chips } from "@/components/Chips";
import { CustomContainer } from "@/components/CustomContainer";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useAttendance, useCancelAttendance } from "@/hooks/use-attendance";
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
  const params = useLocalSearchParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data: event } = useEventById(id);
  const { data: user } = useUser();

  const attendance = useAttendance(id);
  const cancelAttendance = useCancelAttendance(id);
  const userOwnsEvent =
    user != null &&
    typeof event?.organizer !== "string" &&
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
  if (hasJoined) {
    chips.push({
      text: "Registered",
      theme: "accent",
      containerProps: { testID: "joined-message" },
    });
  }

  const submitCancelAttendance = async () => {
    await cancelAttendance.mutateAsync();
    showToastable({
      message: "Attendance cancelled",
      duration: 2000,
      status: "success",
    });
  };

  const cta = userOwnsEvent ? (
    <FloatingActionButton
      iconAfter={<IconSymbol name="square.and.pencil" color="$color12" />}
      onPress={() => {
        router.push({
          pathname: `/event/[id]/edit`,
          params: { id: event.id },
        });
      }}
      testID="edit-button"
    >
      Edit Event
    </FloatingActionButton>
  ) : !attendance.isPending ? (
    hasJoined ? (
      <FloatingActionButton
        iconAfter={<IconSymbol name="xmark" color="$color12" />}
        onPress={submitCancelAttendance}
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
          iconAfter={<IconSymbol name="arrow.right" color="white" />}
          color="$color12"
        >
          Join event
        </FloatingActionButton>
      </Link>
    )
  ) : null;

  return (
    <CustomContainer scroll cta={cta}>
      <Stack.Screen
        options={{
          title: event.title,
          headerLargeTitle: true,
        }}
      />
      <YStack padding="$4" paddingTop="$0" gap="$3">
        <Chips chips={chips} />

        <DataContainer>
          <DataField
            icon={<IconSymbol name="calendar" size={24} color="$color8" />}
          >
            {formattedDate}
          </DataField>
          <DataField
            icon={
              <IconSymbol name="mappin.and.ellipse" size={24} color="$color8" />
            }
          >
            {event.address}
          </DataField>

          {typeof event.organizer !== "string" && (
            <DataField
              icon={<IconSymbol name="person.fill" size={24} color="$color8" />}
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
                typeof attendee !== "string" && (
                  <SizableText key={attendee.id}>{attendee.name}</SizableText>
                ),
            )}
          </>
        )}
      </YStack>
    </CustomContainer>
  );
}
