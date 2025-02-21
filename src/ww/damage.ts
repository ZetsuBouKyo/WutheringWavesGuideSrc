import { getNestedValue, toNumberString, toPercentageString, md5 } from "./utils";
import { Template } from "./template";

import { useResonatorStore } from "@/stores/resonator";

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
    return md5(this.template_id);
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
  public affixPolicy: string;
  public resonator_template: any;
  public damage_distribution: any;
  public damage_distributions_with_buffs: any;
  public calculated_rows: any;

  constructor(analysis: any, affixPolicy: string) {
    Object.assign(this, analysis);
    this.affixPolicy = affixPolicy;
    this.resonator_template = new Template(this.resonator_template);
    this.damage_distribution = new TeamDamageDistribution(this.damage_distribution);
    this.damage_distributions_with_buffs = new TeamDamageDistributionsWithBuffs(this.damage_distributions_with_buffs);
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

  public getCalculatedRowBars(): Array<Bar> {
    const maxTeamDps = this.damage_distribution.getMaxTeamDPS();
    const calculatedRows = this.calculated_rows;
    const bars: Array<Bar> = [];
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
}
