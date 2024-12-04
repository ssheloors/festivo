import { usePayload } from "@/hooks/use-payload";
import { useQuery } from "@tanstack/react-query";
import { View, Text } from "react-native";
import { Button, SizableText } from "tamagui";
import { Link } from "expo-router";

export default function Events() {
  const payload = usePayload();
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => payload.collections.event.find(),
  });

  return (
    <View>
      <SizableText size="$10">Your events</SizableText>
      {isPending && <Text>Loading..</Text>}
      {data &&
        data.docs.map((event) => (
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
      <Link href="./eventCreation" asChild>
        <Button>Add event</Button>
      </Link>
    </View>
  );
}
