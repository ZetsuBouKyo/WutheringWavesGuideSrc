import { mande } from "mande";
import { defineStore } from "pinia";

import { Template } from "@/ww/template";

export const useTemplateStore = (id: string) => {
  const storeId: string = `template-${id}`;
  const store: any = defineStore(storeId, {
    state: (): { data: Template } => ({
      data: new Template(),
    }),
    actions: {
      async initTemplateByHashedId(hashedTemplateId: string) {
        if (!hashedTemplateId) {
          hashedTemplateId = this.data.hashed_id;
        }
        if (!hashedTemplateId) {
          return;
        }
        const req = mande(`/data/templates/${hashedTemplateId}.json`);
        const resp: any = await req.get();
        if (Object.keys(resp).length === 0) {
          return;
        }
        this.data = new Template(resp);
        await this.data.init();
      },
      getRowBuffsForSelect() {
        return this.data.getRowBuffsForSelect();
      },
      async updateByResonatorName(i: number) {
        await this.data.updateByResonatorName(i);
      },
      updateResonatorByCalculation(i: number) {
        this.data.updateResonatorByCalculation(i);
      },
      calculateRow(i: number) {
        this.data.calculateRow(i);
      },
      calculate() {
        this.data.calculate();
      },
    },
  });
  return new store();
};
