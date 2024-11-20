import { createClient } from "payload-rest-client";
import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload

type Locales = "en";

export type PayloadConfig = Config;

export const payloadApiUrl = "http://localhost:3000/api";

export const payloadClient = createClient<Config, Locales>({
  apiUrl: payloadApiUrl,
  cache: "no-store",
});

