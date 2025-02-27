import { BuffTypeKeyEnum, type TBuffTypeEnum } from "@/types/buff";

import { getNumber } from "../utils";

export class RowBuff {
  public id: string = "";
  public source: string = "";
  public type: TBuffTypeEnum = "";
  public value: string = "";
  public stack: string = "";
  public duration: string = "";
  public target: string = "";
  public element: string = "";
  public skill_bonus_type: string = "";
}

export class RowBuffSummary {
  public [BuffTypeKeyEnum.SKILL_DMG_ADDITION]: string = "";
  public [BuffTypeKeyEnum.MAGNIFIER]: string = "";
  public [BuffTypeKeyEnum.AMPLIFIER]: string = "";
  public [BuffTypeKeyEnum.BONUS]: string = "";
  public [BuffTypeKeyEnum.HP_P]: string = "";
  public [BuffTypeKeyEnum.HP]: string = "";
  public [BuffTypeKeyEnum.ATK_P]: string = "";
  public [BuffTypeKeyEnum.ATK]: string = "";
  public [BuffTypeKeyEnum.DEF_P]: string = "";
  public [BuffTypeKeyEnum.DEF]: string = "";
  public [BuffTypeKeyEnum.CRIT_RATE]: string = "";
  public [BuffTypeKeyEnum.CRIT_DMG]: string = "";
  public [BuffTypeKeyEnum.IGNORE_DEF]: string = "";
  public [BuffTypeKeyEnum.REDUCE_RES]: string = "";

  public reset() {
    this[BuffTypeKeyEnum.SKILL_DMG_ADDITION] = "";
    this[BuffTypeKeyEnum.MAGNIFIER] = "";
    this[BuffTypeKeyEnum.AMPLIFIER] = "";
    this[BuffTypeKeyEnum.BONUS] = "";
    this[BuffTypeKeyEnum.HP_P] = "";
    this[BuffTypeKeyEnum.HP] = "";
    this[BuffTypeKeyEnum.ATK_P] = "";
    this[BuffTypeKeyEnum.ATK] = "";
    this[BuffTypeKeyEnum.DEF_P] = "";
    this[BuffTypeKeyEnum.DEF] = "";
    this[BuffTypeKeyEnum.CRIT_RATE] = "";
    this[BuffTypeKeyEnum.CRIT_DMG] = "";
    this[BuffTypeKeyEnum.IGNORE_DEF] = "";
    this[BuffTypeKeyEnum.REDUCE_RES] = "";
  }

  public getKeys(): Array<string> {
    const keys: Array<string> = [];
    Object.values(BuffTypeKeyEnum).forEach((key: string) => {
      const value = (this as any)[key];
      if (getNumber(value) > 0) {
        keys.push(key);
      }
    });
    return keys;
  }
}

export class RowBuffs {
  public buffs: Array<RowBuff> = [];
  public manual: RowBuffSummary = new RowBuffSummary();
  // buffs + manual
  public summary: RowBuffSummary = new RowBuffSummary();

  public updateSummary() {
    this.summary.reset();
    const keys = this.manual.getKeys();
    keys.forEach((key: TBuffTypeEnum) => {
      const manualValue = getNumber((this.manual as any)[key]);
      let summaryValue: any = getNumber((this.summary as any)[key]) + manualValue;
      summaryValue = getNumber(summaryValue).toString();
      (this.summary as any)[key] = summaryValue;
    });
  }
}
