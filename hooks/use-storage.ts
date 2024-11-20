import AsyncStorage from "@react-native-async-storage/async-storage";

export function useStorage() {
  return {
    async getString(key: string) {
      return AsyncStorage.getItem(key);
    },

    async setString(key: string, value: string) {
      return AsyncStorage.setItem(key, value);
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
}
