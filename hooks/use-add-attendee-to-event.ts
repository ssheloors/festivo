import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { showToastable } from "react-native-toastable";

import { useAddAttendance } from "./use-attendance";
import { usePayload } from "./use-payload";

export function useAddAttendeeToEvent(eventId: string) {
  const payload = usePayload();
  const queryClient = useQueryClient();

  const addAttenance = useAddAttendance();

  // Create a new attendee in the attendees collection
  const addAttendeeMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      comments: string;
    }) => {
      const attendee = await payload.collections.attendee.create({
        doc: {
          name: data.name,
          email: data.email,
          comments: data.comments,
          event: eventId,
        },
      });
      await addAttenance.mutateAsync({
        eventId: eventId,
        attendee: attendee.doc,
      });
      return attendee;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["attendees"] });
      queryClient.invalidateQueries({ queryKey: ["events", eventId] });
      queryClient.invalidateQueries({ queryKey: ["attendance"] });
    },
    onError: () => {
      showToastable({
        message: "Error adding you to the event",
        duration: 2000,
        status: "warning",
      });
    },
  });

  return addAttendeeMutation;
}
