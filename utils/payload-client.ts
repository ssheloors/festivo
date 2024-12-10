import { createClient } from "payload-rest-client";
import { FetchOptions } from "payload-rest-client/dist/types";

import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload

export type PayloadLocales = "en";

export type PayloadConfig = Config;

type Verbs =
  | "find"
  | "create"
  | "update"
  | "delete"
  | "findById"
  | "updateById"
  | "deleteById";
export type PayloadMockId =
  `collection-${Exclude<keyof Config["collections"], `payload-${string}`>}-${Verbs}`;

export const payloadApiUrl =
  process.env.PAYLOAD_API_URL ?? "http://localhost:3000/api";

export const createPayloadClient = Object.assign(
  function createPayloadClient(options: Partial<FetchOptions> = {}) {
    const payloadClient = createClient<PayloadConfig, PayloadLocales>({
      apiUrl: payloadApiUrl,
      cache: "no-store",
      ...options,
    });

    return payloadClient;
  },
  {
    __mocks: Object.assign(new Map<PayloadMockId, jest.Mock>(), {
      assign: undefined as unknown as <M extends jest.Mock>(
        id: PayloadMockId,
        mock: M,
      ) => M,
    }),
  },
);
