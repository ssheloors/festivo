import { config } from "@tamagui/config/v3";
import { createTamagui } from "tamagui";

import * as themes from "./theme-output";

const tamaguiConfig = createTamagui({ ...config, themes });

type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface TamaguiCustomConfig extends Conf {}
}
// eslint-disable-next-line import/no-default-export
export default tamaguiConfig;
