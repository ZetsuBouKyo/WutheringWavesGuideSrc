import { mapValueToValue } from "./utils";

type JsonData = Record<string, any>;

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

  public getElementEnByName(name: string): string {
    const id = this.getIDByName(name);
    return this.getElementEnByID(id);
  }

  public getElementSrcByID(id: string): string {
    const element = this.getElementEnByID(id);
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href;
  }

  public getIconSrcByName(name: string): any {
    const id = this.getIDByName(name);
    return new URL(`../assets/resonators/${id}/icon.png`, import.meta.url).href;
  }

  public getIconSrcByID(id: string): any {
    return new URL(`../assets/resonators/${id}/icon.png`, import.meta.url).href;
  }

  public getIDByName(name: string): string {
    return this.nameToID[name];
  }
}

export const resonators = new Resonators();
