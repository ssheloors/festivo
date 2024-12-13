import { useQuery } from "@tanstack/react-query";

import { usePayload } from "./use-payload";
import { useUser } from "./use-user";

export function useUserEvents() {
  const payload = usePayload();
  const { data: user } = useUser();

  return useQuery({
    queryKey: ["events", user?.id],
    queryFn: async () => {
      if (!user) {
        return [];
      }
      const response = await payload.collections.event.find({
        where: { organizer: { equals: user.id } },
      });
      return response.docs;
    },
    enabled: !!user,
  });
}
