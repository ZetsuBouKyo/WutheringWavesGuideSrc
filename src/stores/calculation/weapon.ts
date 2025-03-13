import { defineStore } from "pinia";

import { RowWeapon } from "@/ww/row/weapon";

export const useRowWeaponStore = (id: string) => {
  const storeId: string = `row-weapon-${id}`;
  const store: any = defineStore(storeId, {
    state: (): { data: RowWeapon } => ({
      data: new RowWeapon(),
    }),
    actions: {
      getJson() {
        return this.data.getJson();
      },
      loadJson(data: any) {
        this.data = new RowWeapon(data);
      },
      async updateRowWeaponByName() {
        await this.data.updateRowWeaponByName();
      },
    },
  });
  return new store();
};
