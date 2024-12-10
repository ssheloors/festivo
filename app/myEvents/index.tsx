import { Link } from "expo-router";
import { SizableText, ScrollView } from "tamagui";

import { useEventsByAttendeeEmail } from "@/hooks/use-attendee";
import { useUser } from "@/hooks/use-user";

export default function MyEvents() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: events, isLoading: isEventsLoading } = useEventsByAttendeeEmail(
    user?.email || "",
  );

  if (isUserLoading || isEventsLoading) {
    return <SizableText>Loading...</SizableText>;
  }

  return (
    <ScrollView>
      <SizableText size="$10">My events</SizableText>
      {events?.docs.length === 0 && (
        <SizableText size="$6">No events found.</SizableText>
      )}
      {events?.docs.map((event) => (
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
