import Decimal from "decimal.js";

import { StatBuffEnum } from "@/types/buff";

import { useResonatorStore } from "@/stores/resonator";

import { Template, TemplateCalculationResonator } from "@/ww/template";
import { RowCalculationResult } from "@/ww/row";
import { ResonatorModel, ResonatorModels } from "@/ww/resonator";
import { getNestedValue, toNumberString, toPercentageString, md5 } from "@/ww/utils";

export interface IBar {
  text: string;
  dps?: number;
  dpsString?: string;
  damage?: number;
  damageString?: string;
  percentage: number;
  percentageString: string;
  data?: any;
}

function sortBars(barhA: any, barhB: any) {
  const damageA = barhA.damage;
  const damageB = barhB.damage;
  if (!damageA || !damageB) {
    return 0;
  }
  return damageB - damageA;
}

function getResonatorModel(resonator: TemplateCalculationResonator): ResonatorModel {
  const resonatorModel = new ResonatorModel();
  resonatorModel.element = resonator.resonator.element_zh_tw;
  resonatorModel.name = resonator.resonator.name;
  resonatorModel.chain = resonator.resonator.chain;
  resonatorModel.weapon_name = resonator.weapon.name;
  resonatorModel.weapon_rank = resonator.weapon.tune;
  resonatorModel.weapon_level = resonator.weapon.level;
  resonatorModel.level = resonator.resonator.level;
  resonatorModel.hp = resonator.getHp();
  resonatorModel.attack = resonator.getAtk();
  resonatorModel.defense = resonator.getDef();
  resonatorModel.crit_rate = resonator.getCritRate();
  resonatorModel.crit_dmg = resonator.getCritDmg();
  resonatorModel.energy_regen = resonator.getEnergyRegen();
  resonatorModel.resonance_skill_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_RESONANCE_SKILL));
  resonatorModel.basic_attack_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_BASIC_ATTACK));
  resonatorModel.heavy_attack_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_HEAVY_ATTACK));
  resonatorModel.resonance_liberation_dmg_bonus = toPercentageString(
    resonator.getStat(StatBuffEnum.BONUS_RESONANCE_LIBERATION),
  );
  resonatorModel.healing_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_HEALING));
  resonatorModel.physical_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_PHYSICS));
  resonatorModel.glacio_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_GLACIO));
  resonatorModel.fusion_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_FUSION));
  resonatorModel.electro_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_ELECTRO));
  resonatorModel.aero_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_AERO));
  resonatorModel.spectro_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_SPECTRO));
  resonatorModel.havoc_dmg_bonus = toPercentageString(resonator.getStat(StatBuffEnum.BONUS_HAVOC));
  resonatorModel.physical_dmg_res = toPercentageString(0);
  resonatorModel.glacio_dmg_res = toPercentageString(0);
  resonatorModel.fusion_dmg_res = toPercentageString(0);
  resonatorModel.electro_dmg_res = toPercentageString(0);
  resonatorModel.aero_dmg_res = toPercentageString(0);
  resonatorModel.spectro_dmg_res = toPercentageString(0);
  resonatorModel.havoc_dmg_res = toPercentageString(0);
  resonatorModel.normal_attack_lv = resonator.resonator.normal_attack_lv;
  resonatorModel.resonance_skill_lv = resonator.resonator.resonance_skill_lv;
  resonatorModel.resonance_liberation_lv = resonator.resonator.resonance_liberation_lv;
  resonatorModel.forte_circuit_lv = resonator.resonator.forte_circuit_lv;
  resonatorModel.intro_skill_lv = resonator.resonator.intro_skill_lv;
  resonatorModel.inherent_skill_1 = resonator.resonator.inherent_skill_1 ? "✓" : "x";
  resonatorModel.inherent_skill_2 = resonator.resonator.inherent_skill_2 ? "✓" : "x";

  resonatorModel.echo_hp = toNumberString(resonator.echoes.summary.getStat(StatBuffEnum.HP));
  resonatorModel.echo_hp_p = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.HP_P));
  resonatorModel.echo_atk = toNumberString(resonator.echoes.summary.getStat(StatBuffEnum.ATK));
  resonatorModel.echo_atk_p = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.ATK_P));
  resonatorModel.echo_def = toNumberString(resonator.echoes.summary.getStat(StatBuffEnum.DEF));
  resonatorModel.echo_def_p = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.DEF_P));

  resonatorModel.echo_crit_rate = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.CRIT_RATE));
  resonatorModel.echo_crit_dmg = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.CRIT_DMG));
  resonatorModel.echo_energy_regen = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.ENERGY_REGEN));
  resonatorModel.echo_sonata_1 = resonator.echoes.echoes[0].sonata;
  resonatorModel.echo_sonata_2 = resonator.echoes.echoes[1].sonata;
  resonatorModel.echo_sonata_3 = resonator.echoes.echoes[2].sonata;
  resonatorModel.echo_sonata_4 = resonator.echoes.echoes[3].sonata;
  resonatorModel.echo_sonata_5 = resonator.echoes.echoes[4].sonata;
  resonatorModel.echo_resonance_skill_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_RESONANCE_SKILL),
  );
  resonatorModel.echo_basic_attack_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_BASIC_ATTACK),
  );
  resonatorModel.echo_heavy_attack_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_HEAVY_ATTACK),
  );
  resonatorModel.echo_resonance_liberation_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_RESONANCE_LIBERATION),
  );
  resonatorModel.echo_healing_bonus = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.BONUS_HEALING));
  resonatorModel.echo_glacio_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_GLACIO),
  );
  resonatorModel.echo_fusion_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_FUSION),
  );
  resonatorModel.echo_electro_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_ELECTRO),
  );
  resonatorModel.echo_aero_dmg_bonus = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.BONUS_AERO));
  resonatorModel.echo_spectro_dmg_bonus = toPercentageString(
    resonator.echoes.summary.getStat(StatBuffEnum.BONUS_SPECTRO),
  );
  resonatorModel.echo_havoc_dmg_bonus = toPercentageString(resonator.echoes.summary.getStat(StatBuffEnum.BONUS_HAVOC));
  return resonatorModel;
}

