import { mande } from "mande";
import { defineStore } from "pinia";

import { Template } from "@/ww/template";
import { TeamDamageDistribution } from "@/ww/damage";

export const useEchoComparisonStore = defineStore("echoComparison", {
  state: () => ({}),
  actions: {
    async getEchoComparison(hashedTemplateId: string, affixPolicy: string, resonatorNo: string): Promise<any> {
      const req = mande(
        `/data/calculation/template/${hashedTemplateId}/${affixPolicy}/echo_comparison/${resonatorNo}.json`,
      );
      const resp: any = await req.get();

      // Damage distributions
      const damageDistributions: Array<any> = [];
      resp.damage_distributions.forEach((damageDistribution: any) => {
        const d = new TeamDamageDistribution(damageDistribution);
        damageDistributions.push(d);
      });
      resp.damage_distributions = damageDistributions;

      // Resonator template
      resp.resonator_template = new Template(resp.resonator_template);

      return resp;
    },
  },
});
