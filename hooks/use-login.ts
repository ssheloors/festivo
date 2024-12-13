import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

import { useStorage } from "./use-storage";

import { payloadApiUrl, PayloadConfig } from "@/utils/payload-client";

const authenticationResponseSchema = z.object({
  message: z.string(),
  user: z.custom<PayloadConfig["collections"]["users"]>(),
  token: z.string(),
  exp: z.number(),
});

const errorResponseSchema = z.object({
  errors: z.array(z.object({ message: z.string() })),
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
      let payloadToken;
      try {
        const { token } = authenticationResponseSchema.parse(responseData);
        payloadToken = token;
      } catch {
        const { errors } = errorResponseSchema.parse(responseData);
        throw new Error(errors[0].message);
      }

      await storage.setString("payload-token", payloadToken);

      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.invalidateQueries({ queryKey: ["user-token"] });
    },
  });
}

export function useSignOut() {
  const storage = useStorage();

  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["user"],
    mutationFn: async () => {
      await storage.removeItem("payload-token");
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.invalidateQueries({ queryKey: ["user-token"] });
    },
  });
}
