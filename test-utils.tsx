import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react-native";
import * as expoRouter from "expo-router";
import { ReactElement, ReactNode } from "react";
import { TamaguiProvider } from "tamagui";

import { PayloadClientContext } from "./components/PayloadClientProvider";
import * as useStorageModule from "./hooks/use-storage";
import { createPayloadTestClient } from "./utils/payload-client";

import tamaguiConfig from "@/tamagui.config";

global.console = {
  ...console,
  // uncomment to ignore a specific log level
  // log: jest.fn(),
  // debug: jest.fn(),
  // info: jest.fn(),
  // warn: jest.fn(),
  // error: jest.fn(),
};
global.alert = jest.fn();

let mockedRouterParams: expoRouter.UnknownOutputParams = {};

jest.mock("expo-router");
const mockedRouter = jest.mocked(expoRouter);
mockedRouter.useLocalSearchParams.mockImplementation(() => mockedRouterParams);
mockedRouter.Link = jest.requireActual("expo-router").Link;

jest.mock("@react-navigation/bottom-tabs", () => ({
  ...jest.requireActual("@react-navigation/bottom-tabs"),
  useBottomTabBarHeight: () => 0,
}));

jest.mock("./hooks/use-storage.ts");
jest.mock("./hooks/use-user.ts");

const queryClient = new QueryClient();
export let payloadTestClient = createPayloadTestClient();
beforeEach(() => {
  payloadTestClient = createPayloadTestClient();
});

export function AllTheProviders({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <PayloadClientContext.Provider value={payloadTestClient}>
        <TamaguiProvider config={tamaguiConfig}>{children}</TamaguiProvider>
      </PayloadClientContext.Provider>
    </QueryClientProvider>
  );
}

export function setLocalSearchParams(params: expoRouter.UnknownOutputParams) {
  mockedRouterParams = params;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const memoryStorage = (useStorageModule as any).memoryStorage as Map<
  string,
  string
>;
beforeEach(() => {
  memoryStorage.clear();
});

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllTheProviders, ...options });

/* eslint-disable import/export */
export * from "@testing-library/react-native";
export { customRender as render };
/* eslint-enable */
