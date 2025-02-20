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

  public getNameByNo(no: string): string {
    return this.idToName[no];
  }

  public getElementEnByName(name: string): string {
    const no = this.getNoByName(name);
    return this.getElementEnByNo(no);
  }

  public getElementEnByNo(no: string): string {
    return this.idToElementEn[no];
  }

  public getElementSrcByName(name: string): string {
    const no = this.getNoByName(name);
    const element = this.getElementEnByNo(no);
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href;
  }

  public getElementSrcByNo(no: string): string {
    const element = this.getElementEnByNo(no);
    return new URL(`../assets/elements/${element}.png`, import.meta.url).href;
  }

  public getIconSrcByName(name: string): any {
    const no = this.getNoByName(name);
    return new URL(`../assets/resonators/${no}/icon.png`, import.meta.url).href;
  }

  public getIconSrcByNo(no: string): any {
    return new URL(`../assets/resonators/${no}/icon.png`, import.meta.url).href;
  }

  public getNoByName(name: string): string {
    return this.nameToID[name];
  }
}
