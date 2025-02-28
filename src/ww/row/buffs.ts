import { RowBuffCategoryEnum, BuffTypeEnum, BuffTypeKeyEnum, type TBuffTypeEnum } from "@/types/buff";

import { RowBuff } from "./buff";
import { getNumber } from "../utils";

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

  public getRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const keys = this.getKeys();
    keys.forEach((key: string) => {
      const type = BuffTypeEnum[key.toUpperCase() as keyof typeof BuffTypeEnum];
      const value = getNumber((this as any)[key]).toString();
      const buff = new RowBuff();
      buff.category = RowBuffCategoryEnum.MANUAL;
      buff.source = RowBuffCategoryEnum.MANUAL;
      buff.type = type;
      buff.value = value;
      buff.stack = "1";
      buff.updateId();
      buffs.push(buff);
    });
    return buffs;
  }
}

export class RowBuffs {
  public buffs: Array<RowBuff> = [];
  public manual: RowBuffSummary = new RowBuffSummary();
  // buffs + manual
  public summary: RowBuffSummary = new RowBuffSummary();

  public getRowBuffs(): Array<RowBuff> {
    return [...this.summary.getRowBuffs()];
  }

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
