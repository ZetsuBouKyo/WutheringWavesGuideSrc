import { getNumber } from "./utils";

export class WeaponInfo {
  public no: string = "";
  public name: string = "";
  public star: string = "";
  public type: string = "";
  public passive: { name: string; description: string; passive_buffs: Array<any> } = {
    name: "",
    description: "",
    passive_buffs: [],
  };
  public attrs: Array<{ lv: string; atk: string; [stat_bonus: string]: string }> = [];

  constructor(info: any = {}) {
    if (info && Object.keys(info).length > 0) {
      Object.assign(this, info);
    }
  }

  public duplicate(): WeaponInfo {
    const info = new WeaponInfo();
    info.no = this.no;
    info.name = this.name;
    info.star = this.star;
    info.type = this.type;
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
}
