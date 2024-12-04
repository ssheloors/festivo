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
//   - Event organizer
//   - Event description
//   - Event attendees
//   - Event edit button (if the current user is the organizer, skip if not)
// 7. Tap on the "Edit" button to edit the event details (will be implemented in a future step)

import { useNavigation } from "@react-navigation/native";
import { Button, ScrollView, SizableText, Text, XStack, YStack } from "tamagui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useEventById } from "@/hooks/use-event";
import { useUser } from "@/hooks/use-user";
import { useLocalSearchParams } from "expo-router";

export default function EventPage() {
  const { id } = useLocalSearchParams();
  const { data: event } = useEventById(Number(id));
  const { data: user } = useUser();
  const navigation = useNavigation();
  console.log(event);

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
  }).format();

  return (
    <ScrollView>
      <YStack padding="$4" gap="$3">
        <SizableText size="$10">{event.docs[0].title}</SizableText>
        <SizableText size="$4">{event.docs[0].eventCode}</SizableText>
        <SizableText size="$4">
          <XStack gap="$2">
            <IconSymbol name="calendar" size={24} color="#000" />
            <Text>{formattedDate}</Text>
          </XStack>
        </SizableText>
        <SizableText size="$4">
          <XStack gap="$2">
            <IconSymbol name="mappin.and.ellipse" size={24} color="#000" />
            <Text>{event.docs[0].address}</Text>
          </XStack>
        </SizableText>
        {typeof event.docs[0].organizer !== "number" && (
          <>
            <SizableText size="$8">Organizer:</SizableText>
            <SizableText>
              <XStack gap="$2">
                <IconSymbol name="person.fill" size={24} color="#000" />
                <Text>{event.docs[0].organizer.name}</Text>
              </XStack>
            </SizableText>
          </>
        )}
        <SizableText size="$8">Details:</SizableText>
        <SizableText size="$4">{event.docs[0].description}</SizableText>
        {event.docs[0].attendees && event.docs[0].attendees.length > 0 && (
          <>
            <SizableText size="$8">Attendees:</SizableText>
            {event.docs[0].attendees.map(
              (attendee) =>
                typeof attendee !== "number" && (
                  <SizableText key={attendee.id}>{attendee.name}</SizableText>
                )
            )}
          </>
        )}
        {typeof event.docs[0].organizer !== "number" &&
          user?.id === event.docs[0].organizer.id && (
            <Button
              iconAfter={
                <IconSymbol name="square.and.pencil" size={24} color="white" />
              }
              // onPress={() => navigation.navigate("eventEdit", { eventId: event.docs[0].id })}
              backgroundColor="#282828"
              color="white"
            >
              Edit Event
            </Button>
          )}
      </YStack>
    </ScrollView>
  );
}
