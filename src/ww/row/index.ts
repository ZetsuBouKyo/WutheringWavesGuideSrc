import { BaseTypeEnum, BuffTypeEnum, ElementBonusEnum, RowBuffCategoryEnum } from "@/types/buff";
import { SkillAttrEnum } from "@/types/skill";

import { RowResonator } from "@/ww/row/resonator";
import { RowWeapon } from "@/ww/row/weapon";
import { RowEchoes } from "@/ww/row/echoes";
import { RowBuff } from "@/ww/row/buff";
import { RowBuffs, RowBuffSummary } from "@/ww/row/buffs";
import { RowMonster } from "@/ww/row/monster";

import { getNumber, md5 } from "@/ww/utils";

export class RowCalculationData {
  public resonator: RowResonator = new RowResonator();
  public weapon: RowWeapon = new RowWeapon();
  public echoes: RowEchoes = new RowEchoes();
  public buffs: RowBuffs = new RowBuffs();
  public monster: RowMonster = new RowMonster();
}

export class RowCalculationResultRegions {
  public base_attr: Array<RowBuff> = [];
  public base_attr_p: Array<RowBuff> = [];
  public base_attr_a: Array<RowBuff> = [];
  public skill_dmg_addition: Array<RowBuff> = [];
  public magnifier: Array<RowBuff> = [];
  public amplifier: Array<RowBuff> = [];
  public bonus: Array<RowBuff> = [];
  public crit_rate: Array<RowBuff> = [];
  public crit_dmg: Array<RowBuff> = [];
  public ignore_def: Array<RowBuff> = [];
  public reduce_res: Array<RowBuff> = [];

  public reset() {
    this.base_attr = [];
    this.base_attr_p = [];
    this.base_attr_a = [];
    this.skill_dmg_addition = [];
    this.magnifier = [];
    this.amplifier = [];
    this.bonus = [];
    this.crit_rate = [];
    this.crit_dmg = [];
    this.ignore_def = [];
    this.reduce_res = [];
  }
}

export class RowCalculationResult {
  public regions: RowCalculationResultRegions = new RowCalculationResultRegions();
}

export class RowCalculation {
  public id: string = "";
  public data: RowCalculationData = new RowCalculationData();
  public result: RowCalculationResult = new RowCalculationResult();

  constructor(resonator: RowResonator, weapon: RowWeapon, echoes: RowEchoes, buffs: RowBuffs, monster: RowMonster) {
    this.data.resonator = resonator;
    this.data.weapon = weapon;
    this.data.echoes = echoes;
    this.data.buffs = buffs;
    this.data.monster = monster;
  }

  public reset() {
    this.result.regions.reset();
  }

