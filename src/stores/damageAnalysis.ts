import { mande } from "mande";
import { defineStore } from "pinia";

import { type TAffixPolicyEnum } from "@/types/affix";

import { md5 } from "@/ww/utils";
import { DamageAnalysis } from "@/ww/damage";

export const useDamageAnalysisStore = defineStore("damageAnalysis", {
  state: () => ({
    //
  }),
  actions: {
    async getDamageAnalysisByHashedTemplateId(hashedTemplateId: string, affixPolicy: TAffixPolicyEnum) {
      const req = mande(`/data/calculation/template/${hashedTemplateId}/${affixPolicy}/damage_analysis.json`);
      const resp: any = await req.get();
      return new DamageAnalysis(resp, affixPolicy);
    },
    async getDamageAnalysisByTemplateId(templateId: string, affixPolicy: TAffixPolicyEnum) {
      const hashedTemplateId = md5(templateId);
      const damageAnalysis = await this.getDamageAnalysisByHashedTemplateId(hashedTemplateId, affixPolicy);
      return damageAnalysis;
    },
  },
});
