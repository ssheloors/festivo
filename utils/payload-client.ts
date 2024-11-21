import { createClient } from "payload-rest-client";
import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload
import { FetchOptions } from "payload-rest-client/dist/types";

type Locales = "en";

export type PayloadConfig = Config;

export const payloadApiUrl = "http://localhost:3000/api";

export function createPayloadClient(options: Partial<FetchOptions> = {}) {
  const payloadClient = createClient<Config, Locales>({
    apiUrl: payloadApiUrl,
    cache: "no-store",
    ...options,
  });

  return payloadClient;
}
