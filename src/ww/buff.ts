import { StatBuffEnum, type TStatBuffEnum } from "@/types/buff";

import { getNumber } from "./utils";

export class StatBuff {
  public [StatBuffEnum.CRIT_RATE]: string = "";
  public [StatBuffEnum.CRIT_DMG]: string = "";

  public [StatBuffEnum.HP]: string = "";
  public [StatBuffEnum.HP_P]: string = "";
  public [StatBuffEnum.ATK]: string = "";
  public [StatBuffEnum.ATK_P]: string = "";
  public [StatBuffEnum.DEF]: string = "";
  public [StatBuffEnum.DEF_P]: string = "";
  public [StatBuffEnum.ENERGY_REGEN]: string = "";

  public [StatBuffEnum.BONUS_PHYSICS]: string = "";
  public [StatBuffEnum.BONUS_GLACIO]: string = "";
  public [StatBuffEnum.BONUS_FUSION]: string = "";
  public [StatBuffEnum.BONUS_ELECTRO]: string = "";
  public [StatBuffEnum.BONUS_AERO]: string = "";
  public [StatBuffEnum.BONUS_SPECTRO]: string = "";
  public [StatBuffEnum.BONUS_HAVOC]: string = "";

  public [StatBuffEnum.BONUS_RESONANCE_SKILL]: string = "";
  public [StatBuffEnum.BONUS_BASIC_ATTACK]: string = "";
  public [StatBuffEnum.BONUS_HEAVY_ATTACK]: string = "";
  public [StatBuffEnum.BONUS_RESONANCE_LIBERATION]: string = "";
  public [StatBuffEnum.BONUS_HEALING]: string = "";

  constructor() {}

  public addStatBuff(buff: StatBuff) {
    const buffKeys = Object.values(StatBuffEnum);
    buffKeys.forEach((key: TStatBuffEnum) => {
      const oldValue = getNumber((this as any)[key]);
      const newValue = getNumber((buff as any)[key]);
      (this as any)[key] = getNumber(oldValue + newValue).toString();
    });
  }

  public getKeys(): Array<string> {
    const keys: Array<string> = [];
    Object.values(StatBuffEnum).forEach((key: string) => {
      const value = (this as any)[key];
      if (getNumber(value) > 0) {
        keys.push(key);
      }
    });
    return keys;
  }
}
