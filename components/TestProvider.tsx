import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "@/tamagui.config";

export function TestProvider({ children }: { children: JSX.Element }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
}
