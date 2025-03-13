import { defineStore } from "pinia";

import { RowMonster } from "@/ww/row/monster";

export const useRowMonsterStore = (id: string) => {
  const storeId: string = `row-monster-${id}`;
  const store: any = defineStore(storeId, {
    state: (): { data: RowMonster } => ({
      data: new RowMonster(),
    }),
    actions: {
      getJson() {
        return this.data.getJson();
      },
      loadJson(data: any) {
        this.data = new RowMonster(data);
      },
      updateByMonsterItem(item: any) {
        this.data.updateByMonsterItem(item);
      },
    },
  });
  return new store();
};
