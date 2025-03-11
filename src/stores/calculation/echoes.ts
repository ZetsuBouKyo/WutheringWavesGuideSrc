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
      getEchoPolicyItems() {
        return this.data.getEchoPolicyItems();
      },
      updateSummaryByEchoes() {
        this.data.updateSummaryByEchoes();
      },
      updateEchoByCost(i: number, item: string) {
        this.data.updateEchoByCost(i, item);
      },
      updateEchoByEchoItem(i: number, item: { title: string; value: any }) {
        this.data.updateEchoByEchoItem(i, item);
      },
      updateEchoMainAffix(i: number, item: string) {
        this.data.updateEchoMainAffix(i, item);
      },
    },
  });
  return new store();
};
