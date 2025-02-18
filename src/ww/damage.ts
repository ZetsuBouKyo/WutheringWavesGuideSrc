import { getNestedValue, mapValueToValue, toNumberString, toPercentageString } from "./utils";
import { resonators } from "./resonator";
import { templates } from "./template";

export class TeamDamageDistribution {
  private template_id: any;
  private duration_1: any;
  private duration_2: any;
  private damage: any;
  private resonators: any;

  constructor(analysis: any) {
    Object.assign(this, analysis);
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

  public getResonatorIconSources(): Array<string> {
    const sources: Array<string> = [];
    Object.keys(this.resonators).forEach((resonatorName: string) => {
      const id = resonators.getIDByName(resonatorName);
      const source = resonators.getIconSrcByID(id);
      sources.push(source);
    });
    return sources;
  }

  public getResonatorDamage(resonatorName: string): number {
    console.log(resonatorName);
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

  public getResonatorDamageAnalysis(resonatorID: string): any {
    const resonatorName = resonators.getNameByID(resonatorID);
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
    switch (affixPolicy) {
      case "affixes_15_1":
        return new DamageAnalysis(this.templateIDToAffixes151DamageAnalysis[templateID], affixPolicy);
      case "affixes_20_small":
        return new DamageAnalysis(this.templateIDToAffixes20SmallDamageAnalysis[templateID], affixPolicy);
      case "affixes_20_skill_bonus":
        return new DamageAnalysis(this.templateIDToAffixes20SkillBonusDamageAnalysis[templateID], affixPolicy);
      default:
        return;
    }
  }
}

export const calculatedDamageAnalyses = new CalculatedDamageAnalyses();
