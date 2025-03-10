import { mande } from "mande";
import { defineStore } from "pinia";

import { Template } from "@/ww/template";

import templates from "@/assets/data/cache/templates.json";

interface TemplateItem {
  title: string;
  value: { hashed_id: string; id: string };
}

export const useTemplatesStore = defineStore("template", {
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
    getTemplateItems(): Array<TemplateItem> {
      const t: Array<TemplateItem> = [];
      templates.forEach((template: { hashed_id: string; id: string }) => {
        t.push({
          title: template.id,
          value: template,
        });
      });
      t.sort((templateA: any, templateB: any) => {
        const titleA = templateA.title;
        const titleB = templateB.title;
        return titleA.localeCompare(titleB);
      });
      return t;
    },
  },
});
