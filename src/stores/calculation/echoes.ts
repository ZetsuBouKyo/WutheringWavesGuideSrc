import { defineStore } from "pinia";

import { RowEchoes } from "@/ww/row/echoes";

export const useRowEchoesStore = (id: string) => {
  const storeId: string = `row-echoes-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowEchoes(),
    }),
    actions: {
      updateByStores(stores: Array<any>) {
        this.data.updateByStores(stores);
      },
    },
  });
  return new store();
};
