import { payloadClient } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { View, Text } from "react-native";
import { Button } from "tamagui";
import { Link } from "expo-router";

export default function Events() {
  const { data, isPending } = useQuery({
    queryKey: [
      "events",
    ],
    queryFn: () => payloadClient.collections.event.find(),
  });

  const title = {
    color: "red",
    fontSize: "40px"
  }

  return (
    <View>
        <Text>Your events</Text>
        {isPending && <Text>Loading..</Text>}
        {data && data.docs.map((event) => <Button key={event.id}>{event.title}</Button>)}
        <Link href="./eventCreation" asChild><Button>Add event</Button></Link>
    </View>
  );
} 