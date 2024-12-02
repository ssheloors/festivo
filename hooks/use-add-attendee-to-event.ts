import { useMutation } from "@tanstack/react-query";
import { usePayload } from "./use-payload";
import { useQueryClient } from "@tanstack/react-query";

export function useAddAttendeeToEvent() {
  const payload = usePayload();
  const queryClient = useQueryClient();

  // Create a new attendee in the attendees collection
  const addAttendeeMutation = useMutation({
    mutationFn: async (data: {
      eventId: string;
      name: string;
      email: string;
    }) => {
      const attendee = await payload.collections.attendee.create({
        doc: {
          name: data.name,
          email: data.email,
        },
      });
      await payload.collections.event.update({
        where: {
          eventCode: { equals: data.eventId },
        },
        doc: {
          attendees: attendee.doc.id,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendees"] });
    },
    onError: (error) => {
      alert("Error adding you to the event" + error);
    },
  });

  return addAttendeeMutation;
}
