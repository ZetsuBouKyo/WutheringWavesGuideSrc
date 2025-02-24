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

  public getSkillItems(): Array<{ title: string; value: any }> {
    const items: Array<{ title: string; value: any }> = [];
    const skills = this.skills;
    skills.forEach((skill: any) => {
      if (skill.id) {
        items.push({ title: skill.id, value: skill });
      }
    });
    return items;
  }
}

export class RowResonatorSkill {
  public id: string = "";
  public type: string = "";
  public base_attr: string = "";
  public bonus_types: Array<string> = [];
  public elment_zh_tw: string = "";
  public dmg: string = "";
}
