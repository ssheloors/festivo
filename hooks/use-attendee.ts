import { useQuery } from "@tanstack/react-query";

import { usePayload } from "./use-payload";

export function useEventsByAttendeeEmail(attendeeEmail: string) {
  const payload = usePayload();

  return useQuery({
    queryKey: ["events", attendeeEmail],
    queryFn: async () => {
      const attendees = await payload.collections.attendee.find({
        where: { email: { equals: attendeeEmail } },
      });

      if (!attendees.docs.length) {
        return { docs: [] };
      }

      const events = await payload.collections.event.find();

      const userEvents = events.docs.filter((event) =>
        (event.attendees ?? []).some(() =>
          attendees.docs.some(
            (thisAttendee) => thisAttendee.email === attendeeEmail,
          ),
        ),
      );

      return { docs: userEvents };
    },
    enabled: !!attendeeEmail,
  });
}
