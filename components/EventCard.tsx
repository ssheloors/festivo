import { Link } from "expo-router";
import { ListItem } from "tamagui";

import { IconSymbol } from "./ui/IconSymbol";

import { PayloadConfig } from "@/utils/payload-client";

export function EventCard({
  event,
}: {
  event: PayloadConfig["collections"]["event"];
}) {
  return (
    <Link href={{ pathname: "/event/[id]", params: { id: event.id } }} asChild>
      <ListItem
        hoverTheme
        pressTheme
        title={event.title}
        subTitle={
          typeof event.organizer === "string" ? null : event.organizer.name
        }
        iconAfter={<IconSymbol name="chevron.right" color="$color12" />}
      />
    </Link>
  );
}
