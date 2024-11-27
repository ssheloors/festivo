import { useQuery } from "@tanstack/react-query";
import { payloadApiUrl } from "@/utils/payload-client";

async function fetchEventById(eventId: string) {
  const response = await fetch(`${payloadApiUrl}/event/${eventId}`);
  if (!response.ok) {
    const errorText = await response.text();
    console.error("Error response:", errorText);
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export function useEventById(eventId: string) {
  return useQuery({
    queryKey: ["event", eventId],
    queryFn: () => fetchEventById(eventId),
  });
}
