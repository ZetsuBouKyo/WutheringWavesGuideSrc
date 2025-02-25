import { type IStatBuff } from "./buff";

export interface IRowResonatorSkill {
  id: string;
  type: string;
  bonus_types: Array<string>;
  dmg: string;
}

export interface IRowResonator {
  id: string;
  no: string;
  name: string;
  level: string;
  chain: string;
  hp: string;
  atk: string;
  def: string;
  normal_attack_lv: string;
  resonance_skill_lv: string;
  forte_circuit_lv: string;
  resonance_liberation_lv: string;
  intro_skill_lv: string;
  inherent_skill_1: boolean;
  inherent_skill_2: boolean;
  stat_bonus: IStatBuff;
  skill: IRowResonatorSkill;
}

export enum ResonatorBaseAttrEnum {
  HP = "生命",
  ATK = "攻擊",
  DEF = "防禦",
}
