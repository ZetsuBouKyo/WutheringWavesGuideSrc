import { resonators } from "./resonator";
import { mapValueToValue } from "./utils";
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

  public getTemplateByHashedTemplateID(hashedTemplateID: string): any {
    return this.hashedTemplateIDToTemplate[hashedTemplateID];
  }

  public getTemplateIDByHashedTemplateID(hashedTemplateID: string): string {
    return this.hashedTemplateIDToTemplateID[hashedTemplateID];
  }

  public getHashedTemplateIDByTemplateID(templateID: string): string {
    return this.templateIDToHashedTemplateID[templateID];
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

  public getCalculatedResonatorIDs(): Array<string> {
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

  public getTemplateIDsByResonatorID(resonatorID: string): Array<string> {
    const ids: Array<string> = [];
    for (const template of this.templates.templates) {
      for (const name of template.echo_comparison) {
        const templateResonator = resonators.getIDByName(name);
        if (resonatorID === templateResonator) {
          ids.push(template.id);
        }
      }
    }
    return ids;
  }

  public getComparisonsByID(resonatorID: string): any {
    for (const [name, comparisons] of Object.entries(this.templates.comparisons)) {
      const id = resonators.getIDByName(name);
      if (id === resonatorID) {
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
