import { Link, router, Stack, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import {
  YStack,
  Spinner,
  SizableText,
  YGroup,
  Separator,
  useTheme,
} from "tamagui";

import { Button } from "@/components/Button";
import { CustomContainer } from "@/components/CustomContainer";
import { EventCard } from "@/components/EventCard";
import { FloatingActionButton } from "@/components/FloatingActionButton";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useSignOut } from "@/hooks/use-login";
import { useUser } from "@/hooks/use-user";
import { useUserEvents } from "@/hooks/use-user-events";

export default function HostPage() {
  const theme = useTheme();
  const { data } = useUserEvents();
  const user = useUser();

  useFocusEffect(
    useCallback(() => {
      if (!user.isFetching && user.data == null) {
        router.replace("/login");
      }
    }, [user.data, user.isFetching]),
  );

  const signOut = useSignOut();

  if (user.data == null) {
    return <Spinner />;
  }

  return (
    <CustomContainer
      scroll
      cta={
        <Link push href={{ pathname: "/event/create" }} asChild>
          <FloatingActionButton
            icon={<IconSymbol name="plus" color="$color12" />}
          >
            Add event
          </FloatingActionButton>
        </Link>
      }
    >
      <Stack.Screen
        options={{
          title: "Host Events",
          headerLargeTitle: true,
          headerShown: true,
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.color1.val,
          },
        }}
      />
      <YStack gap="$4" padding="$4" paddingTop="$0">
        {user.data && (
          <YStack alignItems="flex-start" gap="$2">
            <SizableText size="$5" fontWeight="bold" textWrap="wrap">
              Signed in as {user.data.name}
            </SizableText>
            <Button size="$2" onPress={() => signOut.mutate()}>
              Sign out
            </Button>
          </YStack>
        )}
        {(data?.length ?? 0) > 0 ? (
          <YGroup
            bordered
            size="$5"
            separator={<Separator />}
            overflow="hidden"
          >
            {data?.map((event) => (
              <YGroup.Item key={event.id}>
                <EventCard event={event} />
              </YGroup.Item>
            ))}
          </YGroup>
        ) : (
          <SizableText>You have not created any events</SizableText>
        )}
      </YStack>
    </CustomContainer>
  );
}
