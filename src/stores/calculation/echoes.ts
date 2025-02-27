import { defineStore } from "pinia";

import { RowEchoes } from "@/ww/row/echoes";

export const useRowEchoesStore = (id: string) => {
  const storeId: string = `row-echoes-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowEchoes(),
    }),
    actions: {
      resetPolicy() {
        this.data.resetPolicy();
      },
      getEcho(i: number) {
        return this.data.getEcho(i);
      },
      getSummary() {
        return this.data.summary;
      },
      updateSummaryByEchoes() {
        this.data.updateSummaryByEchoes();
      },
    },
  });
  return new store();
};
