export const BaseTypeEnum = {
  ATTR: "基礎屬性",
} as const;

export const BuffTypeKeyEnum = {
  SKILL_DMG_ADDITION: "skill_dmg_addition",
  MAGNIFIER: "magnifier",
  AMPLIFIER: "amplifier",
  BONUS: "bonus",
  HP_P: "hp_p",
  HP: "hp",
  ATK_P: "atk_p",
  ATK: "atk",
  DEF_P: "def_p",
  DEF: "def",
  CRIT_RATE: "crit_rate",
  CRIT_DMG: "crit_dmg",
  IGNORE_DEF: "ignore_def",
  REDUCE_RES: "reduce_res",
} as const;

export const BuffTypeEnum = {
  SKILL_DMG_ADDITION: "招式倍率",
  MAGNIFIER: "倍率",
  AMPLIFIER: "加深",
  BONUS: "加成",
  HP_P: "生命百分比",
  HP: "生命",
  ATK_P: "攻擊百分比",
  ATK: "攻擊",
  DEF_P: "防禦百分比",
  DEF: "防禦",
  CRIT_RATE: "暴擊",
  CRIT_DMG: "暴擊傷害",
  IGNORE_DEF: "忽視防禦",
  REDUCE_RES: "抗性降低",
} as const;
export type TBuffTypeEnum = (typeof BuffTypeEnum)[keyof typeof BuffTypeEnum] | string;

export const ElementBonusEnum = {
  GLACIO: "冷凝",
  FUSION: "熱熔",
  ELECTRO: "導電",
  AERO: "氣動",
  SPECTRO: "衍射",
  HAVOC: "湮滅",
} as const;
export type TElementBonusEnum = (typeof ElementBonusEnum)[keyof typeof ElementBonusEnum] | string;

export const SkillBonusEnum = {
  BASIC: "普攻",
  HEAVY: "重擊",
  SKILL: "共鳴技能",
  LIBERATION: "共鳴解放",
  INTRO: "變奏",
  OUTRO: "延奏",
  ECHO: "聲骸",
  COORDINATED_ATTACK: "協同攻擊",
  NONE: "無",
} as const;
export type TSkillBonusEnum = (typeof SkillBonusEnum)[keyof typeof SkillBonusEnum] | string;

export const BonusEnum = { ...ElementBonusEnum, ...SkillBonusEnum } as const;

export const AbbrSkillBonusEnum = {
  HP: "生",
  ATK: "攻",
  DEF: "防",
  CRIT_RATE: "暴",
  CRIT_DMG: "暴傷",
  ENERGY_REGEN: "共效",
  BONUS_RESONANCE_SKILL: "共技",
  BONUS_BASIC_ATTACK: "普",
  BONUS_HEAVY_ATTACK: "重",
  BONUS_RESONANCE_LIBERATION: "共解",
  BONUS_HEALING: "治",
} as const;

export const AbbrBonusEnum = { ...AbbrSkillBonusEnum, ...ElementBonusEnum } as const;
export type TAbbrBonusEnum = (typeof AbbrBonusEnum)[keyof typeof AbbrBonusEnum] | string;

export interface IStatBuff {
  crit_rate: string;
  crit_dmg: string;

  hp_p: string;
  atk_p: string;
  def_p: string;
  energy_regen: string;

  bonus_physics: string;
  bonus_glacio: string;
  bonus_fusion: string;
  bonus_electro: string;
  bonus_aero: string;
  bonus_spectro: string;
  bonus_havoc: string;

  bonus_resonance_skill: string;
  bonus_basic_attack: string;
  bonus_heavy_attack: string;
  bonus_resonance_liberation: string;
  bonus_healing: string;
}

export const StatBuffEnum = {
  CRIT_RATE: "crit_rate",
  CRIT_DMG: "crit_dmg",

  HP: "hp",
  HP_P: "hp_p",
  ATK: "atk",
  ATK_P: "atk_p",
  DEF: "def",
  DEF_P: "def_p",
  ENERGY_REGEN: "energy_regen",

  BONUS_PHYSICS: "bonus_physics",
  BONUS_GLACIO: "bonus_glacio",
  BONUS_FUSION: "bonus_fusion",
  BONUS_ELECTRO: "bonus_electro",
  BONUS_AERO: "bonus_aero",
  BONUS_SPECTRO: "bonus_spectro",
  BONUS_HAVOC: "bonus_havoc",

  BONUS_RESONANCE_SKILL: "bonus_resonance_skill",
  BONUS_BASIC_ATTACK: "bonus_basic_attack",
  BONUS_HEAVY_ATTACK: "bonus_heavy_attack",
  BONUS_RESONANCE_LIBERATION: "bonus_resonance_liberation",
  BONUS_HEALING: "bonus_healing",
} as const;
export type TStatBuffEnum = (typeof StatBuffEnum)[keyof typeof StatBuffEnum] | string;

export const StatBuffZhTwEnum = {
  CRIT_RATE: "暴擊",
  CRIT_DMG: "暴擊傷害",

  HP: "生命",
  HP_P: "生命百分比",
  ATK: "攻擊",
  ATK_P: "攻擊百分比",
  DEF: "防禦",
  DEF_P: "防禦百分比",
  ENERGY_REGEN: "共鳴效率",

  BONUS_PHYSICS: "物理傷害加成",
  BONUS_GLACIO: "冷凝傷害加成",
  BONUS_FUSION: "熱熔傷害加成",
  BONUS_ELECTRO: "導電傷害加成",
  BONUS_AERO: "氣動傷害加成",
  BONUS_SPECTRO: "衍射傷害加成",
  BONUS_HAVOC: "湮滅傷害加成",

  BONUS_RESONANCE_SKILL: "共鳴技能傷害加成",
  BONUS_BASIC_ATTACK: "普攻傷害加成",
  BONUS_HEAVY_ATTACK: "重擊傷害加成",
  BONUS_RESONANCE_LIBERATION: "共鳴解放傷害加成",
  BONUS_HEALING: "治療效果加成",
} as const;
export type TStatBuffZhTwEnum = (typeof StatBuffZhTwEnum)[keyof typeof StatBuffZhTwEnum] | string;

// Parameters used to determine how tooltips are retrieved.
export const RowBuffCategoryEnum = {
  BASE: "基礎",
  ATTR: BaseTypeEnum.ATTR,
  RESONATOR: "共鳴者",
  WEAPON: "武器",
  ECHO: "聲骸",
  MONSTER: "怪物",
  SONATA: "合鳴",
  STAT: "屬性加成",
  // BUFF
  MANUAL: "手動",
} as const;
export type TRowBuffCategoryEnum = (typeof RowBuffCategoryEnum)[keyof typeof RowBuffCategoryEnum] | string;

export const RowBuffSourceEnum = {
  // Weapon
  PASSIVE: "被動",
  TUNE: "諧振",
  // Echos
  MAIN_SLOT: "首位裝配",
  MAIN_AFFIX: "主詞條",
  SUB_AFFIX: "副詞條",
} as const;
