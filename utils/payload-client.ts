import { createClient } from "payload-rest-client";
import { FetchOptions, RPC } from "payload-rest-client/dist/types";

import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload

export type PayloadConfig = Config;
export type PayloadLocales = "en";

export type PayloadClient = RPC<PayloadConfig, PayloadLocales>;

type Verbs =
  | "find"
  | "create"
  | "update"
  | "delete"
  | "findById"
  | "updateById"
  | "deleteById";

export const payloadApiUrl =
  process.env.PAYLOAD_API_URL ?? "http://localhost:3000/api";

export function createPayloadClient(options: Partial<FetchOptions> = {}) {
  const payloadClient = createClient<PayloadConfig, PayloadLocales>({
    apiUrl: payloadApiUrl,
    cache: "no-store",
    ...options,
  });

  return payloadClient;
}

export function createPayloadTestClient() {
  const verbsCache = new Map<string | symbol, Record<Verbs, jest.Mock>>();

  return {
    collections: new Proxy(
      {},
      {
        get: (_, p) => {
          const cached = verbsCache.get(p);
          if (cached) {
            return cached;
          } else {
            const verbs = {
              find: jest.fn(),
              create: jest.fn(),
              delete: jest.fn(),
              update: jest.fn(),
              findById: jest.fn(),
              updateById: jest.fn(),
              deleteById: jest.fn(),
            };
            verbsCache.set(p, verbs);
            return verbs;
          }
        },
      },
    ),
    globals: new Proxy({}, {}),
  } as unknown as {
    collections: Record<
      Exclude<keyof Config["collections"], `payload-${string}`>,
      Record<Verbs, jest.Mock>
    >;
  };
}
