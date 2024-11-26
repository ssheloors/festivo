import { payloadApiUrl, PayloadConfig } from "@/utils/payload-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { useStorage } from "./use-storage";

const authenticationResponseSchema = z.object({
  message: z.string(),
  user: z.custom<PayloadConfig["collections"]["users"]>(),
  token: z.string(),
  exp: z.number(),
});

export function useLogin() {
  const storage = useStorage();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: async (data: { email: string; password: string }) => {
      const req = await fetch(`${payloadApiUrl}/users/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const responseData = await req.json();
      const { token } = authenticationResponseSchema.parse(responseData);

      await storage.setString("payload-token", token);

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.invalidateQueries({ queryKey: ["user-token"] });
    },
  });
}