export class ResonatorDamageDistribution {
  public resonator_id: string = "";
  public resonator_name: string = "";
  public basic: string = "";
  public heavy: string = "";
  public skill: string = "";
  public liberation: string = "";
  public intro: string = "";
  public outro: string = "";
  public echo: string = "";
  public coordinated_attack: string = "";
  public none: string = "";
  public normal_attack: string = "";
  public resonance_skill: string = "";
  public resonance_liberation: string = "";
  public intro_skill: string = "";
  public forte_circuit: string = "";
  public outro_skill: string = "";
  public damage: string = "";
  public damage_no_crit: string = "";
  public damage_crit: string = "";
  public skills: {
    [id: string]: {
      id: string;
      name: string;
      type: string;
      damage: string;
    };
  } = {};
}

export class TeamDamageDistribution {
  public template_id: string = "";
  public monster_id: string = "";
  public duration_1: string = "";
  public duration_2: string = "";
  public damage: string = "";
  public damage_no_crit: string = "";
  public damage_crit: string = "";
  public resonators: { [id: string]: ResonatorDamageDistribution } = {};

  constructor(distribution: any = {}) {
    if (!distribution || Object.keys(distribution).length === 0) {
      return;
    }
    Object.assign(this, distribution);
  }

  public getHashedTemplateID(): string {
    return md5(this.template_id);
  }

  public getMaxTeamDPS(): number {
    if (this.duration_1 && this.duration_2 && this.damage) {
      const t1 = new Decimal(this.duration_1);
      const d = new Decimal(this.damage);
      const dps = d.dividedBy(t1);
      return dps.toNumber();
    }
    return 0;
  }

  public getMaxTeamDPSString(): string {
    const dps = this.getMaxTeamDPS();
    return toNumberString(dps);
  }

  public getMinTeamDPS(): number {
    if (this.duration_1 && this.duration_2 && this.damage) {
      const t2 = parseFloat(this.duration_2);
      const d = parseFloat(this.damage);
      const dps1 = d / t2;
      return dps1;
    }
    return 0;
  }

  public getMinTeamDPSString(): string {
    const dps = this.getMinTeamDPS();
    return toNumberString(dps);
  }

  public getTeamDPSString(): string {
    if (this.duration_1 && this.duration_2 && this.damage) {
      const t1 = parseFloat(this.duration_1);
      const t2 = parseFloat(this.duration_2);
      const dps1 = toNumberString(this.getMinTeamDPS());
      const dps2 = toNumberString(this.getMaxTeamDPS());
      return `${dps1} (${t2}s) ~ ${dps2} (${t1}s)`;
    }
    return "";
  }

  public getTeamDPSPercentageString(baseDPS: number): string {
    if (this.duration_1 && this.duration_2 && this.damage) {
      const dps = this.getMaxTeamDPS();
      const p = dps / baseDPS;
      return toPercentageString(p);
    }
    return "";
  }

  public getTeamDamagePercentageString(baseDamage: number): string {
    if (this.damage) {
      const d = parseFloat(this.damage);
      const p = toPercentageString(d / baseDamage);
      return p;
    }
    return "";
  }

  public getResonatorNames(): Array<string> {
    return Object.keys(this.resonators);
  }

  public getResonatorIDByResonatorName(resonatorName: string): string {
    return this.resonators[resonatorName].resonator_id;
  }

