import { usePayload } from "./use-payload";
import { useQuery } from "@tanstack/react-query";

export function useEventById(eventId: number) {
  const payload = usePayload();

  return useQuery({
    queryKey: ["events", eventId],
    queryFn: () =>
      payload.collections.event.find({ where: { id: { equals: eventId } }, depth: 10 }),
  });
}
