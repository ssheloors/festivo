import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "@/tamagui.config";

export function AllTheProviders({ children }: { children: ReactNode }) {
  return <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>;
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/* eslint-disable import/export */
export * from "@testing-library/react";
export { customRender as render };
/* eslint-enable */