  public getBaseRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];

    // Crit rate
    const critRateBuff = new RowBuff();
    critRateBuff.category = RowBuffCategoryEnum.BASE;
    critRateBuff.source = RowBuffCategoryEnum.BASE;
    critRateBuff.type = BuffTypeEnum.CRIT_RATE;
    critRateBuff.value = "0.05";
    critRateBuff.stack = "1";
    critRateBuff.updateId();
    buffs.push(critRateBuff);

    // Crit dmg
    const critRateDmg = new RowBuff();
    critRateDmg.category = RowBuffCategoryEnum.BASE;
    critRateDmg.source = RowBuffCategoryEnum.BASE;
    critRateDmg.type = BuffTypeEnum.CRIT_DMG;
    critRateDmg.value = "1.5";
    critRateDmg.stack = "1";
    critRateDmg.updateId();
    buffs.push(critRateDmg);

    return buffs;
  }

  public getRowBuffs(): Array<RowBuff> {
    this.data.echoes.updateSummaryByEchoes();
    this.data.buffs.updateSummary();

    let baseResonatorRowBuffs: Array<RowBuff> = this.data.resonator.getBaseAttrs();
    let baseWeaponBuffs: Array<RowBuff> = [];
    if (this.data.resonator.skill.base_attr === SkillAttrEnum.ATK) {
      baseWeaponBuffs = this.data.weapon.getBaseAttrs();
    }

    const baseRowBuffs = this.getBaseRowBuffs();
    const monsterResRowBuffs = this.getMonsterResRowBuffs();

    // Resonator
    const resonatorRowBuffs = this.data.resonator.getRowBuffs();
    const resonatorSkillRowBuffs = this.data.resonator.getSkillRowBuffs();

    // Weapon
    const weaponRowBuffs = this.data.weapon.getRowBuffs();

    // Echoes
    const echoesRowBuffs = this.data.echoes.getRowBuffs();
    const sonataRowBuffs = this.data.echoes.getSonataRowBuffs();
    const echoPassiveSkillRowBuffs = this.data.echoes.getPassiveSkillRowBuffs();

    // Buffs
    const rowBuffs = this.data.buffs.getRowBuffs();

    return [
      ...baseRowBuffs,
      ...monsterResRowBuffs,
      ...baseResonatorRowBuffs,
      ...baseWeaponBuffs,
      ...resonatorRowBuffs,
      ...resonatorSkillRowBuffs,
      ...weaponRowBuffs,
      ...echoesRowBuffs,
      ...sonataRowBuffs,
      ...echoPassiveSkillRowBuffs,
      ...rowBuffs,
    ];
  }

  public getMonsterRes(): number {
    const element = this.data.resonator.skill.elment_zh_tw;
    let res: string | number;
    switch (element) {
      case ElementBonusEnum.GLACIO:
        res = this.data.monster.res_glacio;
        break;
      case ElementBonusEnum.FUSION:
        res = this.data.monster.res_fusion;
        break;
      case ElementBonusEnum.ELECTRO:
        res = this.data.monster.res_electro;
        break;
      case ElementBonusEnum.AERO:
        res = this.data.monster.res_aero;
        break;
      case ElementBonusEnum.SPECTRO:
        res = this.data.monster.res_spectro;
        break;
      case ElementBonusEnum.HAVOC:
        res = this.data.monster.res_havoc;
        break;
      default:
        res = "0.2";
        break;
    }
    return getNumber(res);
  }

  public getFinalMonsterRes(): number {
    const buffs = this.result.regions.reduce_res;
    let res: number | undefined;
    buffs.forEach((buff: RowBuff, i: number) => {
      const value = getNumber(buff.value) * getNumber(buff.stack);
      if (i === 0) {
        res = value;
      } else {
        if (!res) {
          res = getNumber(res);
        }
        res -= value;
      }
    });
    return getNumber(res);
  }

  public getMonsterResRowBuffs(): Array<RowBuff> {
    const buffs: Array<RowBuff> = [];
    const buff: RowBuff = new RowBuff();
    buff.category = RowBuffCategoryEnum.MONSTER;
    buff.source = this.data.monster.name;
    buff.type = BuffTypeEnum.REDUCE_RES;
    buff.value = this.getMonsterRes().toString();
    buff.stack = "1";
    buff.element = this.data.resonator.skill.elment_zh_tw;
    buff.updateId();
    buffs.push(buff);
    return buffs;
  }

  public updateId() {
    this.id = md5(JSON.stringify(this.data));
  }

  private updateRegions(rows: Array<RowBuff>) {
    const baseAttr = this.data.resonator.skill.base_attr;
    rows.forEach((row: RowBuff) => {
      const type = row.type;
      switch (type) {
        case BaseTypeEnum.ATTR:
          this.result.regions.base_attr.push(row);
          break;
        case BuffTypeEnum.SKILL_DMG_ADDITION:
          this.result.regions.skill_dmg_addition.push(row);
          break;
        case BuffTypeEnum.MAGNIFIER:
          this.result.regions.magnifier.push(row);
          break;
        case BuffTypeEnum.AMPLIFIER:
          this.result.regions.amplifier.push(row);
          break;
        case BuffTypeEnum.BONUS:
          if (!row.element && !row.skill_bonus_type) {
            this.result.regions.bonus.push(row);
            break;
          }
          if (row.element && row.skill_bonus_type) {
            throw new Error("`element` and `skill_bonus_type` should not have values at the same time.");
          }
          if (
            this.data.resonator.skill.bonus_types.includes(row.element) ||
            this.data.resonator.skill.bonus_types.includes(row.skill_bonus_type)
          ) {
            this.result.regions.bonus.push(row);
            break;
          }
          break;
        case BuffTypeEnum.HP_P:
          if (baseAttr === SkillAttrEnum.HP) {
            this.result.regions.base_attr_p.push(row);
          }
          break;
        case BuffTypeEnum.HP:
          if (baseAttr === SkillAttrEnum.HP) {
            this.result.regions.base_attr_a.push(row);
          }
          break;
        case BuffTypeEnum.ATK_P:
          if (baseAttr === SkillAttrEnum.ATK) {
            this.result.regions.base_attr_p.push(row);
          }
          break;
        case BuffTypeEnum.ATK:
          if (baseAttr === SkillAttrEnum.ATK) {
            this.result.regions.base_attr_a.push(row);
          }
          break;
        case BuffTypeEnum.DEF_P:
          if (baseAttr === SkillAttrEnum.DEF) {
            this.result.regions.base_attr_p.push(row);
          }
          break;
        case BuffTypeEnum.DEF:
          if (baseAttr === SkillAttrEnum.DEF) {
            this.result.regions.base_attr_a.push(row);
          }
          break;
        case BuffTypeEnum.CRIT_RATE:
          this.result.regions.crit_rate.push(row);
          break;
        case BuffTypeEnum.CRIT_DMG:
          this.result.regions.crit_dmg.push(row);
          break;
        case BuffTypeEnum.IGNORE_DEF:
          this.result.regions.ignore_def.push(row);
          break;
        case BuffTypeEnum.REDUCE_RES:
          this.result.regions.reduce_res.push(row);
          break;
        default:
          break;
      }
    });
  }

  public calculate() {
    this.updateId();
    const rows = this.getRowBuffs();
    this.updateRegions(rows);
    console.log(this.result.regions);
  }
}