  public getResonatorIconSources(): Array<string> {
    const sources: Array<string> = [];
    const resonatorStore = useResonatorStore();
    Object.keys(this.resonators).forEach((resonatorName: string) => {
      const no = resonatorStore.getNoByName(resonatorName);
      const source = resonatorStore.getIconSrcByNo(no);
      sources.push(source);
    });
    return sources;
  }

  public getResonatorDamage(resonatorName: string): number {
    const d = this.resonators[resonatorName]?.damage;
    if (!d) {
      return 0;
    }
    return parseFloat(d);
  }

  public getResonatorDamageString(resonatorName: string): string {
    const d = this.getResonatorDamage(resonatorName);
    return toNumberString(d);
  }

  public getResonatorMaxDPS(resonatorName: string): number {
    const d = this.getResonatorDamage(resonatorName);
    if (this.duration_1 && this.duration_2 && d) {
      return d / parseFloat(this.duration_1);
    }
    return 0;
  }

  public getResonatorMaxDPSPercentageByBasedDPS(resonatorName: string, baseDPS: number): number {
    const dps = this.getResonatorMaxDPS(resonatorName);
    return dps / baseDPS;
  }

  public getResonatorMaxDPSPercentageStringByBasedDPS(resonatorName: string, baseDPS: number): string {
    const dps = this.getResonatorMaxDPSPercentageByBasedDPS(resonatorName, baseDPS);
    return toPercentageString(dps);
  }

  public getResonatorMaxDPSPercentage(resonatorName: string): number {
    const dps = this.getResonatorMaxDPS(resonatorName);
    const teamDPS = this.getMaxTeamDPS();
    return dps / teamDPS;
  }

  public getResonatorMaxDPSPercentageString(resonatorName: string): string {
    const p = this.getResonatorMaxDPSPercentage(resonatorName);
    return toPercentageString(p);
  }

  public getResonatorDPSString(resonatorName: string): string {
    const dps = this.getResonatorMaxDPS(resonatorName);
    return toNumberString(dps);
  }

  public getResonatorSkillBars(resonatorName: string): Array<IBar> {
    const bars: Array<IBar> = [];
    const resonatorDamageDistribution = this.resonators[resonatorName];
    if (resonatorDamageDistribution?.damage === undefined) {
      return bars;
    }

    const duration = parseFloat(this.duration_1);
    const baseDamage = parseFloat(resonatorDamageDistribution.damage);
    const skills = resonatorDamageDistribution.skills;
    const skillKeys = Object.keys(skills);
    skillKeys.forEach((key: string) => {
      const skill = skills[key];
      const damage = parseFloat(skill.damage);
      const dps = damage / duration;
      const p = damage / baseDamage;
      const bar = {
        text: key,
        dps: dps,
        dpsString: toNumberString(dps),
        damage: damage,
        damageString: toNumberString(damage),
        percentage: p,
        percentageString: toPercentageString(p),
        data: skill,
      };
      bars.push(bar);
    });
    bars.sort(sortBars);
    return bars;
  }

  public getResonatorSkillTypeBars(resonatorName: string): Array<IBar> {
    const bars: Array<IBar> = [];
    const resonatorDamageDistribution: ResonatorDamageDistribution = this.resonators[resonatorName];
    if (resonatorDamageDistribution?.damage === undefined) {
      return bars;
    }

    const baseDamage = parseFloat(resonatorDamageDistribution.damage);
    const skillTypes = [
      "normal_attack",
      "resonance_skill",
      "forte_circuit",
      "resonance_liberation",
      "intro_skill",
      "outro_skill",
    ];
    skillTypes.forEach((t: string) => {
      const damage = parseFloat((resonatorDamageDistribution as any)[t]);
      const p = damage / baseDamage;
      const bar = {
        text: t,
        damage: damage,
        damageString: toNumberString(damage),
        percentage: p,
        percentageString: toPercentageString(p),
      };
      bars.push(bar);
    });
    return bars;
  }

  public getResonatorSkillBonusBars(resonatorName: string): Array<IBar> {
    const bars: Array<IBar> = [];
    const resonatorDamageDistribution = this.resonators[resonatorName];
    if (resonatorDamageDistribution?.damage === undefined) {
      return bars;
    }

    const baseDamage = parseFloat(resonatorDamageDistribution.damage);
    const skillBonuses = [
      "basic",
      "heavy",
      "skill",
      "liberation",
      "intro",
      "outro",
      "echo",
      "coordinated_attack",
      "none",
    ];
    skillBonuses.forEach((b: string) => {
      const damage = parseFloat((resonatorDamageDistribution as any)[b]);
      const p = damage / baseDamage;
      const bar = {
        text: b,
        damage: damage,
        damageString: toNumberString(damage),
        percentage: p,
        percentageString: toPercentageString(p),
      };
      bars.push(bar);
    });
    return bars;
  }
}

