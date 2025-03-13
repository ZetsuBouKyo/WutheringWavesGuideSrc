import { defineStore } from "pinia";

import { RowResonator } from "@/ww/row/resonator";

export const useRowResonatorStore = (id: string) => {
  const storeId: string = `row-resonator-${id}`;
  const store: any = defineStore(storeId, {
    state: (): { data: RowResonator } => ({
      data: new RowResonator(),
    }),
    actions: {
      getJson() {
        return this.data.getJson();
      },
      loadJson(data: any) {
        this.data = new RowResonator(data);
      },
      async updateByName() {
        await this.data.updateByName();
      },
      updateSkillDmg(skill: any) {
        this.data.updateSkillDmg(skill);
      },
      updateSkill(skill: any) {
        this.data.updateSkill(skill);
      },
    },
  });
  return new store();
};
