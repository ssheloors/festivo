import { payloadApiUrl, PayloadConfig } from "@/utils/payload-client";
import { useQuery } from "@tanstack/react-query";
import { useStorage } from "./use-storage";
import { z } from "zod";

const meResponseSchema = z.object({
  message: z.string(),
  user: z.custom<PayloadConfig["collections"]["users"]>(),
  token: z.string(),
  exp: z.number(),
});

export function useUser() {
  const storage = useStorage();

  const query = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const token = await storage.getString("payload-token");

        if (!token) return null;

        const req = await fetch(`${payloadApiUrl}/users/me`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${token}`,
          },
        });
        const responseData = await req.json();
        const { user } = meResponseSchema.parse(responseData);

        return user;
      } catch {
        return null;
      }
    },
  });

  return query;
}
