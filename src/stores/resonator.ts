import { mande } from "mande";
import { defineStore } from "pinia";

import { type IBasicResonatorInfo } from "@/types/resonator";

import { ResonatorInfo } from "@/ww/resonator";

import _resonators from "@/assets/data/resonators.json";
import echoSkills from "@/assets/data/echo/skills.json";

export const spoilerNames: Array<string> = [];

class _Resonators {
  public rows: Array<IBasicResonatorInfo> = [];

  constructor(resonators: Array<IBasicResonatorInfo>, resonatorNames: Array<string> | undefined) {
    for (const resonator of resonators) {
      if (!resonatorNames || resonatorNames.includes(resonator.name)) {
        resonator.show = true;
        this.rows.push(resonator);
      }
    }
  }

  public filter(element_en: string | undefined, rarity: string | number | undefined, weapon_zh_tw: string | undefined) {
    for (const row of this.rows) {
      row.show = true;
      if (element_en) {
        if (row.element_en !== element_en) {
          row.show = false;
        }
      }
      if (rarity) {
        rarity = rarity.toString();
        if (row.rarity.toString() !== rarity) {
          row.show = false;
        }
      }
      if (weapon_zh_tw) {
        if (row.weapon_zh_tw !== weapon_zh_tw) {
          row.show = false;
        }
      }
    }
  }

  public getNames(): Array<string> {
    const names = [];
    for (const row of this.rows) {
      if (row.show) {
        names.push(row.name);
      }
    }
    return names;
  }
}
export function getBasicResonatorInfos(resonatorNames: Array<string> | undefined = undefined): _Resonators {
  return new _Resonators(_resonators, resonatorNames);
}

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
      const names: Array<string> = [];
      for (const resonator of _resonators) {
        names.push(resonator.name);
      }

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
      for (const resonator of _resonators) {
        if (resonator.name === name) {
          return resonator.id.toString();
        }
      }
      return "";
    },
    getNameByNo(no: string): string {
      for (const resonator of _resonators) {
        if (resonator.id.toString() === no.toString()) {
          return resonator.name;
        }
      }
      return "";
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
