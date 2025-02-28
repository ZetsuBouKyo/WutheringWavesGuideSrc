import {
  BuffTypeEnum,
  ElementBonusEnum,
  RowBuffCategoryEnum,
  SkillBonusEnum,
  StatBuffEnum,
  type TStatBuffEnum,
} from "@/types/buff";

import { getNumber } from "@/ww/utils";
import { RowBuff } from "@/ww/row/buff";

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

  public getRowBuffs(source: string): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const keys = this.getKeys();
    keys.forEach((key: string) => {
      const value = getNumber((this as any)[key]);
      if (value === 0) {
        return;
      }
      const buff = new RowBuff();
      buff.category = RowBuffCategoryEnum.STAT;
      buff.stack = "1";
      buff.value = value.toString();
      if (source) {
        buff.source = `${source}-${buff.category}`;
      } else {
        buff.source = buff.category;
      }

      let type: string = "";
      let element: string = "";
      let skill_bonus_type: string = "";
      switch (key) {
        case StatBuffEnum.CRIT_RATE:
          type = BuffTypeEnum.CRIT_RATE;
          break;
        case StatBuffEnum.CRIT_DMG:
          type = BuffTypeEnum.CRIT_DMG;
          break;
        case StatBuffEnum.HP:
          type = BuffTypeEnum.HP;
          break;
        case StatBuffEnum.HP_P:
          type = BuffTypeEnum.HP_P;
          break;
        case StatBuffEnum.ATK:
          type = BuffTypeEnum.ATK;
          break;
        case StatBuffEnum.ATK_P:
          type = BuffTypeEnum.ATK_P;
          break;
        case StatBuffEnum.DEF:
          type = BuffTypeEnum.DEF;
          break;
        case StatBuffEnum.DEF_P:
          type = BuffTypeEnum.DEF_P;
          break;
        // TODO:
        // case StatBuffEnum.ENERGY_REGEN:
        //   break;
        // case StatBuffEnum.BONUS_PHYSICS:
        //   break;
        // case StatBuffEnum.BONUS_HEALING:
        //   break;
        case StatBuffEnum.BONUS_GLACIO:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.GLACIO;
          break;
        case StatBuffEnum.BONUS_FUSION:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.FUSION;
          break;
        case StatBuffEnum.BONUS_ELECTRO:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.ELECTRO;
          break;
        case StatBuffEnum.BONUS_AERO:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.AERO;
          break;
        case StatBuffEnum.BONUS_SPECTRO:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.SPECTRO;
          break;
        case StatBuffEnum.BONUS_HAVOC:
          type = BuffTypeEnum.BONUS;
          element = ElementBonusEnum.HAVOC;
          break;
        case StatBuffEnum.BONUS_RESONANCE_SKILL:
          type = BuffTypeEnum.BONUS;
          skill_bonus_type = SkillBonusEnum.SKILL;
          break;
        case StatBuffEnum.BONUS_BASIC_ATTACK:
          type = BuffTypeEnum.BONUS;
          skill_bonus_type = SkillBonusEnum.BASIC;
          break;
        case StatBuffEnum.BONUS_HEAVY_ATTACK:
          type = BuffTypeEnum.BONUS;
          skill_bonus_type = SkillBonusEnum.HEAVY;
          break;
        case StatBuffEnum.BONUS_RESONANCE_LIBERATION:
          type = BuffTypeEnum.BONUS;
          skill_bonus_type = SkillBonusEnum.LIBERATION;
          break;
        default:
          return;
      }
      buff.type = type;
      buff.element = element;
      buff.skill_bonus_type = skill_bonus_type;
      buff.updateId();
      buffs.push(buff);
    });
    return buffs;
  }
}

export function getSkillBonusType(): Array<string> {
  return [
    ...Object.values(ElementBonusEnum),
    SkillBonusEnum.BASIC,
    SkillBonusEnum.HEAVY,
    SkillBonusEnum.SKILL,
    SkillBonusEnum.LIBERATION,
    SkillBonusEnum.INTRO,
    SkillBonusEnum.OUTRO,
    SkillBonusEnum.ECHO,
    SkillBonusEnum.COORDINATED_ATTACK,
  ];
}
