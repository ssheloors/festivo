import { useContext } from "react";

import { PayloadClientContext } from "@/components/PayloadClientProvider";

export function usePayload() {
  const client = useContext(PayloadClientContext);

  if (client == null) {
    throw new Error("usePayload must be used within a PayloadClientProvider");
  }

  return client;
}
