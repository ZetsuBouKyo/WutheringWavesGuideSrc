import { defineStore } from "pinia";

import echoes from "@/assets/data/echo/infos.json";
import sub_affixes from "@/assets/data/echo/sub_affixes.json";

import { AbbrBonusEnum } from "@/types/buff";

import { getSonataNames } from "@/stores/sonata";
import { EchoInfo } from "@/ww/echo";

const sonataNames = getSonataNames();

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
    getEchoItemForCalculationByName(name: string): {
      title: string;
      value: { name: string; cost: string; sonatas: Array<string> } | undefined;
    } {
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
    getEchoes(): Array<EchoInfo> {
      const infos = [];
      for (const echo of echoes) {
        infos.push(new EchoInfo(echo));
      }
      return infos;
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
    getInfoByName(name: string): EchoInfo | undefined {
      for (const echo of echoesForCalculation) {
        if (echo.name === name) {
          return new EchoInfo(echo);
        }
      }
    },
    getInfoByID(id: number | string): EchoInfo | undefined {
      for (const echo of echoes) {
        if (echo.id.toString() === id.toString()) {
          return new EchoInfo(echo);
        }
      }
    },
  },
});
