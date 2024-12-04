import { createClient } from "payload-rest-client";
import { FetchOptions } from "payload-rest-client/dist/types";

import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload

type Locales = "en";

export type PayloadConfig = Config;

export const payloadApiUrl =
  process.env.PAYLOAD_API_URL ?? "http://localhost:3000/api";

export function createPayloadClient(options: Partial<FetchOptions> = {}) {
  const payloadClient = createClient<Config, Locales>({
    apiUrl: payloadApiUrl,
    cache: "no-store",
    ...options,
  });

  return payloadClient;
}
