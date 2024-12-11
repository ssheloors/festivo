import { useQuery } from "@tanstack/react-query";

import { usePayload } from "./use-payload";

export function useEventById(eventId: number) {
  const payload = usePayload();

  return useQuery({
    queryKey: ["events", eventId],
    queryFn: async () => {
      const { docs } = await payload.collections.event.find({
        where: { id: { equals: eventId } },
        depth: 10,
      });

      return docs[0];
    },
  });
}
