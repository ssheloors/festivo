import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

import { useAddAttendance } from "./use-attendance";
import { usePayload } from "./use-payload";

export function useAddAttendeeToEvent(code: string) {
  const payload = usePayload();
  const queryClient = useQueryClient();

  const addAttenance = useAddAttendance();

  // Create a new attendee in the attendees collection
  const addAttendeeMutation = useMutation({
    mutationFn: async (data: {
      eventId: string;
      name: string;
      email: string;
      comments: string;
    }) => {
      const {
        docs: [event],
      } = await payload.collections.event.find({
        // find the event first to be able to reference its id when creating the attendee
        where: {
          eventCode: {
            equals: code,
          },
        },
      });
      const attendee = await payload.collections.attendee.create({
        doc: {
          name: data.name,
          email: data.email,
          comments: data.comments,
          event: event.id,
        },
      });
      await addAttenance.mutateAsync({
        eventId: event.id,
        attendee: attendee.doc,
      });
      return attendee;
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
