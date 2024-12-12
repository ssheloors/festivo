import { Separator, SizableText, YGroup, YStack } from "tamagui";

import { CustomContainer } from "@/components/CustomContainer";
import { EventCard } from "@/components/EventCard";
import { useAllAttendance } from "@/hooks/use-attendance";
import { useEventsFromAttendee } from "@/hooks/use-events-from-attendee";

export default function MyEvents() {
  const { data: attendees } = useAllAttendance();
  const { data: events } = useEventsFromAttendee(attendees ?? []);

  return (
    <CustomContainer scroll>
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
