import { useResonatorStore, getEchoDamageSkillItem } from "@/stores/resonator";

import { BaseTypeEnum, BuffTypeEnum, RowBuffCategoryEnum, SkillBonusEnum, type TElementBonusEnum } from "@/types/buff";
import { SkillAttrEnum, SkillTypeEnum, type TSkillAttrEnum, type TSkillTypeEnum } from "@/types/skill";

import { StatBuff } from "@/ww/buff";
import { RowBuff } from "@/ww/row/buff";
import { getNumber } from "@/ww/utils";
import { ResonatorInfo } from "@/ww/resonator";

export class RowResonatorSkill {
  public id: string = "";
  public type: TSkillTypeEnum = "";
  public level: string = "";
  public base_attr: TSkillAttrEnum = "";
  public bonus_types: Array<string> = [];
  public elment_zh_tw: TElementBonusEnum = "";
  public dmg: string = "";
  public hit: string = "1";

  constructor(skill: any = {}) {
    if (!skill || Object.keys(skill).length === 0) {
      return;
    }
    Object.assign(this, skill);
  }

  public duplicate(): RowResonatorSkill {
    const s = new RowResonatorSkill();
    s.id = this.id;
    s.type = this.type;
    s.level = this.level;
    s.base_attr = this.base_attr;
    s.bonus_types = this.bonus_types;
    s.elment_zh_tw = this.elment_zh_tw;
    s.dmg = this.dmg;
    return s;
  }

  public getBonusTypesString(): string {
    return this.bonus_types.join(", ");
  }
}

export class RowResonator {
  public id: string = "";
  public no: string = "";
  public name: string = "";
  public element_en: string = "";
  public element_zh_tw: string = "";
  public level: string = "90";
  public chain: string = "0";
  public weapon_zh_tw: string = "";
  public hp: string = "";
  public atk: string = "";
  public def: string = "";
  public energy_regen: string = "100.00%";
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
  public _info: ResonatorInfo | undefined = undefined; // TODO: refactor

  constructor(resonator: any = {}) {
    if (!resonator || Object.keys(resonator).length === 0) {
      return;
    }
    const { stat_bonus, skill, _skill_item, _info, ...data } = resonator;
    Object.assign(this, data);

    this.stat_bonus = new StatBuff(stat_bonus);
    this.skill = new RowResonatorSkill(skill);
    if (resonator._skill_item.title) {
      this._skill_item.title = resonator._skill_item.title;
    }
    if (resonator._skill_item.value) {
      this._skill_item.value = new RowResonatorSkill(resonator._skill_item.value);
    }
    this._info = new ResonatorInfo(_info);
  }

  public duplicate(): RowResonator {
    const r = new RowResonator();
    r.id = this.id;
    r.no = this.no;
    r.name = this.name;
    r.element_zh_tw = this.element_zh_tw;
    r.level = this.level;
    r.chain = this.chain;
    r.weapon_zh_tw = this.weapon_zh_tw;
    r.hp = this.hp;
    r.atk = this.atk;
    r.def = this.def;
    r.energy_regen = this.energy_regen;
    r.normal_attack_lv = this.normal_attack_lv;
    r.resonance_skill_lv = this.resonance_skill_lv;
    r.forte_circuit_lv = this.forte_circuit_lv;
    r.resonance_liberation_lv = this.resonance_liberation_lv;
    r.intro_skill_lv = this.intro_skill_lv;
    r.inherent_skill_1 = this.inherent_skill_1;
    r.inherent_skill_2 = this.inherent_skill_2;
    r.stat_bonus = this.stat_bonus.duplicate();
    r.skill = this.skill.duplicate();
    r._skill_item = { title: this._skill_item.title, value: undefined };
    if (this._skill_item.value !== undefined) {
      r._skill_item.value = this._skill_item.value.duplicate();
    }
    if (this._info !== undefined) {
      r._info = this._info.duplicate();
    }
    return r;
  }

  public getId(): string {
    return `+${this.chain}${this.name}`;
  }

  public getJson(): object {
    return JSON.parse(JSON.stringify(this));
  }

  public getBaseAttrs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];

    const buff = new RowBuff();
    buff.stack = "1";

    let value: string;
    let source: string = this.skill.base_attr;
    switch (this.skill.base_attr) {
      case SkillAttrEnum.HP:
        value = getNumber(this.hp).toString();
        break;
      case SkillAttrEnum.DEF:
        value = getNumber(this.def).toString();
        break;
      case SkillAttrEnum.ATK:
      default:
        value = getNumber(this.atk).toString();
        source = SkillAttrEnum.ATK;
        break;
    }
    if (this.name) {
      source = `${this.name}-${source}`;
    }
    buff.category = RowBuffCategoryEnum.ATTR;
    buff.source = source;
    buff.value = value;
    buff.type = BaseTypeEnum.ATTR;
    buff.updateId();

    buffs.push(buff);

    return buffs;
  }

  public getRowBuffs(): Array<RowBuff> {
    return this.stat_bonus.getRowBuffs(this.name);
  }

  public getSkillRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const buff = new RowBuff();
    buff.category = RowBuffCategoryEnum.RESONATOR;
    buff.type = BuffTypeEnum.SKILL_DMG_ADDITION;
    buff.value = getNumber(this.skill.dmg).toString();
    buff.stack = "1";

    let source: string = "";
    if (this.name) {
      source = this.name;
    }
    if (this.skill.type) {
      source = `${source}-${this.skill.type}`;
    }
    if (this.skill.id) {
      source = `${source}-${this.skill.id}`;
    }
    buff.source = source;
    buff.updateId();
    if (buff.value) {
      buffs.push(buff);
    }
    return buffs;
  }

  public async updateByLevel(level: string = "") {
    if (!level) {
      level = this.level;
    } else {
      this.level = level;
    }
    if (!level) {
      return;
    }
    if (!this.name) {
      return;
    }
    if (!this._info?.attrs.length) {
      const resonatorStore = useResonatorStore();
      const info = await resonatorStore.getInfoByName(this.name);
      this._info = info;
    }
    this.hp = this._info.getHp(level);
    this.atk = this._info.getAtk(level);
    this.def = this._info.getDef(level);
  }

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
    this._info = info;
    this.element_en = info.element_en;
    this.element_zh_tw = info.element_zh_tw;
    this.weapon_zh_tw = info.weapon_zh_tw;

    // Base attr
    this.updateByLevel();

    // Stat bonus
    const stat_bonus = info.stat_bonus;
    Object.keys(stat_bonus).forEach((key: string) => {
      const value = (stat_bonus as any)[key];
      (this.stat_bonus as any)[key] = value;
    });
  }

  public updateSkillDmg(skill: any) {
    // Echo skill
    if (skill.dmg) {
      this.skill.dmg = skill.dmg;
      return;
    }

    // Resonator skill
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
    this.skill.level = level;
    this.skill.dmg = skill[`lv${level}`];
  }

  public updateSkill(skill: any = undefined) {
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
    if (skill.element) {
      this.skill.elment_zh_tw = skill.element;
      this.skill.bonus_types.push(skill.element);
    }
    if (skill.bonus_type) {
      this.skill.bonus_types.push(skill.bonus_type);
    }
    if (skill.coordinated) {
      this.skill.bonus_types.push(SkillBonusEnum.COORDINATED_ATTACK);
    }
    this.updateSkillDmg(skill);
  }

  public updateSkillById(id: string) {
    let item = this._info?.getDamageSkillItemById(id);
    if (!item) {
      item = getEchoDamageSkillItem(id);
    }
    if (!item) {
      return;
    }
    this.updateSkill(item.value);
  }
}
