import { useMutation } from "@tanstack/react-query";
import { usePayload } from "./use-payload";

export function useCreateUser() {
  const payload = usePayload();

  return useMutation({
    mutationFn: (formData: {
      email: string;
      name: string;
      password: string;
    }) => {
      return payload.collections.users.create({
        doc: {
          email: formData.email,
          name: formData.name,
          password: formData.password,
        } as any,
      });
    },
  });
}
