import { defineStore } from "pinia";

import { RowEcho } from "@/ww/row/echo";

export const useRowEchoStore = (id: string) => {
  const storeId: string = `row-echo-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowEcho(),
    }),
    actions: {
      reset() {
        this.data.reset();
      },
      resetMainAffix() {
        this.data.resetMainAffix();
      },
      resetSubAffix() {
        this.data.resetSubAffix();
      },
      updateByEchoItem(item: { title: string; value: any }) {
        this.data.updateByEchoItem(item);
      },
    },
  });
  return new store();
};

export function getEchoStores(prefixId: string): Array<{ id: string; store: any }> {
  const stores: Array<{ id: string; store: any }> = Array.from({ length: 5 }, (_, i) => ({
    id: `${prefixId}${i + 1}`,
    store: useRowEchoStore(`${prefixId}${i + 1}`),
  }));
  return stores;
}
