import { defineStore } from "pinia";

export const useRowMonsterStore = (id: string) => {
  const storeId: string = `row-monster-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      name: "",
      level: "",
      def: "",
      res_physics: "",
      res_glacio: "",
      res_fusion: "",
      res_electro: "",
      res_aero: "",
      res_spectro: "",
      res_havoc: "",
      _item: { title: "", value: undefined },
    }),
    actions: {
      updateByMonsterItem(item: any) {
        if (!item) {
          return;
        }
        const monster = item;

        this.name = monster.name;
        this.level = monster.level;
        this.def = monster.def;
        this.res_physics = monster.res_physics;
        this.res_glacio = monster.res_glacio;
        this.res_fusion = monster.res_fusion;
        this.res_electro = monster.res_electro;
        this.res_aero = monster.res_aero;
        this.res_spectro = monster.res_spectro;
        this.res_havoc = monster.res_havoc;
      },
    },
  });
  return new store();
};
