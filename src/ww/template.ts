import { resonators } from "./resonator";

export class CalculatedTemplates {
  private templates: any;
  private hashedComparisonTitleToTemplateIDs: any;
  private templateIDToAffixes151DamageAnalysis: any;
  private templateIDToHashedID: any;

  constructor() {
    const templatesModule = import.meta.glob("@/assets/calculation/templates.json", { eager: true });
    this.templates = Object.values(templatesModule)[0];

    this.templateIDToHashedID = {};
    this.templates.templates.forEach((template: any) => {
      this.templateIDToHashedID[template.id] = template.hashed_id;
    });

    this.hashedComparisonTitleToTemplateIDs = {};
    Object.keys(this.templates.comparisons).forEach((name: string) => {
      const comparisons: any = this.templates.comparisons[name];
      comparisons.forEach((comparison: any) => {
        this.hashedComparisonTitleToTemplateIDs[comparison.id] = comparison.template_ids;
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

  public getHashedTemplateIDByTemplateID(templateID: string): string {
    return this.templateIDToHashedID[templateID];
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

  public getTemplateIDsByComparisonID(id: string): Array<string> {
    return this.hashedComparisonTitleToTemplateIDs[id];
  }
}

export const calculatedTemplates = new CalculatedTemplates();
