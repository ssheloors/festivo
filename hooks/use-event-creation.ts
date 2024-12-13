import { useMutation, useQueryClient } from "@tanstack/react-query";

import { usePayload } from "./use-payload";

export function useEventCreation() {
  const payload = usePayload();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (formData: {
      title: string;
      address: string;
      description?: string;
      eventDate: string;
      organizer: string;
    }) => {
      return payload.collections.event.create({
        doc: {
          title: formData.title,
          address: formData.address,
          description: formData.description,
          eventDate: formData.eventDate,
          organizer: formData.organizer,
          eventCode: "", // Is generated server-side
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
}
