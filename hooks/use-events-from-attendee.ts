import { useQuery } from "@tanstack/react-query";

import { usePayload } from "./use-payload";

import { PayloadConfig } from "@/utils/payload-client";

export function useEventsFromAttendee(
  attendees: PayloadConfig["collections"]["attendee"][],
) {
  const payload = usePayload();
  const attendeeIds = attendees.map((attendee) => attendee.id);

  return useQuery({
    queryKey: ["myEvents", attendeeIds.join(",")],
    queryFn: async () => {
      const { docs: events } = await payload.collections.event.find();
      return events.filter((event) =>
        event.attendees?.docs?.find((attendee) =>
          attendeeIds.includes(
            typeof attendee === "number" ? attendee : attendee.id,
          ),
        ),
      );
    },
    enabled: attendees.length > 0,
  });
}
