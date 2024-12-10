import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { ReactElement, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import tamaguiConfig from "@/tamagui.config";

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.mock("./hooks/use-storage.ts");
jest.mock("./hooks/use-user.ts");
jest.mock("./utils/payload-client.ts");

const queryClient = new QueryClient();

export function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
    </QueryClientProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/* eslint-disable import/export */
export * from "@testing-library/react";
export { customRender as render };
/* eslint-enable */
