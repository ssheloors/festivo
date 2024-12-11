import { useQuery } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useEffect } from "react";
import {
  YStack,
  Spinner,
  SizableText,
  YGroup,
  Separator,
  ScrollView,
  View,
} from "tamagui";

import { Button } from "@/components/Button";
import { EventCard } from "@/components/EventCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSignOut } from "@/hooks/use-login";
import { usePayload } from "@/hooks/use-payload";
import { useUser } from "@/hooks/use-user";

export default function HostPage() {
  const payload = usePayload();

  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => payload.collections.event.find(),
  });

  const user = useUser();

  useEffect(() => {
    if (user.isSuccess && user.data == null) {
      router.replace("/login");
    }
  }, [user.data, user.isSuccess]);

  const signOut = useSignOut();

  if (user.data == null) {
    return <Spinner />;
  }

  return (
    <View paddingBottom="$8" flex={1}>
      <ScrollView>
        <YStack gap="$4" padding="$4">
          {user.data && (
            <YStack alignItems="flex-start" gap="$2">
              <SizableText size="$9" fontWeight="bold" textWrap="wrap">
                Hello {user.data.name}
              </SizableText>
              <Button size="$2" onPress={() => signOut.mutate()}>
                Sign out
              </Button>
            </YStack>
          )}
          <YGroup
            bordered
            size="$5"
            separator={<Separator />}
            overflow="hidden"
          >
            {data &&
              data.docs.map((event) => (
                <YGroup.Item>
                  <EventCard event={event} />
                </YGroup.Item>
              ))}
          </YGroup>

          {/* <Link push href="/login" asChild> */}
          {/*   <Button variant="outlined">To login</Button> */}
          {/* </Link> */}
          {/* <Link push href="/created-events" asChild> */}
          {/*   <Button variant="outlined">To your events</Button> */}
          {/* </Link> */}
          {/* <Link push href="/joined-events" asChild> */}
          {/*   <Button variant="outlined">To my events</Button> */}
          {/* </Link> */}
        </YStack>
      </ScrollView>

      <Link push href={{ pathname: "/event/create" }} asChild>
        <FloatingActionButton
          icon={<IconSymbol name="plus" color="$color12" />}
        >
          Add event
        </FloatingActionButton>
      </Link>
    </View>
  );
}
