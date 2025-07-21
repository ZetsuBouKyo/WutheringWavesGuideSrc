import { type IStatBuff } from "./buff";

export interface IRowWeapon {
  no: string;
  name: string;
  star: string;
  type: string;
  level: string;
  tune: string;
  atk: string;
  stat_bonus: IStatBuff;
  passive_stat_bonus: IStatBuff;
}

export interface IWeaponPassiveBuff {
  crit_rate?: string;
  crit_dmg?: string;

  hp_p?: string;
  atk_p?: string;
  def_p?: string;
  energy_regen?: string;

  bonus_physics?: string;
  bonus_glacio?: string;
  bonus_fusion?: string;
  bonus_electro?: string;
  bonus_aero?: string;
  bonus_spectro?: string;
  bonus_havoc?: string;

  bonus_resonance_skill?: string;
  bonus_basic_attack?: string;
  bonus_heavy_attack?: string;
  bonus_resonance_liberation?: string;
  bonus_healing?: string;
}

export interface IWeaponPassiveInfo {
  name: string;
  description: string;
  passive_buffs: Array<IWeaponPassiveBuff>;
}

export interface IWeaponAttr {
  lv: string;
  atk: string;

  crit_rate?: string;
  crit_dmg?: string;

  hp_p?: string;
  atk_p?: string;
  def_p?: string;
  energy_regen?: string;
}

export interface IWeaponInfo {
  no: string;
  name: string;
  star: string;
  type: string;
  passive: IWeaponPassiveInfo;
  attrs: Array<IWeaponAttr>;
}
