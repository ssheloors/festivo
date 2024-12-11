import { Link } from "expo-router";
import { SizableText, ScrollView } from "tamagui";

import { useAllAttendance } from "@/hooks/use-attendance";
import { useEventsFromAttendee } from "@/hooks/use-events-from-attendee";

export default function MyEvents() {
  const { data: attendees } = useAllAttendance();
  const { data: events } = useEventsFromAttendee(attendees ?? []);

  return (
    <ScrollView>
      <SizableText size="$10">My events</SizableText>
      {events?.length === 0 && (
        <SizableText size="$6">No events found.</SizableText>
      )}
      {events?.map((event) => (
        <Link
          key={event.id}
          href={{
            pathname: "/eventPage/[id]",
            params: { id: event.id },
          }}
        >
          <SizableText size="$8">{event.title}</SizableText>
        </Link>
      ))}
    </ScrollView>
  );
}
