import { useQuery } from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useRef } from "react";

import { useStorage } from "@/hooks/use-storage";
import { createPayloadClient, PayloadClient } from "@/utils/payload-client";

export const PayloadClientContext = createContext<PayloadClient | null>(null);

export function PayloadClientProvider({ children }: { children: ReactNode }) {
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

  return (
    <PayloadClientContext.Provider value={payloadRef.current}>
      {children}
    </PayloadClientContext.Provider>
  );
}
