import { resonators } from "./resonator";
import { mapValueToValue } from "./utils";
import { getRotation } from "./rotation";
import { TeamDamageDistribution } from "./damage";

export class Template {
  public resonators: Array<any> = [];
  public rows: Array<any> = [];

  constructor(template: any) {
    Object.assign(this, template);
  }

  public getRotation(): any {
    const rows = this.rows;
    return getRotation(rows);
  }
}

export class Templates {
  private hashedTemplateIDToTemplate: any;
  private hashedTemplateIDToTemplateID: any;
  private templateIDToHashedTemplateID: any;

  constructor() {
    const templateModules = import.meta.glob("@/assets/templates/*.json", { eager: true });

    this.templateIDToHashedTemplateID = mapValueToValue(templateModules, "default.id", "default.hashed_id");
    this.hashedTemplateIDToTemplate = mapValueToValue(templateModules, "default.hashed_id", "default");
    this.hashedTemplateIDToTemplateID = mapValueToValue(templateModules, "default.hashed_id", "default.id");
  }

  public getHashedTemplateIDByTemplateID(templateID: string): string {
    return this.templateIDToHashedTemplateID[templateID];
  }

  public getTemplateByHashedTemplateID(hashedTemplateID: string): Template {
    return new Template(this.hashedTemplateIDToTemplate[hashedTemplateID]);
  }

  public getTemplateIDByHashedTemplateID(hashedTemplateID: string): string {
    return this.hashedTemplateIDToTemplateID[hashedTemplateID];
  }
}

export const templates = new Templates();
export class CalculatedTemplates {
  private templates: any;
  private hashedComparisonTitleToComparison: any;
  private hashedTemplateIDToResonatorsForEchoComparison: any;

  constructor() {
    const templatesModule = import.meta.glob("@/assets/calculation/templates.json", { eager: true });
    this.templates = Object.values(templatesModule)[0];

    this.hashedTemplateIDToResonatorsForEchoComparison = {};
    this.templates.templates.forEach((template: any) => {
      const resonatorNames: Array<string> = template.echo_comparison;
      const r: Array<any> = [];
      resonatorNames.forEach((name: string) => {
        const id = resonators.getIDByName(name);
        r.push({ id: id, name: name });
      });
      this.hashedTemplateIDToResonatorsForEchoComparison[template.hashed_id] = r;
    });

    this.hashedComparisonTitleToComparison = {};
    Object.keys(this.templates.comparisons).forEach((name: string) => {
      const comparisons: any = this.templates.comparisons[name];
      comparisons.forEach((comparison: any) => {
        this.hashedComparisonTitleToComparison[comparison.id] = comparison;
      });
    });
  }

  public getCalculatedResonatorNos(): Array<string> {
    const s: Set<string> = new Set([]);
    for (const template of this.templates.templates) {
      for (const name of template.echo_comparison) {
        const id = resonators.getIDByName(name);
        s.add(id);
      }
    }
    const arr = Array.from(s);
    arr.sort();
    return arr;
  }

  public getResonatorsForEchoComparison(hashedTemplateID: string): Array<{ id: string; name: string }> {
    return this.hashedTemplateIDToResonatorsForEchoComparison[hashedTemplateID];
  }

  public getTemplateIDsByResonatorNo(resonatorNo: string): Array<string> {
    const ids: Array<string> = [];
    for (const template of this.templates.templates) {
      for (const name of template.echo_comparison) {
        const templateResonator = resonators.getIDByName(name);
        if (resonatorNo === templateResonator) {
          ids.push(template.id);
        }
      }
    }
    return ids;
  }

  public getComparisonsByID(resonatorNo: string): any {
    for (const [name, comparisons] of Object.entries(this.templates.comparisons)) {
      const id = resonators.getIDByName(name);
      if (id === resonatorNo) {
        return comparisons;
      }
    }
    return [];
  }

  public getComparisonByComparisonID(id: string): any {
    return this.hashedComparisonTitleToComparison[id];
  }

  public getTemplateIDsByComparisonID(id: string): Array<string> {
    const comparison = this.getComparisonByComparisonID(id);
    return comparison.template_ids;
  }
}

export const calculatedTemplates = new CalculatedTemplates();

function initEchoComparison(modules: any, comparison: any) {
  Object.keys(modules).forEach((path: string) => {
    const params = path.split("/") as any;
    const resonatorNo = params.at(-1).replace(".json", "");
    const m: any = modules[path];
    const templateID = m.default.resonator_template.id;
    const hashedTemplateID = templates.getHashedTemplateIDByTemplateID(templateID);
    if (!comparison[hashedTemplateID]) {
      comparison[hashedTemplateID] = {};
    }
    comparison[hashedTemplateID][resonatorNo] = m.default;
  });
}

class EchoComparison {
  public affixPolicy: any;

  constructor(comparison: any, affixPolicy: string) {
    Object.assign(this, comparison);
    this.affixPolicy = affixPolicy;
  }
}

export class CalculatedEchoComparisonTemplates {
  private hashedTemplateIDToAffixes151DamageAnalyses: any;
  private hashedTemplateIDToAffixes20SmallDamageAnalyses: any;
  private hashedTemplateIDToAffixes20SkillBonusDamageAnalyses: any;

  constructor() {
    const affixes151TemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_15_1/echo_comparison/*.json",
      { eager: true },
    );
    this.hashedTemplateIDToAffixes151DamageAnalyses = {};
    initEchoComparison(affixes151TemplateModules, this.hashedTemplateIDToAffixes151DamageAnalyses);

    const affixes20SmallTemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_20_small/echo_comparison/*.json",
      { eager: true },
    );
    this.hashedTemplateIDToAffixes20SmallDamageAnalyses = {};
    initEchoComparison(affixes20SmallTemplateModules, this.hashedTemplateIDToAffixes20SmallDamageAnalyses);

    const affixes20SkillBonusTemplateModules = import.meta.glob(
      "@/assets/calculation/resonator/template/*/affixes_20_skill_bonus/echo_comparison/*.json",
      { eager: true },
    );
    this.hashedTemplateIDToAffixes20SkillBonusDamageAnalyses = {};
    initEchoComparison(affixes20SkillBonusTemplateModules, this.hashedTemplateIDToAffixes20SkillBonusDamageAnalyses);
  }

  public getEchoComparison(hashedTemplateID: string, affixPolicy: string, resonatorNo: string): any {
    switch (affixPolicy) {
      case "affixes_15_1":
        return new EchoComparison(
          this.hashedTemplateIDToAffixes151DamageAnalyses[hashedTemplateID][resonatorNo],
          affixPolicy,
        );
      case "affixes_20_small":
        return new EchoComparison(
          this.hashedTemplateIDToAffixes20SmallDamageAnalyses[hashedTemplateID][resonatorNo],
          affixPolicy,
        );
      case "affixes_20_skill_bonus":
        return new EchoComparison(
          this.hashedTemplateIDToAffixes20SkillBonusDamageAnalyses[hashedTemplateID][resonatorNo],
          affixPolicy,
        );
      default:
        return;
    }
  }

  public getDamageDistributions(hashedTemplateID: string, affixPolicy: string, resonatorNo: string): Array<any> {
    const echoComparison = this.getEchoComparison(hashedTemplateID, affixPolicy, resonatorNo);
    const damageDistributions: Array<any> = [];
    echoComparison.damage_distributions.forEach((damageDistribution: any) => {
      const d = new TeamDamageDistribution(damageDistribution);
      damageDistributions.push(d);
    });
    return damageDistributions;
  }
}

export const calculatedEchoComparisonTemplates = new CalculatedEchoComparisonTemplates();
