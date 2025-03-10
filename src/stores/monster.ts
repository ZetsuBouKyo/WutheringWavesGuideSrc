import { defineStore } from "pinia";

import monsters from "@/assets/data/monsters.json";

const m = monsters as Array<any>;

export const useMonsterStore = defineStore("monster", {
  state: () => ({
    //
  }),
  actions: {
    getMonsterItems(): Array<any> {
      const items = m.map((value: any, _, __) => {
        return { title: value.name, value: value };
      });
      return items;
    },
  },
});
