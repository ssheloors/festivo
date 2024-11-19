import { payloadClient } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";
import { Button } from "tamagui";

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
      <Button onPress={() => console.log("Hello")}>Hello</Button>
      {isPending && <Text>Loading..</Text>}
      {data && data.docs.map((event) => <Text key={event.id}>{event.title}</Text>)}
    </View>
  );
}
