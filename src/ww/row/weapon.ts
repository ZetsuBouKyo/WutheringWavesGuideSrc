import { useWeaponStore } from "@/stores/weapon";

import { StatBuff } from "@/ww/buff";
import { WeaponInfo } from "../weapon";

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

  public async updateRowWeaponByName() {
    const weaponStore = useWeaponStore();

    this.stat_bonus = new StatBuff();
    this.passive_stat_bonus = new StatBuff();
    const name = this.name;
    if (!name) {
      return;
    }

    const no = weaponStore.getNoByName(name);
    this.no = no;

    const info = new WeaponInfo(await weaponStore.getInfoByNo(no));
    this.star = info.star;
    this.type = info.type;

    const level = this.level;
    if (level) {
      this.atk = info.getAtk(level);

      // Stat bonus
      const stat_bonus = info.getStatBonus(level);
      Object.keys(stat_bonus).forEach((key: string) => {
        const value = stat_bonus[key] as string;
        (this.stat_bonus as any)[key] = value;
      });
    }

    // Passive stat bonus
    if (this.tune) {
      const passive_buff = info.getPassiveStatBonus(this.tune);
      Object.keys(passive_buff).forEach((key: string) => {
        const value = passive_buff[key] as string;
        (this.passive_stat_bonus as any)[key] = value;
      });
    }
  }
}
