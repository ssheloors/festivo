import { payloadClient } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { Text, View } from "react-native";

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
      {isPending && <Text>Loading..</Text>}
      {data && data.docs.map((event) => <Text key={event.id}>{event.title}</Text>)}
    </View>
  );
}
