import { payloadClient } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { Button } from "tamagui";
import { Link } from "expo-router";

export default function Index() {
  const { data, isPending } = useQuery({
    queryKey: [
      "events",
    ],
    queryFn: () => payloadClient.collections.event.find(),
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Link href="/yourEvents" asChild>
        <Button>Hello</Button>
      </Link>
      {isPending && <Text>Loading..</Text>}
      {data && data.docs.map((event) => <Text key={event.id}>{event.title}</Text>)}
    </View>
  );
}
