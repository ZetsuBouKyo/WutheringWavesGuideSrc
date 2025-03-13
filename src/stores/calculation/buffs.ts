import { defineStore } from "pinia";

import { RowBuffs } from "@/ww/row/buffs";

export const useRowBuffsStore = (id: string) => {
  const storeId: string = `row-buffs-${id}`;
  const store: any = defineStore(storeId, {
    state: (): { data: RowBuffs } => ({
      data: new RowBuffs(),
    }),
    actions: {
      getJson() {
        return this.data.getJson();
      },
      loadJson(data: any) {
        this.data = new RowBuffs(data);
      },
    },
  });
  return new store();
};
