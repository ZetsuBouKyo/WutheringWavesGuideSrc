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
  private noToElementEn: any;
  private noToName: any;

  constructor() {
    this.infoJsonModules = import.meta.glob("@/assets/data/resonators/*/info.json", { eager: true });
    this.noToElementEn = mapValueToValue(this.infoJsonModules, "default.no", "default.element_en");
    this.noToName = mapValueToValue(this.infoJsonModules, "default.no", "default.name");
  }

  public getInfoJsonModules(): Record<string, JsonData> {
    return this.infoJsonModules;
  }

  public getNameByNo(no: string): string {
    return this.noToName[no];
  }

  public getElementEnByNo(no: string): string {
    return this.noToElementEn[no];
  }

  public getElementSrcByNo(no: string): string {
    const element = this.getElementEnByNo(no);
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href;
  }

  public getIconSrcByNo(no: string): any {
    return new URL(`../assets/resonators/${no}/icon.png`, import.meta.url).href;
  }
}

export const resonators = new Resonators();
