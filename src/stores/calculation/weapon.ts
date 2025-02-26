import { defineStore } from "pinia";

import { RowWeapon } from "@/ww/row/weapon";

export const useRowWeaponStore = (id: string) => {
  const storeId: string = `row-weapon-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      data: new RowWeapon(),
    }),
    actions: {
      async updateRowWeaponByName() {
        await this.data.updateRowWeaponByName();
      },
    },
  });
  return new store();
};
