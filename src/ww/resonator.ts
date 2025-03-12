import { SkillBonusEnum } from "@/types/buff";
import { SkillAttrEnum, SkillTypeEnum, type TSkillTypeEnum } from "@/types/skill";

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

  constructor(info: any = {}) {
    if (Object.keys(info).length > 0) {
      Object.assign(this, info);
    }
  }

  public duplicate(): ResonatorInfo {
    const info = new ResonatorInfo();
    info.no = this.no;
    info.name = this.name;
    info.rank = this.rank;
    info.is_permanent = this.is_permanent;
    if (this.stat_bonus.duplicate !== undefined) {
      info.stat_bonus = this.stat_bonus.duplicate();
    } else {
      info.stat_bonus = JSON.parse(JSON.stringify(this.stat_bonus));
    }
    info.element_zh_tw = this.element_zh_tw;
    info.element_en = this.element_en;
    info.attrs = JSON.parse(JSON.stringify(this.attrs));
    info.skills = JSON.parse(JSON.stringify(this.skills));
    info.skill_infos = JSON.parse(JSON.stringify(this.skill_infos));
    return info;
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

  public getHtmlInfoBySkillType(type: TSkillTypeEnum): string {
    let title: string = "";
    let text: string = "";
    switch (type) {
      case SkillTypeEnum.NORMAL_ATTACK:
        title = `【${SkillTypeEnum.NORMAL_ATTACK}】${this.skill_infos.normal_attack.name}<br /><br />`;
        text = this.skill_infos.normal_attack.description.replace(/\n/g, "<br />");
        break;
      case SkillTypeEnum.RESONANCE_SKILL:
        title = `【${SkillTypeEnum.RESONANCE_SKILL}】${this.skill_infos.resonance_skill.name}<br /><br />`;
        text = this.skill_infos.resonance_skill.description.replace(/\n/g, "<br />");
        break;
      case SkillTypeEnum.FORTE_CIRCUIT:
        title = `【${SkillTypeEnum.FORTE_CIRCUIT}】${this.skill_infos.forte_circuit.name}<br /><br />`;
        text = this.skill_infos.forte_circuit.description.replace(/\n/g, "<br />");
        break;
      case SkillTypeEnum.RESONANCE_LIBERATION:
        title = `【${SkillTypeEnum.RESONANCE_LIBERATION}】${this.skill_infos.resonance_liberation.name}<br /><br />`;
        text = this.skill_infos.resonance_liberation.description.replace(/\n/g, "<br />");
        break;
      case SkillTypeEnum.INTRO_SKILL:
        title = `【${SkillTypeEnum.INTRO_SKILL}】${this.skill_infos.intro_skill.name}<br /><br />`;
        text = this.skill_infos.intro_skill.description.replace(/\n/g, "<br />");
        break;
      default:
        return "";
    }
    return title + text;
  }

  public getDamageSkillItems(): Array<{ title: string; value: any }> {
    const items: Array<{ title: string; value: any }> = [];
    const skills = this.skills;
    skills.forEach((skill: any) => {
      if (skill.id && skill.type === "Damage") {
        const skillType = skill.skill_type;
        skill.tooltip = this.getHtmlInfoBySkillType(skillType);
        items.push({ title: skill.id, value: skill });
      }
    });
    return items;
  }

  public getDamageSkillItemById(id: string): { title: string; value: any } | undefined {
    const skills = this.skills;
    for (const skill of skills) {
      if (skill.type === "Damage" && skill.id && skill.id === id) {
        const skillType = skill.skill_type;
        skill.tooltip = this.getHtmlInfoBySkillType(skillType);
        return { title: skill.id, value: skill };
      }
    }
  }
}

export function getResonatorBaseAttrs(): Array<string> {
  return Object.values(SkillAttrEnum);
}

export function getResonatorMainSkillBonus(): Array<string> {
  return [SkillBonusEnum.SKILL, SkillBonusEnum.BASIC, SkillBonusEnum.HEAVY, SkillBonusEnum.LIBERATION];
}
