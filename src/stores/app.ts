// Utilities
import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    //
  }),
});

export const useDynamicAppStore = (id: string) => {
  const store: any = defineStore(id, {
    state: (): any => ({
      //
    }),
    actions: {},
  });
  return new store();
};
