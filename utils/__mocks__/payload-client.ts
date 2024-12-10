import type { PayloadConfig, PayloadMockId } from "../payload-client";

function createMock(name: PayloadMockId) {
  if (createPayloadClient.__mocks.has(name)) {
    console.log(`found mock for ${name}`);
    return createPayloadClient.__mocks.get(name);
  }

  const mock = jest.fn().mockImplementation(async () => ({
    docs: [],
  }));
  createPayloadClient.__mocks.set(name, mock);
  return mock;
}

const mocks = new Map();

export const createPayloadClient = Object.assign(
  jest.fn().mockImplementation(() => {
    return {
      collections: new Proxy(
        {},
        {
          get: (
            _,
            p: Exclude<keyof PayloadConfig["collections"], `payload-${string}`>,
          ) => ({
            find: createMock(`collection-${p}-find`),
            create: createMock(`collection-${p}-create`),
            delete: createMock(`collection-${p}-delete`),
            update: createMock(`collection-${p}-update`),
            findById: createMock(`collection-${p}-findById`),
            updateById: createMock(`collection-${p}-updateById`),
            deleteById: createMock(`collection-${p}-deleteById`),
          }),
        },
      ),
      globals: new Proxy({}, {}),
    };
  }),
  {
    __mocks: Object.assign(mocks, {
      assign(id: PayloadMockId, mock: jest.Mock) {
        mocks.set(id, mock);
        return mock;
      },
    }),
  },
);
