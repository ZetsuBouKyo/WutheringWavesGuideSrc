import { defineStore } from "pinia";

import { RowBuffs } from "@/ww/row/buffs";

export const useRowBuffsStore = (id: string) => {
  const storeId: string = `row-buffs-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowBuffs(),
    }),
    actions: {
      updateSummary() {
        this.data.updateSummary();
      },
    },
  });
  return new store();
};
