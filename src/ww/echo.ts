import fixed_main_affixes from "@/assets/data/echo/fixed_main_affixes.json";
import main_affixes from "@/assets/data/echo/main_affixes.json";

import { StatBuffZhTwEnum, type TStatBuffEnum } from "@/types/buff";

const fixedMainAffixes = fixed_main_affixes as { [cost: string]: { [buff: string]: string } };
const mainAffixes = main_affixes as { [cost: string]: { [buff: string]: string } };

export function getAffixLabelByKey(key: string): string {
  if (!key) {
    return "";
  }
  const buffKey = key.toUpperCase() as keyof typeof StatBuffZhTwEnum;
  const label = StatBuffZhTwEnum[buffKey];
  if (label) {
    return label;
  }
  return "";
}

export function getFixedMainAffixes(cost: string): { [buff: TStatBuffEnum | string]: string } {
  return fixedMainAffixes[cost];
}

export function getMainAffixes(cost: string): { [buff: TStatBuffEnum | string]: string } {
  return mainAffixes[cost];
}

export class EchoInfo {
  public id: number | undefined = undefined;
  public monster_info: number | undefined = undefined;
  public code: string = "";
  public name: string = "";
  public type: string = "";
  public element_ids: Array<number> = [];
  public cost: string = "";
  public intensity_code: number | undefined = undefined;
  public intensity_zh_tw: string = "";
  public place: string = "";
  public icon: string = "";
  public sonatas: Array<string> = [];
  public skill_id: number | undefined = undefined;
  public skill: { description: string; desc: string; simple_desc: string; param: Array<Array<string>> } = {
    description: "",
    desc: "",
    simple_desc: "",
    param: [],
  };
  public damage_ids: Array<number> = [];
  public damage: Array<any> = [];
  public groups: Array<any> = [];

  constructor(data: any = {}) {
    Object.assign(this, data);
  }

  duplicate(): EchoInfo {
    return new EchoInfo(JSON.parse(JSON.stringify(this)));
  }

  public getHtmlInfo(): string {
    let text = "";
    if (this.name) {
      text = `【${this.name}】`;
    }
    if (this.skill?.description) {
      text = `${text}\n\n${this.skill.description}`;
    }
    text = text.replace(/\n/g, "<br />");
    return text;
  }
}
