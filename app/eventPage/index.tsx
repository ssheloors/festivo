// 1. Login to the app
// 2. Tap on the "Host" tab (not done yet, will be implemented in a future step)
// 3. Tap on the "Create a new event" button (not done yet, will be implemented in a future step)
// 4. Fill out the form and tap on the "Create Event" button
// 5. The event will generate a random eventCode
// 6. Tap on the event in "Your Events" to view the event details:
//   - Event name
//   - Event code
//   - Event date and time
//   - Event location
//   - Event organizer (the current user)
//   - Event description
//   - Event attendees
//   - Event edit button (if the current user is the organizer, skip if not)
// 7. Tap on the "Edit" button to edit the event details (will be implemented in a future step)

import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { Button, ScrollView, SizableText } from "tamagui";
import { View } from "react-native";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEventById } from "@/hooks/use-event";

export default function EventPage({ eventId }: { eventId: string }) {
  eventId = "2";
  const { data: event } = useEventById(eventId);
  const navigation = useNavigation();
  console.log(event);

  if (!event) {
    return null;
  }

  const eventDate = new Date(event.eventDate);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  }).format(eventDate);

  return (
    <ScrollView>
      <View style={{ padding: 16 }}>
        <SizableText size="$10">{event.title}</SizableText>
        <SizableText size="$4">{event.eventCode}</SizableText>
        <SizableText size="$4">
          <IconSymbol name="calendar" size={24} color="#000" />
          {formattedDate}
        </SizableText>
        <SizableText size="$4">
          <IconSymbol name="mappin.and.ellipse" size={24} color="#000" />
          {event.address}
        </SizableText>
        <SizableText size="$4">
          Organizer:
          <IconSymbol name="person.fill" size={24} color="#000" />
          {event.organizer.name}
        </SizableText>
        <SizableText size="$4">{event.description}</SizableText>
      </View>
      {/* <Button
        iconAfter={
          <IconSymbol name="square.and.pencil" size={24} color="black" />
        }
        onPress={() => navigation.navigate("EventEdit", { eventId: event.id })}
        style={{ margin: 16 }}
      >
        <SizableText size="$4">Edit Event</SizableText>
      </Button> */}
    </ScrollView>
  );
}
