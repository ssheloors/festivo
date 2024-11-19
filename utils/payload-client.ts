import { createClient } from "payload-rest-client";
import { Config } from "../festivo-backend/src/payload-types"; // auto generated types from payload

type Locales = "en";

export const payloadClient = createClient<Config, Locales>({
    apiUrl: "http://localhost:3000/api",
    cache: "no-store",
});