import { useStorage } from "@vueuse/core";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  return useStorage(key, defaultValue, localStorage, {
    serializer: {
      read: (value: string) => JSON.parse(value),
      write: (value: T) => JSON.stringify(value),
    },
  });
}
