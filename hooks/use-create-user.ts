import { payloadClient } from "@/utils/payload-client";
import { useMutation } from "@tanstack/react-query";

export function useCreateUser() {
  return useMutation({
    mutationFn: (formData: {
      email: string;
      name: string;
      password: string;
    }) => {
      return payloadClient.collections.users.create({
        doc: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        } as any,
      });
    },
  });
}
