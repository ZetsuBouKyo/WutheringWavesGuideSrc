export enum BuffTypeEnum {
  SKILL_DMG_ADDITION = "招式倍率",
  MAGNIFIER = "倍率",
  AMPLIFIER = "加深",
  BONUS = "加成",
  HP_P = "生命百分比",
  HP = "生命",
  ATK_P = "攻擊百分比",
  ATK = "攻擊",
  DEF_P = "防禦百分比",
  DEF = "防禦",
  CRIT_RATE = "暴擊",
  CRIT_DMG = "暴擊傷害",
  IGNORE_DEF = "忽視防禦",
  REDUCE_RES = "抗性降低",
}

export enum ElementBonusEnum {
  GLACIO = "冷凝",
  FUSION = "熱熔",
  ELECTRO = "導電",
  AERO = "氣動",
  SPECTRO = "衍射",
  HAVOC = "湮滅",
}

export enum SkillBonusEnum {
  BASIC = "普攻",
  HEAVY = "重擊",
  SKILL = "共鳴技能",
  LIBERATION = "共鳴解放",
  INTRO = "變奏",
  OUTRO = "延奏",
  ECHO = "聲骸",
  COORDINATED_ATTACK = "協同攻擊",
  NONE = "無",
}

const BonusEnum = { ...ElementBonusEnum, ...SkillBonusEnum };

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
