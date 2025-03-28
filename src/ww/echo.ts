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
  public name: string = "";
  public cost: string = "";
  public sonatas: Array<string> = [];
  public skill: { description: string } = { description: "" };

  constructor(echo: any = {}) {
    if (!echo || Object.keys(echo).length === 0) {
      return;
    }
    Object.assign(this, echo);
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
