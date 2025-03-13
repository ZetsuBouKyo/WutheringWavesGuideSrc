import { mande } from "mande";
import { defineStore } from "pinia";

import { getKeyByValue } from "@/ww/utils";
import { ResonatorInfo } from "@/ww/resonator";

import echoSkills from "@/assets/data/echo/skills.json";

const name2no: { [name: string]: string } = {
  散華: "1102",
  白芷: "1103",
  凌陽: "1104",
  折枝: "1105",
  釉瑚: "1106",
  珂萊塔: "1107",
  熾霞: "1202",
  安可: "1203",
  莫特斐: "1204",
  長離: "1205",
  布蘭特: "1206",
  卡卡羅: "1301",
  吟霖: "1302",
  淵武: "1303",
  今汐: "1304",
  相里要: "1305",
  秧秧: "1402",
  秋水: "1403",
  忌炎: "1404",
  鑒心: "1405",
  "漂泊者·衍射(男)": "1501",
  "漂泊者·衍射(女)": "1502",
  維里奈: "1503",
  守岸人: "1505",
  菲比: "1506",
  桃祈: "1601",
  丹瑾: "1602",
  椿: "1603",
  "漂泊者·湮滅(女)": "1604",
  "漂泊者·湮滅(男)": "1605",
  洛可可: "1606",
};

export const spoilerNames: Array<string> = [];

export function getEchoDamageSkillItems(): Array<any> {
  const items: Array<any> = [];
  echoSkills.forEach((skill: any) => {
    items.push({ title: skill.id, value: skill });
  });
  return items;
}

export function getEchoDamageSkillItem(id: string): any {
  for (const skill of echoSkills) {
    if (id === skill.id) {
      return { title: skill.id, value: skill };
    }
  }
}

export const useResonatorStore = defineStore("resonator", {
  state: () => ({}),
  actions: {
    getNames(spoiler: any = false): Array<string> {
      const names: Array<string> = Object.keys(name2no);
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
    getChains(): Array<string> {
      return new Array("0", "1", "2", "3", "4", "5", "6");
    },
    getLevels(): Array<string> {
      return new Array("1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90");
    },
    getSkillLevels(): Array<string> {
      return new Array("1", "2", "3", "4", "5", "6", "7", "8", "9", "10");
    },
    getNoByName(name: string): any {
      return name2no[name];
    },
    getNameByNo(no: string): string {
      return getKeyByValue(name2no, no);
    },
    getIconSrcByNo(no: string): string {
      return `/assets/resonators/${no}/icon.png`;
    },
    getIconSrcByName(name: string): string {
      const no = this.getNoByName(name);
      return this.getIconSrcByNo(no);
    },
    async getInfoByNo(no: string): Promise<ResonatorInfo> {
      try {
        const req = mande(`/data/resonators/${no}/info.json`);
        const info: any = new ResonatorInfo(await req.get());
        return info;
      } catch (error) {
        throw error;
      }
    },
    async getInfoByName(name: string): Promise<ResonatorInfo> {
      const no = this.getNoByName(name);
      const info = await this.getInfoByNo(no);
      return info;
    },
    async getElementEnByNo(no: string): Promise<string> {
      const info = await this.getInfoByNo(no);
      return info.element_en;
    },
    async getElementEnByName(name: string): Promise<string> {
      const no = this.getNoByName(name);
      const elementEn = await this.getElementEnByNo(no);
      return elementEn;
    },
    async getElementSrcByNo(no: string): Promise<string> {
      const elementEn = await this.getElementEnByNo(no);
      return `/assets/elements/${elementEn}.png`;
    },
    async getElementSrcByName(name: string): Promise<string> {
      const no = this.getNoByName(name);
      const elementSrc = await this.getElementSrcByNo(no);
      return elementSrc;
    },
    async getDamageSkillItems(name: string): Promise<any> {
      const info = await this.getInfoByName(name);
      return [...info.getDamageSkillItems(), ...getEchoDamageSkillItems()];
    },
  },
});