// TODO: Refactor
export class TeamDamageDistributionsWithBuffs {
  private _data: Array<any> = [];

  constructor(distribution: any = {}) {
    if (!distribution || Object.keys(distribution).length === 0) {
      return;
    }
    Object.assign(this, distribution);
    this._data = distribution;
  }

  public getBars(baseDamage: number, baseDPS: number): Array<IBar> {
    const bars: Array<IBar> = [];
    if (this._data.length === 0) {
      return [];
    }
    this._data.forEach((t: any) => {
      const buffName = t[0];
      const damageDistribution = new TeamDamageDistribution(t[1]);
      const damage = baseDamage - parseFloat(damageDistribution.damage);
      const p = damage / baseDamage;
      const dps = baseDPS - damageDistribution.getMaxTeamDPS();
      const bar = {
        text: buffName,
        dps: dps,
        dpsString: toNumberString(dps),
        damage: damage,
        damageString: toNumberString(damage),
        percentage: p,
        percentageString: toPercentageString(p),
      };
      bars.push(bar);
    });
    bars.sort(sortBars);
    return bars;
  }
}

export class DamageAnalysis {
  public affixPolicy: string = "";
  public resonator_template: Template = new Template();
  public resonator_models: ResonatorModels = new ResonatorModels();
  public damage_distribution: TeamDamageDistribution = new TeamDamageDistribution();
  public damage_distributions_with_buffs: TeamDamageDistributionsWithBuffs = new TeamDamageDistributionsWithBuffs();
  public calculated_rows: Array<RowCalculationResult> = [];

  constructor(analysis: any = {}, affixPolicy: string = "") {
    if (!analysis || Object.keys(analysis).length === 0) {
      return;
    }
    const { resonator_template, resonator_models, damage_distribution, damage_distributions_with_buffs, ...data } =
      analysis;
    Object.assign(this, data);
    this.affixPolicy = affixPolicy;
    this.resonator_template = new Template(resonator_template);
    this.resonator_models = new ResonatorModels(resonator_models);
    this.damage_distribution = new TeamDamageDistribution(damage_distribution);
    this.damage_distributions_with_buffs = new TeamDamageDistributionsWithBuffs(damage_distributions_with_buffs);
  }

  public getTeamDamageDistribution(): TeamDamageDistribution {
    return this.damage_distribution;
  }

  public getResonatorDamageAnalysis(resonatorNo: string): any {
    const resonatorStore = useResonatorStore();
    const resonatorName = resonatorStore.getNameByNo(resonatorNo);
    const resonatorDamageAnalysis = getNestedValue(this, `damage_distribution.resonators.${resonatorName}`);
    return resonatorDamageAnalysis;
  }

  public getResonatorModelByName(name: string): ResonatorModel | undefined {
    for (const model of Object.values(this.resonator_models)) {
      if (model?.name === name) {
        return model;
      }
    }
  }

  public getCalculatedRowBars(): Array<IBar> {
    const maxTeamDps = this.damage_distribution.getMaxTeamDPS();
    const calculatedRows = this.calculated_rows;
    const bars: Array<IBar> = [];
    let baseDamage: number = 0;
    calculatedRows.forEach((calculatedRow: any) => {
      let damage = 0.0;
      if (calculatedRow.damage) {
        damage = parseFloat(calculatedRow.damage);
      }
      baseDamage = Math.max(baseDamage, damage);
    });

    calculatedRows.forEach((calculatedRow: any) => {
      let damage = 0.0;
      if (calculatedRow.damage) {
        damage = parseFloat(calculatedRow.damage);
      }
      const p = damage / baseDamage;

      // Text
      let text = `【${calculatedRow.action}】${calculatedRow.skill_id}`;
      if (!calculatedRow.action) {
        text = calculatedRow.skill_id;
      }

      // Color
      let color = "white";
      if (damage <= maxTeamDps) {
        color = "blue-grey-darken-2";
      }

      calculatedRow.baseDamage = baseDamage;
      calculatedRow.color = color;
      const bar = {
        text: text,
        damage: damage,
        damageString: toNumberString(damage),
        percentage: p,
        percentageString: toPercentageString(p),
        data: calculatedRow,
      };
      bars.push(bar);
    });
    return bars;
  }

  public calculateByTemplate(template: Template) {
    this.resonator_template = template;
    this.resonator_template.calculate();

    // Resonator models
    this.resonator_models = new ResonatorModels();
    template.calculation.resonators.forEach((resonator) => {
      const name = resonator.resonator.name;
      resonator.echoes.updateSummaryByEchoes();
      const resonatorModel = getResonatorModel(resonator);
      resonatorModel.echo1 = this.resonator_template.getResonatorEcho1(name);

      const id = resonator.getId();
      this.resonator_models[id] = resonatorModel;
    });

    console.log(JSON.parse(JSON.stringify(this)));
  }
}
