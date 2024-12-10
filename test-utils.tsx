import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import { ReactElement, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import { PayloadClientContext } from "./components/PayloadClientProvider";
import { createPayloadTestClient } from "./utils/payload-client";

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
global.alert = jest.fn();

jest.mock("./hooks/use-storage.ts");
jest.mock("./hooks/use-user.ts");

const queryClient = new QueryClient();
export const payloadTestClient = createPayloadTestClient();

export function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PayloadClientContext.Provider value={payloadTestClient}>
        <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
      </PayloadClientContext.Provider>
    </QueryClientProvider>
  );
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/* eslint-disable import/export */
export * from "@testing-library/react-native";
export { customRender as render };
/* eslint-enable */
