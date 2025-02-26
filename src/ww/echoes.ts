import { AffixPolicyEnum } from "@/types/affix";
import { ElementBonusEnum, SkillBonusEnum, AbbrSkillBonusEnum, type TAbbrBonusEnum } from "@/types/buff";
import { SkillAttrEnum } from "@/types/skill";

import { getAffixLabelByKey, getFixedMainAffixes, getMainAffixes } from "./echo";

export class RowAutoFillEchoes {
  public resonator: any;
  public weapon: any;
  public echoStores: Array<any>;
  public sonatas: Array<string>;
  public affixPolicy: string;

  constructor(resonator: any, weapon: any, echoStores: any, sonatas: Array<string>, affixPolicy: string) {
    this.resonator = resonator;
    this.weapon = weapon;
    this.echoStores = echoStores;
    this.sonatas = sonatas;
    this.affixPolicy = affixPolicy;

    if (echoStores.length !== 5) {
      throw new Error("`echoStores` length must be exactly 5");
    }
  }

  private getBaseAbbr(): TAbbrBonusEnum {
    const baseAttr = this.resonator.base_attr;
    let abbr: TAbbrBonusEnum;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        abbr = AbbrSkillBonusEnum.HP;
        break;
      case SkillAttrEnum.DEF:
        abbr = AbbrSkillBonusEnum.DEF;
        break;
      case SkillAttrEnum.ATK:
      default:
        abbr = AbbrSkillBonusEnum.ATK;
        break;
    }
    return abbr;
  }

  private getCritAttr(): TAbbrBonusEnum {
    const critRate = parseFloat(this.weapon.stat_bonus.crit_rate);
    const critDmg = parseFloat(this.weapon.stat_bonus.crit_dmg);
    if (!critRate && critDmg) {
      return AbbrSkillBonusEnum.CRIT_RATE;
    }
    if (critRate && !critDmg) {
      return AbbrSkillBonusEnum.CRIT_DMG;
    }
    return AbbrSkillBonusEnum.CRIT_DMG;
  }

  private updateSubAffixesWithAffixes151(echoStore: any) {
    const baseAttr = this.resonator.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echoStore.sub_affix.hp = "270";
        echoStore.sub_affix.hp_p = "0.054";
        break;
      case SkillAttrEnum.DEF:
        echoStore.sub_affix.def = "30";
        echoStore.sub_affix.def_p = "0.068325";
        break;
      case SkillAttrEnum.ATK:
      default:
        echoStore.sub_affix.atk = "24";
        echoStore.sub_affix.atk_p = "0.054";
        break;
    }
    echoStore.sub_affix.crit_rate = "0.084";
    echoStore.sub_affix.crit_dmg = "0.1008";

    echoStore.sub_affix.bonus_resonance_skill = "0.016";
    echoStore.sub_affix.bonus_basic_attack = "0.016";
    echoStore.sub_affix.bonus_heavy_attack = "0.016";
    echoStore.sub_affix.bonus_resonance_liberation = "0.016";
  }

  private updateSubAffixesWithAffixes20Small(echoStore: any) {
    const baseAttr = this.resonator.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echoStore.sub_affix.hp = "450";
        echoStore.sub_affix.hp_p = "0.09";
        break;
      case SkillAttrEnum.DEF:
        echoStore.sub_affix.def = "50";
        echoStore.sub_affix.def_p = "0.113875";
        break;
      case SkillAttrEnum.ATK:
      default:
        echoStore.sub_affix.atk = "40";
        echoStore.sub_affix.atk_p = "0.09";
        break;
    }
    echoStore.sub_affix.crit_rate = "0.084";
    echoStore.sub_affix.crit_dmg = "0.168";
  }

  private updateSubAffixesWithAffixes20SkillBonus(echoStore: any) {
    const baseAttr = this.resonator.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echoStore.sub_affix.hp_p = "0.09";
        break;
      case SkillAttrEnum.DEF:
        echoStore.sub_affix.def_p = "0.113875";
        break;
      case SkillAttrEnum.ATK:
      default:
        echoStore.sub_affix.atk_p = "0.09";
        break;
    }
    echoStore.sub_affix.crit_rate = "0.084";
    echoStore.sub_affix.crit_dmg = "0.168";

    const mainSkillBonus = this.resonator.main_skill_bonus;
    switch (mainSkillBonus) {
      case SkillBonusEnum.SKILL:
        echoStore.sub_affix.bonus_resonance_skill = "0.09";
        break;
      case SkillBonusEnum.BASIC:
        echoStore.sub_affix.bonus_basic_attack = "0.09";
        break;
      case SkillBonusEnum.HEAVY:
        echoStore.sub_affix.bonus_heavy_attack = "0.09";
        break;
      case SkillBonusEnum.LIBERATION:
        echoStore.sub_affix.bonus_resonance_liberation = "0.09";
        break;
      default:
        break;
    }
  }

  private updateBase() {
    this.echoStores.forEach((echoStore: any, i: number) => {
      // Reset
      echoStore.resetMainAffix();
      echoStore.resetSubAffix();

      // Sonata
      if (this.sonatas.length > 0) {
        if (this.sonatas.length !== 5) {
          throw new Error("`sonatas` length must be exactly 5");
        }
        echoStore.sonata = this.sonatas[i];
      }

      // Sub affixes
      switch (this.affixPolicy) {
        case AffixPolicyEnum.AFFIXES_15_1:
          this.updateSubAffixesWithAffixes151(echoStore);
          break;
        case AffixPolicyEnum.AFFIXES_20_SMALL:
          this.updateSubAffixesWithAffixes20Small(echoStore);
          break;
        case AffixPolicyEnum.AFFIXES_20_SKILL_BONUS:
          this.updateSubAffixesWithAffixes20SkillBonus(echoStore);
          break;
        default:
          break;
      }
    });
  }

  private updateFixedMainAffix(echoStore: any, cost: string) {
    const fixedMainAffixes = getFixedMainAffixes(cost);
    for (const [buff, value] of Object.entries(fixedMainAffixes)) {
      echoStore.main_affix[buff] = value;
      echoStore._fixed_main_affix_key = buff;
    }
  }

  private updateMainAffixItem(echoStore: any, key: string) {
    echoStore._main_affix_item = {
      title: getAffixLabelByKey(key),
      value: key,
    };
  }

  private updateCost4MainAffixes(echoStore: any, abbr: TAbbrBonusEnum) {
    const cost = "4";
    echoStore.cost = cost;

    this.updateFixedMainAffix(echoStore, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echoStore.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echoStore, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echoStore.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echoStore, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echoStore.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echoStore, "def_p");
        break;
      case AbbrSkillBonusEnum.BONUS_HEALING:
        echoStore.main_affix.bonus_healing = mainAffixes.bonus_healing;
        this.updateMainAffixItem(echoStore, "bonus_healing");
        break;
      case AbbrSkillBonusEnum.CRIT_RATE:
        echoStore.main_affix.crit_rate = mainAffixes.crit_rate;
        this.updateMainAffixItem(echoStore, "crit_rate");
        break;
      case AbbrSkillBonusEnum.CRIT_DMG:
      default:
        echoStore.main_affix.crit_dmg = mainAffixes.crit_dmg;
        this.updateMainAffixItem(echoStore, "crit_dmg");
        break;
    }
  }

  private updateCost3MainAffixes(echoStore: any, abbr: TAbbrBonusEnum) {
    const cost = "3";
    echoStore.cost = cost;

    this.updateFixedMainAffix(echoStore, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echoStore.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echoStore, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echoStore.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echoStore, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echoStore.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echoStore, "def_p");
        break;
      case AbbrSkillBonusEnum.ENERGY_REGEN:
        echoStore.main_affix.energy_regen = mainAffixes.energy_regen;
        this.updateMainAffixItem(echoStore, "energy_regen");
        break;
      case ElementBonusEnum.GLACIO:
        echoStore.main_affix.bonus_glacio = mainAffixes.bonus_glacio;
        this.updateMainAffixItem(echoStore, "bonus_glacio");
        break;
      case ElementBonusEnum.FUSION:
        echoStore.main_affix.bonus_fusion = mainAffixes.bonus_fusion;
        this.updateMainAffixItem(echoStore, "bonus_fusion");
        break;
      case ElementBonusEnum.ELECTRO:
        echoStore.main_affix.bonus_electro = mainAffixes.bonus_electro;
        this.updateMainAffixItem(echoStore, "bonus_electro");
        break;
      case ElementBonusEnum.AERO:
        echoStore.main_affix.bonus_aero = mainAffixes.bonus_aero;
        this.updateMainAffixItem(echoStore, "bonus_aero");
        break;
      case ElementBonusEnum.SPECTRO:
        echoStore.main_affix.bonus_spectro = mainAffixes.bonus_spectro;
        this.updateMainAffixItem(echoStore, "bonus_spectro");
        break;
      case ElementBonusEnum.HAVOC:
        echoStore.main_affix.bonus_havoc = mainAffixes.bonus_havoc;
        this.updateMainAffixItem(echoStore, "bonus_havoc");
        break;
      default:
        break;
    }
  }

  private updateCost1MainAffixes(echoStore: any, abbr: TAbbrBonusEnum) {
    const cost = "1";
    echoStore.cost = cost;

    this.updateFixedMainAffix(echoStore, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echoStore.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echoStore, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echoStore.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echoStore, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echoStore.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echoStore, "def_p");
        break;
      default:
        break;
    }
  }

  public update43311(
    abbr1: TAbbrBonusEnum = "",
    abbr2: TAbbrBonusEnum = "",
    abbr3: TAbbrBonusEnum = "",
    abbr4: TAbbrBonusEnum = "",
    abbr5: TAbbrBonusEnum = "",
  ) {
    if (!abbr1) {
      abbr1 = this.getCritAttr();
    }
    if (!abbr2) {
      abbr2 = this.resonator.element_zh_tw;
    }
    if (!abbr3) {
      abbr3 = this.resonator.element_zh_tw;
    }
    if (!abbr4) {
      abbr4 = this.getBaseAbbr();
    }
    if (!abbr5) {
      abbr5 = this.getBaseAbbr();
    }

    this.updateBase();
    this.updateCost4MainAffixes(this.echoStores[0], abbr1);
    this.updateCost3MainAffixes(this.echoStores[1], abbr2);
    this.updateCost3MainAffixes(this.echoStores[2], abbr3);
    this.updateCost1MainAffixes(this.echoStores[3], abbr4);
    this.updateCost1MainAffixes(this.echoStores[4], abbr5);
  }

  public update43311With2Elem() {
    const attr = this.resonator.base_attr;
    const element = this.resonator.element_zh_tw;
  }

  public update43311With1Elem1Attr() {
    const element = this.resonator.element_zh_tw;
  }

  public update43311With2Attr() {}

  public update43311With2EnergyRegen() {}

  public update43311With1EnergyRegen1Elem() {
    const element = this.resonator.element_zh_tw;
  }

  public update43311With1EnergyRegen1Attr() {}
}
