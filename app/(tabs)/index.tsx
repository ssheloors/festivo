import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "expo-router";
import { Button, YStack, Text, Spinner } from "tamagui";

import { usePayload } from "@/hooks/use-payload";
import { useUser } from "@/hooks/use-user";

export default function Index() {
  const payload = usePayload();

  const { data, isPending } = useQuery({
    queryKey: ["events"],
    queryFn: () => payload.collections.event.find(),
  });

  const user = useUser();
  const queryClient = useQueryClient();

  const changeNameMutation = useMutation({
    mutationFn: async () => {
      if (!user.data) {
        return;
      }

      await payload.collections.users.update({
        patch: {
          name: "Lena",
        },
        where: {
          id: {
            equals: user.data.id,
          },
        },
      });

      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
  });

  return (
    <YStack gap="$4" padding="$4">
      {user.data && (
        <Button
          onPress={() => changeNameMutation.mutate()}
          icon={changeNameMutation.isPending ? <Spinner /> : null}
        >
          Hello {user.data.name}
        </Button>
      )}
      {isPending && <Text>Loading..</Text>}
      {data &&
        data.docs.map((event) => <Text key={event.id}>{event.title}</Text>)}
      <Link push href="/login" asChild>
        <Button variant="outlined">To login</Button>
      </Link>
      <Link push href="/yourEvents" asChild>
        <Button variant="outlined">To your events</Button>
      </Link>
      <Link push href="/joinEvent" asChild>
        <Button variant="outlined">Join an event</Button>
      </Link>
      <Link push href="/myEvents" asChild>
        <Button variant="outlined">To my events</Button>
      </Link>
    </YStack>
  );
}
