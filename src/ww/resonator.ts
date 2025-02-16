type JsonData = Record<string, any>;

function getNestedValue<T>(obj: Record<string, any>, keyPath: string): T | undefined {
  return keyPath.split(".").reduce((acc, key) => acc && acc[key], obj) as T | undefined;
}

function mapValueToValue(modules: any, key1: string, key2: string): any {
  return Object.fromEntries(
    Object.entries(modules).map(([_, module]) => [
      getNestedValue(module as { default: JsonData }, key1),
      getNestedValue(module as { default: JsonData }, key2),
    ]),
  );
}

export class Resonators {
  private infoJsonModules: any;
  private nameToID: any;
  private idToElementEn: any;
  private idToName: any;

  constructor() {
    this.infoJsonModules = import.meta.glob("@/assets/data/resonators/*/info.json", { eager: true });
    this.idToElementEn = mapValueToValue(this.infoJsonModules, "default.no", "default.element_en");
    this.idToName = mapValueToValue(this.infoJsonModules, "default.no", "default.name");
    this.nameToID = mapValueToValue(this.infoJsonModules, "default.name", "default.no");
  }

  public getInfoJsonModules(): Record<string, JsonData> {
    return this.infoJsonModules;
  }

  public getNameByID(id: string): string {
    return this.idToName[id];
  }

  public getElementEnByID(id: string): string {
    return this.idToElementEn[id];
  }

  public getElementSrcByID(id: string): string {
    const element = this.getElementEnByID(id);
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href;
  }

  public getIconSrcByID(id: string): any {
    return new URL(`../assets/resonators/${id}/icon.png`, import.meta.url).href;
  }

  public getIDByName(name: string): string {
    return this.nameToID[name];
  }
}

export const resonators = new Resonators();

export class CalculatedResonators {
  private templates: any;
  private idToTemplateIDs: any;
  private hashedComparisonTitleToTemplateIDs: any;

  constructor() {
    const templatesModule = import.meta.glob("@/assets/calculation/templates.json", { eager: true });
    this.templates = Object.values(templatesModule)[0];

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

  public getTemplateIDsByID(resonatorID: string): Array<string> {
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

  public getTemplateIDsByComparisonID(id: string): any {
    return this.hashedComparisonTitleToTemplateIDs[id];
  }
}

export const calculatedResonators = new CalculatedResonators();
