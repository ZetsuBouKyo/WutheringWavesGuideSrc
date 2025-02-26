import { AffixPolicyEnum } from "@/types/affix";
import { ElementBonusEnum, SkillBonusEnum, AbbrSkillBonusEnum, type TAbbrBonusEnum, StatBuffEnum } from "@/types/buff";
import { SkillAttrEnum } from "@/types/skill";

import { getAffixLabelByKey, getFixedMainAffixes, getMainAffixes } from "./echo";
import { RowEcho } from "./row/echo";
import { StatBuff } from "./buff";

export class RowAutoFillEchoes {
  public resonator: any;
  public weapon: any;
  public echoes: Array<RowEcho>;
  public sonatas: Array<string>;
  public affixPolicy: string;

  constructor(resonator: any, weapon: any, echoes: Array<RowEcho>, sonatas: Array<string>, affixPolicy: string) {
    this.resonator = resonator;
    this.weapon = weapon;
    this.echoes = echoes;
    this.sonatas = sonatas;
    this.affixPolicy = affixPolicy;

    if (echoes.length !== 5) {
      throw new Error("`echoStores` length must be exactly 5");
    }
  }

  private getBaseAbbr(): TAbbrBonusEnum {
    const baseAttr = this.resonator.data.base_attr;
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
    const critRate = parseFloat(this.weapon.data.stat_bonus.crit_rate);
    const critDmg = parseFloat(this.weapon.data.stat_bonus.crit_dmg);
    if (!critRate && critDmg) {
      return AbbrSkillBonusEnum.CRIT_RATE;
    }
    if (critRate && !critDmg) {
      return AbbrSkillBonusEnum.CRIT_DMG;
    }
    return AbbrSkillBonusEnum.CRIT_DMG;
  }

  private updateSubAffixesWithAffixes151(echo: RowEcho) {
    const baseAttr = this.resonator.data.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echo.sub_affix.hp = "270";
        echo.sub_affix.hp_p = "0.054";
        break;
      case SkillAttrEnum.DEF:
        echo.sub_affix.def = "30";
        echo.sub_affix.def_p = "0.068325";
        break;
      case SkillAttrEnum.ATK:
      default:
        echo.sub_affix.atk = "24";
        echo.sub_affix.atk_p = "0.054";
        break;
    }
    echo.sub_affix.crit_rate = "0.084";
    echo.sub_affix.crit_dmg = "0.1008";

