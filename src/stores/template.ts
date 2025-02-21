import { mande } from "mande";
import { defineStore } from "pinia";

import { Template } from "@/ww/template";

export const useTemplateStore = defineStore("template", {
  state: () => ({
    //
  }),
  actions: {
    async getTemplateByHashedTemplateId(hashedTemplateId: string): Promise<Template> {
      try {
        const req = mande(`/data/templates/${hashedTemplateId}.json`);
        const template: any = await req.get();
        return new Template(template);
      } catch (error) {
        throw error;
      }
    },
  },
});
