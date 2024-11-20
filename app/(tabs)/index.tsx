import { payloadClient } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Button, YStack, Text } from "tamagui";

export default function Index() {
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => payloadClient.collections.event.find(),
  });

  return (
    <YStack gap="$4" padding="$4">
      <Button onPress={() => console.log("Hello")}>Hello</Button>
      {isPending && <Text>Loading..</Text>}
      {data &&
        data.docs.map((event) => <Text key={event.id}>{event.title}</Text>)}
      <Link push href="/login" asChild>
        <Button variant="outlined">To login</Button>
      </Link>
    </YStack>
  );
}
