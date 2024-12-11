export const memoryStorage = new Map<string, string>();

export const useStorage = jest.fn().mockImplementation(() => {
  return {
    async getString(key: string) {
      return memoryStorage.get(key) ?? null;
    },

    async setString(key: string, value: string) {
      memoryStorage.set(key, value);
    },

    async getObject(key: string) {
      const json = await this.getString(key);
      if (!json) return null;
      return JSON.parse(json) as unknown;
    },

    async setObject(key: string, value: unknown) {
      return this.setString(key, JSON.stringify(value));
    },
  };
});