    echo.sub_affix.bonus_resonance_skill = "0.016";
    echo.sub_affix.bonus_basic_attack = "0.016";
    echo.sub_affix.bonus_heavy_attack = "0.016";
    echo.sub_affix.bonus_resonance_liberation = "0.016";
  }

  private updateSubAffixesWithAffixes20Small(echo: RowEcho) {
    const baseAttr = this.resonator.data.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echo.sub_affix.hp = "450";
        echo.sub_affix.hp_p = "0.09";
        break;
      case SkillAttrEnum.DEF:
        echo.sub_affix.def = "50";
        echo.sub_affix.def_p = "0.113875";
        break;
      case SkillAttrEnum.ATK:
      default:
        echo.sub_affix.atk = "40";
        echo.sub_affix.atk_p = "0.09";
        break;
    }
    echo.sub_affix.crit_rate = "0.084";
    echo.sub_affix.crit_dmg = "0.168";
  }

  private updateSubAffixesWithAffixes20SkillBonus(echo: RowEcho) {
    const baseAttr = this.resonator.data.base_attr;
    switch (baseAttr) {
      case SkillAttrEnum.HP:
        echo.sub_affix.hp_p = "0.09";
        break;
      case SkillAttrEnum.DEF:
        echo.sub_affix.def_p = "0.113875";
        break;
      case SkillAttrEnum.ATK:
      default:
        echo.sub_affix.atk_p = "0.09";
        break;
    }
    echo.sub_affix.crit_rate = "0.084";
    echo.sub_affix.crit_dmg = "0.168";

    const mainSkillBonus = this.resonator.data.main_skill_bonus;
    switch (mainSkillBonus) {
      case SkillBonusEnum.SKILL:
        echo.sub_affix.bonus_resonance_skill = "0.09";
        break;
      case SkillBonusEnum.BASIC:
        echo.sub_affix.bonus_basic_attack = "0.09";
        break;
      case SkillBonusEnum.HEAVY:
        echo.sub_affix.bonus_heavy_attack = "0.09";
        break;
      case SkillBonusEnum.LIBERATION:
        echo.sub_affix.bonus_resonance_liberation = "0.09";
        break;
      default:
        break;
    }
  }

  private updateBase() {
    this.echoes.forEach((echo: RowEcho, i: number) => {
      // Reset
      echo.resetMainAffix();
      echo.resetSubAffix();

      // Sonata
      if (this.sonatas.length > 0) {
        if (this.sonatas.length !== 5) {
          throw new Error("`sonatas` length must be exactly 5");
        }
        echo.sonata = this.sonatas[i];
      }

      // Sub affixes
      switch (this.affixPolicy) {
        case AffixPolicyEnum.AFFIXES_15_1:
          this.updateSubAffixesWithAffixes151(echo);
          break;
        case AffixPolicyEnum.AFFIXES_20_SMALL:
          this.updateSubAffixesWithAffixes20Small(echo);
          break;
        case AffixPolicyEnum.AFFIXES_20_SKILL_BONUS:
          this.updateSubAffixesWithAffixes20SkillBonus(echo);
          break;
        default:
          break;
      }
    });
  }

  private updateFixedMainAffix(echo: RowEcho, cost: string) {
    const fixedMainAffixes = getFixedMainAffixes(cost);
    for (const [buff, value] of Object.entries(fixedMainAffixes)) {
      (echo.main_affix as any)[buff] = value;
      echo._fixed_main_affix_key = buff;
    }
  }

  private updateMainAffixItem(echo: RowEcho, key: string) {
    echo._main_affix_item = {
      title: getAffixLabelByKey(key),
      value: key,
    };
  }

  private updateCost4MainAffixes(echo: RowEcho, abbr: TAbbrBonusEnum) {
    const cost = "4";
    echo.cost = cost;

    this.updateFixedMainAffix(echo, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echo.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echo, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echo.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echo, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echo.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echo, "def_p");
        break;
      case AbbrSkillBonusEnum.BONUS_HEALING:
        echo.main_affix.bonus_healing = mainAffixes.bonus_healing;
        this.updateMainAffixItem(echo, "bonus_healing");
        break;
      case AbbrSkillBonusEnum.CRIT_RATE:
        echo.main_affix.crit_rate = mainAffixes.crit_rate;
        this.updateMainAffixItem(echo, "crit_rate");
        break;
      case AbbrSkillBonusEnum.CRIT_DMG:
      default:
        echo.main_affix.crit_dmg = mainAffixes.crit_dmg;
        this.updateMainAffixItem(echo, "crit_dmg");
        break;
    }
  }

  private updateCost3MainAffixes(echo: RowEcho, abbr: TAbbrBonusEnum) {
    const cost = "3";
    echo.cost = cost;

    this.updateFixedMainAffix(echo, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echo.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echo, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echo.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echo, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echo.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echo, "def_p");
        break;
      case AbbrSkillBonusEnum.ENERGY_REGEN:
        echo.main_affix.energy_regen = mainAffixes.energy_regen;
        this.updateMainAffixItem(echo, "energy_regen");
        break;
      case ElementBonusEnum.GLACIO:
        echo.main_affix.bonus_glacio = mainAffixes.bonus_glacio;
        this.updateMainAffixItem(echo, "bonus_glacio");
        break;
      case ElementBonusEnum.FUSION:
        echo.main_affix.bonus_fusion = mainAffixes.bonus_fusion;
        this.updateMainAffixItem(echo, "bonus_fusion");
        break;
      case ElementBonusEnum.ELECTRO:
        echo.main_affix.bonus_electro = mainAffixes.bonus_electro;
        this.updateMainAffixItem(echo, "bonus_electro");
        break;
      case ElementBonusEnum.AERO:
        echo.main_affix.bonus_aero = mainAffixes.bonus_aero;
        this.updateMainAffixItem(echo, "bonus_aero");
        break;
      case ElementBonusEnum.SPECTRO:
        echo.main_affix.bonus_spectro = mainAffixes.bonus_spectro;
        this.updateMainAffixItem(echo, "bonus_spectro");
        break;
      case ElementBonusEnum.HAVOC:
        echo.main_affix.bonus_havoc = mainAffixes.bonus_havoc;
        this.updateMainAffixItem(echo, "bonus_havoc");
        break;
      default:
        break;
    }
  }

  private updateCost1MainAffixes(echo: RowEcho, abbr: TAbbrBonusEnum) {
    const cost = "1";
    echo.cost = cost;

    this.updateFixedMainAffix(echo, cost);
    const mainAffixes = getMainAffixes(cost);

    switch (abbr) {
      case AbbrSkillBonusEnum.HP:
        echo.main_affix.hp_p = mainAffixes.hp_p;
        this.updateMainAffixItem(echo, "hp_p");
        break;
      case AbbrSkillBonusEnum.ATK:
        echo.main_affix.atk_p = mainAffixes.atk_p;
        this.updateMainAffixItem(echo, "atk_p");
        break;
      case AbbrSkillBonusEnum.DEF:
        echo.main_affix.def_p = mainAffixes.def_p;
        this.updateMainAffixItem(echo, "def_p");
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
    if (!this.affixPolicy || this.echoes.length === 0) {
      return;
    }
    if (!abbr1) {
      abbr1 = this.getCritAttr();
    }
    if (!abbr2) {
      abbr2 = this.resonator.data.element_zh_tw;
    }
    if (!abbr3) {
      abbr3 = this.resonator.data.element_zh_tw;
    }
    if (!abbr4) {
      abbr4 = this.getBaseAbbr();
    }
    if (!abbr5) {
      abbr5 = this.getBaseAbbr();
    }

    this.updateBase();
    this.updateCost4MainAffixes(this.echoes[0], abbr1);
    this.updateCost3MainAffixes(this.echoes[1], abbr2);
    this.updateCost3MainAffixes(this.echoes[2], abbr3);
    this.updateCost1MainAffixes(this.echoes[3], abbr4);
    this.updateCost1MainAffixes(this.echoes[4], abbr5);
  }

  public update43311With2Elem() {
    const attr = this.resonator.data.base_attr;
    const element = this.resonator.data.element_zh_tw;
  }

  public update43311With1Elem1Attr() {
    const element = this.resonator.data.element_zh_tw;
  }

  public update43311With2Attr() {}

  public update43311With2EnergyRegen() {}

  public update43311With1EnergyRegen1Elem() {
    const element = this.resonator.data.element_zh_tw;
  }

  public update43311With1EnergyRegen1Attr() {}
}
