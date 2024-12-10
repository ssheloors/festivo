import { Link } from "expo-router";
import { View, Text } from "react-native";
import { SizableText } from "tamagui";

import { useEventsByAttendeeEmail } from "@/hooks/use-attendee";
import { useUser } from "@/hooks/use-user";

export default function MyEvents() {
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: events, isLoading: isEventsLoading } = useEventsByAttendeeEmail(
    user?.email || ""
  );

  if (isUserLoading || isEventsLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View>
      <SizableText size="$10">My events</SizableText>
      {events?.docs.length === 0 && <Text>No events found.</Text>}
      {events?.docs.map((event) => (
        <Link
          key={event.id}
          href={{
            pathname: "/eventPage/[id]",
            params: { id: event.id },
          }}
        >
          <Text>{event.title}</Text>
        </Link>
      ))}
    </View>
  );
}
