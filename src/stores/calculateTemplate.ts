import { mande } from "mande";
import { defineStore } from "pinia";

import { type ICalculatedTemplate, type ICalculatedTemplateComparison } from "@/types/calculateTemplate";
import { TierEnum, type TTierEnum } from "@/types/tier";

import { useResonatorStore, spoilerNames } from "@/stores/resonator";

import { getKeyByValue } from "@/ww/utils";

export const useCalculatedTemplateStore = defineStore("calculatedTemplate", {
  state: (): {
    data: ICalculatedTemplate;
    cache: {
      nameToTemplateIds: { [name: string]: Array<string> };
      templateIdToHashedTemplateId: { [id: string]: string };
      comparisonIdToComparison: { [id: string]: ICalculatedTemplateComparison };
      tierToTemplateIds: { [tier: string]: Array<string> };
      hashedTemplateIdToResonatorNamesForEchoComparison: { [id: string]: Array<string> };
    };
  } => ({
    data: {
      templates: [],
      comparisons: {},
    },
    cache: {
      nameToTemplateIds: {},
      templateIdToHashedTemplateId: {},
      comparisonIdToComparison: {},
      tierToTemplateIds: {
        [TierEnum.T01]: [],
        [TierEnum.T11]: [],
        [TierEnum.T21]: [],
        [TierEnum.T31]: [],
        [TierEnum.T41]: [],
        [TierEnum.T51]: [],
        [TierEnum.T61]: [],
        [TierEnum.T65]: [],
      },
      hashedTemplateIdToResonatorNamesForEchoComparison: {},
    },
  }),
  actions: {
    async init() {
      if (this.data.templates.length > 0) {
        return;
      }
      try {
        const req = mande("/data/calculation/templates.json");
        const resp: ICalculatedTemplate = await req.get();
        this.data = resp;

        this.data.templates.forEach((template) => {
          this.cache.templateIdToHashedTemplateId[template.id] = template.hashed_id;
          template.echo_comparison.forEach((name: string) => {
            const templateIds = this.cache.nameToTemplateIds[name];
            if (!templateIds) {
              this.cache.nameToTemplateIds[name] = [template.id];
            } else {
              this.cache.nameToTemplateIds[name].push(template.id);
            }
          });

          // Echo comparison
          this.cache.hashedTemplateIdToResonatorNamesForEchoComparison[template.hashed_id] = template.echo_comparison;

          // Tiers
          const templateId = template.id;
          if (template.is_tier) {
            this.cache.tierToTemplateIds[TierEnum.T01].push(templateId);
          }
          if (template.is_1_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T11].push(templateId);
          }
          if (template.is_2_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T21].push(templateId);
          }
          if (template.is_3_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T31].push(templateId);
          }
          if (template.is_4_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T41].push(templateId);
          }
          if (template.is_5_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T51].push(templateId);
          }
          if (template.is_6_1_tier) {
            this.cache.tierToTemplateIds[TierEnum.T61].push(templateId);
          }
          if (template.is_6_5_tier) {
            this.cache.tierToTemplateIds[TierEnum.T65].push(templateId);
          }
        });

        const comparisonsKeys = Object.keys(this.data.comparisons);
        comparisonsKeys.forEach((resonatorName: string) => {
          const comparisons = this.data.comparisons[resonatorName];
          comparisons.forEach((comparison: ICalculatedTemplateComparison) => {
            const id = comparison.id;
            this.cache.comparisonIdToComparison[id] = comparison;
          });
        });
      } catch (error) {
        return error;
      }
    },
    getNames(spoiler: any = false): Array<string> {
      const s: Set<string> = new Set([]);
      for (const template of this.data.templates) {
        for (const name of template.echo_comparison) {
          s.add(name);
        }
      }
      const names = Array.from(s);
      if (spoiler === true) {
        return names;
      }
      const censoredNames: Array<string> = [];
      names.forEach((name: string) => {
        if (spoilerNames.includes(name)) {
          return;
        }
        censoredNames.push(name);
      });
      return censoredNames;
    },
    getTemplateIdsByNo(no: string): Array<string> {
      const resonatorStore = useResonatorStore();
      const name = resonatorStore.getNameByNo(no);
      return this.cache.nameToTemplateIds[name];
    },
    getComparisonsByNo(no: string): Array<ICalculatedTemplateComparison> {
      const resonatorStore = useResonatorStore();
      const name = resonatorStore.getNameByNo(no);
      const comparisons = this.data.comparisons[name];
      if (!comparisons) {
        return [];
      }
      return comparisons;
    },
    getHashedTemplateIdByTemplateId(templateId: string): string {
      return this.cache.templateIdToHashedTemplateId[templateId];
    },
    getTemplateIdByHashedTemplateId(hashedTemplateId: string): string {
      return getKeyByValue(this.cache.templateIdToHashedTemplateId, hashedTemplateId);
    },
    getComparisonByComparisonId(comparisonId: string): ICalculatedTemplateComparison {
      return this.cache.comparisonIdToComparison[comparisonId];
    },
    getTierTemplateIds(tier: TTierEnum): Array<string> {
      return this.cache.tierToTemplateIds[tier];
    },
    getResonatorNamesForEchoComparisonByHashedTemplateId(hashedTemplateId: string): Array<string> {
      const resonatorNames = this.cache.hashedTemplateIdToResonatorNamesForEchoComparison[hashedTemplateId];
      if (!resonatorNames) {
        return [];
      }
      return resonatorNames;
    },
  },
});
