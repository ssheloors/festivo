import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usePayload } from "./use-payload";
import { useStorage } from "./use-storage";

function makeKey(eventId: number | string) {
  return `event-attendance-${eventId}`;
}

export function useCancelAttendance(eventId: string) {
  const storage = useStorage();
  const queryClient = useQueryClient();
  const payload = usePayload();

  return useMutation({
    mutationFn: async () => {
      const key = makeKey(eventId);
      const attendeeName = (await storage.getObject(key)) as { name: string };
      await storage.removeItem(key);

      await payload.collections.attendee.delete({
        query: {
          event: eventId,
        },
        where: {
          name: { equals: attendeeName.name },
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendees"] });
    },
  });
}
