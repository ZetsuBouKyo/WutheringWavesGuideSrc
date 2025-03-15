export const SkillAttrEnum = {
  HP: "生命",
  ATK: "攻擊",
  DEF: "防禦",
} as const;
export type TSkillAttrEnum = (typeof SkillAttrEnum)[keyof typeof SkillAttrEnum] | string;

export const SkillTypeEnum = {
  NORMAL_ATTACK: "常態攻擊",
  RESONANCE_SKILL: "共鳴技能",
  FORTE_CIRCUIT: "共鳴回路",
  RESONANCE_LIBERATION: "共鳴解放",
  INTRO_SKILL: "變奏技能",
  OUTRO_SKILL: "延奏技能",
} as const;
export type TSkillTypeEnum = (typeof SkillTypeEnum)[keyof typeof SkillTypeEnum] | string;
