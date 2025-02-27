import { useWeaponStore } from "@/stores/weapon";

import { StatBuff } from "@/ww/buff";
import { WeaponInfo } from "@/ww/weapon";
import { getNumber } from "@/ww/utils";
export class RowWeapon {
  public no: string = "";
  public name: string = "";
  public star: string = "";
  public type: string = "";
  public level: string = "90";
  public tune: string = "1";
  public atk: string = "";
  public stat_bonus: StatBuff = new StatBuff();
  public passive_stat_bonus: StatBuff = new StatBuff();
  public _info: WeaponInfo | undefined = undefined;

  public getMaxLevel(): string {
    if (!this._info) {
      return "90";
    }
    return this._info.getMaxLevel();
  }

  public getLevels(): Array<string> {
    const base = new Array("1", "20", "20+", "40", "40+", "50", "50+", "60", "60+", "70", "70+", "80", "80+", "90");
    const levels: any = [];
    const m: number = getNumber(this.getMaxLevel());
    base.forEach((level: string) => {
      const n = getNumber(level);
      if (n <= m) {
        levels.push(level);
      }
    });
    const last: string = levels.at(-1);
    if (last.includes("+")) {
      levels.pop();
    }
    return levels;
  }

  public async updateRowWeaponByName() {
    const name = this.name;
    if (!name) {
      return;
    }

    const weaponStore = useWeaponStore();

    // Reset
    this.stat_bonus = new StatBuff();
    this.passive_stat_bonus = new StatBuff();

    const no = weaponStore.getNoByName(name);
    this.no = no;

    const info = new WeaponInfo(await weaponStore.getInfoByNo(no));
    this._info = info;
    this.star = info.star;
    this.type = info.type;

    // Update level
    const maxLevel = info.getMaxLevel();
    const nLevel = getNumber(this.level);
    const mLevel = getNumber(maxLevel);
    if (nLevel > mLevel) {
      this.level = maxLevel;
    } else if (nLevel === mLevel && this.level.includes("+")) {
      this.level = maxLevel;
    }

    const level = this.level;
    if (level) {
      this.atk = info.getAtk(level);

      // Stat bonus
      const stat_bonus = info.getStatBonus(level);
      Object.keys(stat_bonus).forEach((key: string) => {
        const value = stat_bonus[key] as string;
        (this.stat_bonus as any)[key] = getNumber(value).toString();
      });
    }

    // Passive stat bonus
    if (this.tune) {
      const passive_buff = info.getPassiveStatBonus(this.tune);
      Object.keys(passive_buff).forEach((key: string) => {
        const value = passive_buff[key] as string;
        (this.passive_stat_bonus as any)[key] = getNumber(value).toString();
      });
    }
  }
}
