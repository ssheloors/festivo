import { useMutation } from "@tanstack/react-query";

import { usePayload } from "./use-payload";

import { User } from "@/festivo-backend/src/payload-types";

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
          // HACK: The type here in payload rest client isn't
          // correct and requires more properties then necessary.
        } as User,
      });
    },
  });
}
