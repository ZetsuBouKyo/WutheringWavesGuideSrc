import { defineStore } from "pinia";

import { RowMonster } from "@/ww/row/monster";

export const useRowMonsterStore = (id: string) => {
  const storeId: string = `row-monster-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowMonster(),
    }),
    actions: {
      updateByMonsterItem(item: any) {
        this.data.updateByMonsterItem(item);
      },
    },
  });
  return new store();
};
