import fixed_main_affixes from "@/assets/data/echo/fixed_main_affixes.json";
import main_affixes from "@/assets/data/echo/main_affixes.json";

import { StatBuffEnum, StatBuffZhTwEnum, type TStatBuffEnum, type TStatBuffZhTwEnum } from "@/types/buff";

const fixedMainAffixes = fixed_main_affixes as { [cost: string]: { [buff: string]: string | number } };
const mainAffixes = main_affixes as { [cost: string]: { [buff: string]: string | number } };

export class Echo {
  public name: string = "";
  public [StatBuffEnum.HP_P]: string = "";

  constructor(echo: any = {}) {
    Object.assign(this, echo);
  }
}

export class RowEcho {
  public echo_name_1: string = "";
  public echo_name_2: string = "";
  public echo_name_3: string = "";
  public echo_name_4: string = "";
  public echo_name_5: string = "";

  constructor(distribution: any) {
    Object.assign(this, distribution);
  }
}

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

export function getFixedMainAffixes(cost: string): { [buff: TStatBuffEnum]: string | number } {
  return fixedMainAffixes[cost];
}

export function getMainAffixes(cost: string): { [buff: TStatBuffEnum]: string | number } {
  return mainAffixes[cost];
}
