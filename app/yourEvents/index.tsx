import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Button, ScrollView, SizableText } from "tamagui";

import { usePayload } from "@/hooks/use-payload";

export default function Events() {
  const payload = usePayload();
  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => payload.collections.event.find(),
  });

  return (
    <ScrollView>
      <SizableText size="$10">Your events</SizableText>
      {isPending && <SizableText size="$6">Loading..</SizableText>}
      {data &&
        data.docs.map((event) => (
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
      <Link href="./eventCreation" asChild>
        <Button>Add event</Button>
      </Link>
    </ScrollView>
  );
}
