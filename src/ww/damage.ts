import { getNestedValue, mapValueToValue, toNumberString, toPercentageString } from "./utils";
import { resonators } from "./resonator";
import { templates, Template } from "./template";

export interface Bar {
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

export class TeamDamageDistribution {
  public template_id: any;
  public duration_1: any;
  public duration_2: any;
  public damage: any;
  public resonators: any;

  constructor(distribution: any) {
    Object.assign(this, distribution);
  }

  public getHashedTemplateID(): string {
    return templates.getHashedTemplateIDByTemplateID(this.template_id);
  }

  public getMaxTeamDPS(): number {
    if (this.duration_1 && this.duration_2 && this.damage) {
      const t1 = parseFloat(this.duration_1);
      const d = parseFloat(this.damage);
      const dps2 = d / t1;
      return dps2;
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

  public getResonatorIDByResonatorName(resonatorName: string): string {
    return this.resonators[resonatorName].resonator_id;
  }

  public getResonatorIconSources(): Array<string> {
    const sources: Array<string> = [];
    Object.keys(this.resonators).forEach((resonatorName: string) => {
      const id = resonators.getNoByName(resonatorName);
      const source = resonators.getIconSrcByNo(id);
      sources.push(source);
    });
    return sources;
  }

  public getResonatorDamage(resonatorName: string): number {
    const d = parseFloat(this.resonators[resonatorName].damage);
    return d;
  }

  public getResonatorDamageString(resonatorName: string): string {
    const d = this.getResonatorDamage(resonatorName);
    return toNumberString(d);
  }

  public getResonatorMaxDPS(resonatorName: string): number {
    const d = this.getResonatorDamage(resonatorName);
    if (this.duration_1 && this.duration_2 && d) {
      return d / this.duration_1;
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

  public getResonatorSkillBars(resonatorName: string): Array<Bar> {
    const duration = this.duration_1;
    const resonatorDamageDistribution = this.resonators[resonatorName];
    const baseDamage = parseFloat(resonatorDamageDistribution.damage);
    const skills = resonatorDamageDistribution.skills;
    const skillKeys = Object.keys(skills);
    const bars: Array<Bar> = [];
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

  public getResonatorSkillTypeBars(resonatorName: string): Array<Bar> {
    const resonatorDamageDistribution = this.resonators[resonatorName];
    const baseDamage = parseFloat(resonatorDamageDistribution.damage);
    const skillTypes = [
      "normal_attack",
      "resonance_skill",
      "forte_circuit",
      "resonance_liberation",
      "intro_skill",
      "outro_skill",
    ];
    const bars: Array<Bar> = [];
    skillTypes.forEach((t: string) => {
      const damage = parseFloat(resonatorDamageDistribution[t]);
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

  public getResonatorSkillBonusBars(resonatorName: string): Array<Bar> {
    const resonatorDamageDistribution = this.resonators[resonatorName];
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
    const bars: Array<Bar> = [];
    skillBonuses.forEach((b: string) => {
      const damage = parseFloat(resonatorDamageDistribution[b]);
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

export class TeamDamageDistributionsWithBuffs {
  private _data: any;
  constructor(distribution: any) {
    Object.assign(this, distribution);
    this._data = distribution;
  }

  public getBars(baseDamage: number, baseDPS: number): Array<Bar> {
    const bars: Array<Bar> = [];
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
  private affixPolicy: string;
  private damage_distribution: any;

  constructor(analysis: any, affixPolicy: string) {
    Object.assign(this, analysis);
    this.affixPolicy = affixPolicy;
  }

  public getTeamDamageDistribution(): any {
    return new TeamDamageDistribution(this.damage_distribution);
  }

  public getResonatorDamageAnalysis(resonatorNo: string): any {
    const resonatorName = resonators.getNameByNo(resonatorNo);
    const resonatorDamageAnalysis = getNestedValue(this, `damage_distribution.resonators.${resonatorName}`);
    return resonatorDamageAnalysis;
  }
}

export class CalculatedDamageAnalyses {
  private templateIDToAffixes151DamageAnalysis: any;
  private templateIDToAffixes20SmallDamageAnalysis: any;
  private templateIDToAffixes20SkillBonusDamageAnalysis: any;

  constructor() {
    // Affixes 15-1
    const affixes151TemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_15_1/damage_analysis.json",
      { eager: true },
    );
    this.templateIDToAffixes151DamageAnalysis = mapValueToValue(
      affixes151TemplateModules,
      "default.resonator_template.id",
      "default",
    );

    // Affixes 20 Small
    const affixes20SmallTemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_20_small/damage_analysis.json",
      { eager: true },
    );
    this.templateIDToAffixes20SmallDamageAnalysis = mapValueToValue(
      affixes20SmallTemplateModules,
      "default.resonator_template.id",
      "default",
    );

    // Affixes 20 Skill Bonus
    const affixes20SkillBonusTemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_20_skill_bonus/damage_analysis.json",
      { eager: true },
    );
    this.templateIDToAffixes20SkillBonusDamageAnalysis = mapValueToValue(
      affixes20SkillBonusTemplateModules,
      "default.resonator_template.id",
      "default",
    );
  }

  public getDamageAnalysis(templateID: string, affixPolicy: string): DamageAnalysis | undefined {
    let damageAnalysis: any;
    switch (affixPolicy) {
      case "affixes_15_1":
        damageAnalysis = new DamageAnalysis(this.templateIDToAffixes151DamageAnalysis[templateID], affixPolicy);
        break;
      case "affixes_20_small":
        damageAnalysis = new DamageAnalysis(this.templateIDToAffixes20SmallDamageAnalysis[templateID], affixPolicy);
        break;
      case "affixes_20_skill_bonus":
        damageAnalysis = new DamageAnalysis(
          this.templateIDToAffixes20SkillBonusDamageAnalysis[templateID],
          affixPolicy,
        );
        break;
      default:
        break;
    }
    damageAnalysis.resonator_template = new Template(damageAnalysis.resonator_template);
    damageAnalysis.damage_distribution = new TeamDamageDistribution(damageAnalysis.damage_distribution);
    damageAnalysis.damage_distributions_with_buffs = new TeamDamageDistributionsWithBuffs(
      damageAnalysis.damage_distributions_with_buffs,
    );
    return damageAnalysis;
  }
}

export const calculatedDamageAnalyses = new CalculatedDamageAnalyses();
