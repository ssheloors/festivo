import { Stack } from "expo-router";
import { Button as RNButton } from "react-native";
import { Separator, SizableText, YGroup, YStack } from "tamagui";

import { CustomContainer } from "@/components/CustomContainer";
import { EventCard } from "@/components/EventCard";
import { useAllAttendance } from "@/hooks/use-attendance";
import { useEventsFromAttendee } from "@/hooks/use-events-from-attendee";
import { useStorage } from "@/hooks/use-storage";

export default function MyEvents() {
  const { data: attendees } = useAllAttendance();
  const { data: events } = useEventsFromAttendee(attendees ?? []);

  const storage = useStorage();
  const onRemoveAll = async () => {
    for (const attendance of attendees ?? []) {
      await storage.removeItem(`event-attendance-${attendance.id}`);
    }
  };

  return (
    <CustomContainer scroll>
      <Stack.Screen
        options={{
          headerRight:
            process.env.NODE_ENV === "development"
              ? () => <RNButton title="Remove all" onPress={onRemoveAll} />
              : undefined,
        }}
      />
      <YStack padding="$4" paddingTop="$0">
        {events != null ? (
          <YGroup
            bordered
            size="$5"
            separator={<Separator />}
            overflow="hidden"
          >
            {events?.map((event) => (
              <YGroup.Item key={event.id}>
                <EventCard event={event} />
              </YGroup.Item>
            ))}
          </YGroup>
        ) : (
          <SizableText size="$6">No events found.</SizableText>
        )}
      </YStack>
    </CustomContainer>
  );
}
