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

  constructor(info: any) {
    Object.assign(this, info);
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
