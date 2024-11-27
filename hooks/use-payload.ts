import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import { useStorage } from "./use-storage";

import { createPayloadClient } from "@/utils/payload-client";

export function usePayload() {
  const payloadRef = useRef(createPayloadClient());

  const storage = useStorage();

  const tokenQuery = useQuery({
    queryKey: ["user-token"],
    queryFn: () => storage.getString("payload-token"),
  });

  useEffect(() => {
    const token = tokenQuery.data;

    payloadRef.current = createPayloadClient({
      headers: token
        ? {
            Authorization: `JWT ${token}`,
          }
        : undefined,
    });
  }, [tokenQuery.data]);

  return payloadRef.current;
}
