import { defineStore } from "pinia";

import echoes from "@/assets/data/echo/infos.json";
import sonatas from "@/assets/data/echo/sonatas.json";
import sub_affixes from "@/assets/data/echo/sub_affixes.json";

import { AbbrBonusEnum } from "@/types/buff";

const sonataNames = Object.keys(sonatas);

const echoesForCalculation: Array<any> = [
  {
    name: "白板3C聲骸",
    cost: "3",
    sonatas: sonataNames,
  },
  {
    name: "白板1C聲骸",
    cost: "1",
    sonatas: sonataNames,
  },
  ...echoes,
];

export const useEchoStore = defineStore("echo", {
  state: () => ({
    //
  }),
  actions: {
    getEchoItemForCalculationByName(name: string): any {
      for (const echo of echoesForCalculation) {
        if (echo.name === name) {
          return { title: name, value: echo };
        }
      }
      return { title: name, value: undefined };
    },
    getEchoNames(): Array<string> {
      const e = echoesForCalculation.map((value: any, _, __) => {
        return value.name;
      });
      return e;
    },
    getEchoItemsForCalculation(): Array<any> {
      const e = echoesForCalculation.map((value: any, _, __) => {
        return { title: value.name, value: value };
      });
      return e;
    },
    getSubAffixKeys(): Array<string> {
      return Object.keys(sub_affixes);
    },
    getSubAffixValues(statBonusKey: string): Array<string> {
      const values = (sub_affixes as any)[statBonusKey.toLowerCase()];
      if (!values) {
        return [];
      }
      return values;
    },
    getCosts(): Array<string> {
      return ["4", "3", "1"];
    },
    getSonataNames(): Array<string> {
      return sonataNames;
    },
    getAbbrs(): Array<string> {
      return Object.values(AbbrBonusEnum);
    },
  },
});
