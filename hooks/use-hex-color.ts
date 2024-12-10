import { ColorTokens, useTheme } from "tamagui";

import { parseHsla } from "@/utils/colors";

export function useHexColor(color: ColorTokens): string {
  const theme = useTheme();

  if (typeof color === "symbol") {
    return color;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const resolvedColor = theme[color as any]?.get("web") ?? color;

  const hexColor = parseHsla(resolvedColor);

  return hexColor;
}
