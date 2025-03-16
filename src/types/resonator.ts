import { type IStatBuff } from "@/types/buff";
import { SkillTypeEnum } from "@/types/skill";
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

export const ResonatorInfoEnum = {
  ...SkillTypeEnum,
  INHERENT_SKILL_1: "固有技能1",
  INHERENT_SKILL_2: "固有技能2",
  CHAIN1: "共鳴鏈1",
  CHAIN2: "共鳴鏈2",
  CHAIN3: "共鳴鏈3",
  CHAIN4: "共鳴鏈4",
  CHAIN5: "共鳴鏈5",
  CHAIN6: "共鳴鏈6",
} as const;
export type TResonatorInfoEnum = (typeof ResonatorInfoEnum)[keyof typeof ResonatorInfoEnum] | string;
