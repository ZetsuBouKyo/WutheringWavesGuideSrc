import { getNumber } from "./utils";

export class WeaponInfo {
  public id: number | "" = "";
  public no: string = "";
  public name: string = "";
  public description: string = "";
  public icon: string = "";
  public rarity: number | "" = "";
  public star: string = "";
  public type_zh_tw: string = "";
  public passive: { name: string; description: string; passive_buffs: Array<any> } = {
    name: "",
    description: "",
    passive_buffs: [],
  };
  public attrs: Array<{ lv: string; atk: string; [stat_bonus: string]: string }> = [];

  constructor(info: any = {}) {
    if (!info || Object.keys(info).length === 0) {
      return;
    }
    Object.assign(this, info);
  }

  public duplicate(): WeaponInfo {
    const info = new WeaponInfo();
    info.id = this.id;
    info.no = this.no;
    info.name = this.name;
    info.description = this.description;
    info.icon = this.icon;
    info.rarity = this.rarity;
    info.star = this.star;
    info.type_zh_tw = this.type_zh_tw;
    info.passive = JSON.parse(JSON.stringify(this.passive));
    info.attrs = JSON.parse(JSON.stringify(this.attrs));
    return info;
  }

  public getMaxLevel(): string {
    const attrs = this.attrs;
    let m = getNumber(0);
    for (const attr of attrs) {
      const level = getNumber(attr.lv);
      m = Math.max(m, level);
    }
    return m.toString();
  }

  public getAtk(level: string): string {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (level === attr.lv) {
        return attr.atk;
      }
    }
    return "";
  }

  public getThirdAttrKey(): string {
    let key = Object.keys(this.attrs[0]).find((k) => k !== "lv" && k !== "atk");
    if (key === undefined) {
      key = "";
    }
    return key;
  }

  public getStatBonus(level: string): any {
    const attrs = this.attrs;
    for (const attr of attrs) {
      if (level === attr.lv) {
        const attr_keys = Object.keys(attr);
        for (const key of attr_keys) {
          if (key !== "lv" && key !== "atk") {
            return { [key]: attr[key] };
          }
        }
      }
    }
    return {};
  }

  public getPassiveStatBonus(tune: string): any {
    const passive_buffs = this.passive.passive_buffs;
    if (passive_buffs.length === 0) {
      return {};
    }
    const t = parseInt(tune) - 1;
    if (t < 0 || t > 4) {
      return {};
    }
    const passive_buff = passive_buffs[t];
    return passive_buff;
  }

  public getHtmlInfo(): string {
    let text: string = "";
    if (this.name) {
      text = `【${this.name}】`;
    }
    if (this.passive.name) {
      text = `${text} ${this.passive.name}`;
    }
    if (this.passive.description) {
      text = `${text}\n\n${this.passive.description}`;
    }
    text = text.replace(/\n/g, "<br />");
    return text;
  }
}
