import { useResonatorStore } from "@/stores/resonator";

import { SkillBonusEnum } from "@/types/buff";
import { SkillTypeEnum } from "@/types/skill";

import { StatBuff } from "@/ww/buff";

export class RowResonatorSkill {
  public id: string = "";
  public type: string = "";
  public base_attr: string = "";
  public bonus_types: Array<string> = [];
  public elment_zh_tw: string = "";
  public dmg: string = "";
}

export class RowResonator {
  public id: string = "";
  public no: string = "";
  public name: string = "";
  public base_attr: string = "";
  public main_skill_bonus: string = "";
  public element_zh_tw: string = "";
  public level: string = "90";
  public chain: string = "1";
  public hp: string = "";
  public atk: string = "";
  public def: string = "";
  public normal_attack_lv: string = "10";
  public resonance_skill_lv: string = "10";
  public forte_circuit_lv: string = "10";
  public resonance_liberation_lv: string = "10";
  public intro_skill_lv: string = "10";
  public inherent_skill_1: boolean = true;
  public inherent_skill_2: boolean = true;
  public stat_bonus: StatBuff = new StatBuff();
  public skill: RowResonatorSkill = new RowResonatorSkill();
  public _skill_item: { title: string; value: RowResonatorSkill | undefined } = { title: "", value: undefined };

  public async updateByName() {
    const resonatorStore = useResonatorStore();

    // Reset
    this.stat_bonus = new StatBuff();
    this.skill = new RowResonatorSkill();
    this._skill_item = { title: "", value: undefined };

    const name = this.name as string;
    const no = resonatorStore.getNoByName(name);
    if (!no) {
      return;
    }
    this.no = no;

    const info = await resonatorStore.getInfoByName(name);
    this.element_zh_tw = info.element_zh_tw;
    const stat_bonus = info.stat_bonus;
    Object.keys(stat_bonus).forEach((key: string) => {
      const value = (stat_bonus as any)[key];
      (this.stat_bonus as any)[key] = value;
    });
  }

  public updateSkillDmg(skill: any) {
    const skill_type = this.skill.type;
    let level;
    switch (skill_type) {
      case SkillTypeEnum.NORMAL_ATTACK:
        level = this.normal_attack_lv;
        break;
      case SkillTypeEnum.RESONANCE_SKILL:
        level = this.resonance_skill_lv;
        break;
      case SkillTypeEnum.FORTE_CIRCUIT:
        level = this.forte_circuit_lv;
        break;
      case SkillTypeEnum.RESONANCE_LIBERATION:
        level = this.resonance_liberation_lv;
        break;
      case SkillTypeEnum.INTRO_SKILL:
        level = this.intro_skill_lv;
        break;
      default:
        level = "10";
    }
    this.skill.dmg = skill[`lv${level}`];
  }

  public updateSkill(skill: any) {
    if (!skill) {
      if (!this._skill_item) {
        return;
      }
      skill = this._skill_item.value as any;
    }
    if (!skill) {
      return;
    }
    this.skill = new RowResonatorSkill();
    this.skill.id = skill.id;
    this.skill.type = skill.skill_type;
    this.skill.base_attr = skill.base_attr;
    this.skill.elment_zh_tw = skill.element;
    this.skill.bonus_types.push(skill.element);
    this.skill.bonus_types.push(skill.bonus_type);
    if (skill.coordinated) {
      this.skill.bonus_types.push(SkillBonusEnum.COORDINATED_ATTACK);
    }
    this.updateSkillDmg(skill);
  }
}
