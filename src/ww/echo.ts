import fixed_main_affixes from "@/assets/data/echo/fixed_main_affixes.json";
import main_affixes from "@/assets/data/echo/main_affixes.json";

import { AbbrBonusEnum, type TAbbrBonusEnum } from "@/types/buff";
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
