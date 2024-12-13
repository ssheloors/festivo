import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useStorage } from "./use-storage";

import { PayloadConfig } from "@/utils/payload-client";

function makeKey(eventId: number | string) {
  return `event-attendance-${eventId}`;
}

export function useAttendance(eventId: string) {
  const storage = useStorage();

  const key = makeKey(eventId);

  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const obj = await storage.getObject(key);
      return obj as PayloadConfig["collections"]["attendee"] | null;
    },
  });
}

export function useAddAttendance() {
  const storage = useStorage();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      eventId,
      attendee,
    }: {
      eventId: string;
      attendee: PayloadConfig["collections"]["attendee"];
    }) => {
      const key = makeKey(eventId);
      await storage.setObject(key, attendee);
      await queryClient.invalidateQueries({ queryKey: [key] });
    },
  });
}

export function useAllAttendance() {
  const storage = useStorage();
  const baseKey = makeKey("");

  return useQuery({
    queryKey: ["attendance"],
    queryFn: async () => {
      const keys = (await storage.getKeys()).filter((key) =>
        key.startsWith(baseKey)
      );
      return Promise.all(
        keys.map(async (key) => {
          const obj = await storage.getObject(key);
          return obj as PayloadConfig["collections"]["attendee"];
        })
      );
    },
  });
}
