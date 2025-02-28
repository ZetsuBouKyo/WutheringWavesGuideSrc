import { SkillBonusEnum } from "@/types/buff";
import { SkillAttrEnum } from "@/types/skill";

import { StatBuff } from "./buff";

export class ResonatorInfo {
  public no: string = "";
  public name: string = "";
  public rank: string = "";
  public is_permanent?: boolean = undefined;
  public stat_bonus: StatBuff = new StatBuff();
  public element_zh_tw: string = "";
  public element_en: string = "";

  public attrs: Array<{ lv: string; hp: string; atk: string; def: string }> = [];
  public skills: Array<any> = [];
  public skill_infos: any = {};

  constructor(info: any) {
    Object.assign(this, info);
  }

  public getHp(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.hp;
      }
    }
    return "";
  }

  public getAtk(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.atk;
      }
    }
    return "";
  }

  public getDef(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (attr.lv === level) {
        return attr.def;
      }
    }
    return "";
  }

  public getDamageSkillItems(): Array<{ title: string; value: any }> {
    const items: Array<{ title: string; value: any }> = [];
    const skills = this.skills;
    skills.forEach((skill: any) => {
      if (skill.id && skill.type === "Damage") {
        items.push({ title: skill.id, value: skill });
      }
    });
    return items;
  }
}

export function getResonatorBaseAttrs(): Array<string> {
  return Object.values(SkillAttrEnum);
}

export function getResonatorMainSkillBonus(): Array<string> {
  return [SkillBonusEnum.SKILL, SkillBonusEnum.BASIC, SkillBonusEnum.HEAVY, SkillBonusEnum.LIBERATION];
}
