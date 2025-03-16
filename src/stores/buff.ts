import resonator from "@/assets/data/buffs/resonator.json";
import weapon from "@/assets/data/buffs/weapon.json";
import echo from "@/assets/data/buffs/echo.json";
import echo_sonata from "@/assets/data/buffs/echo_sonata.json";

import { RowResonatorBuff, RowWeaponBuff, RowEchoBuff, RowSonataBuff } from "@/ww/row/buff";

class _ResonatorBuffs {
  public data: Array<any> = [];

  constructor() {
    this.data = resonator;
  }

  public getBuffs(name: string): Array<RowResonatorBuff> {
    if (!name) {
      return [];
    }
    const buffs: Array<RowResonatorBuff> = [];
    this.data.forEach((buff) => {
      const rowBuff = new RowResonatorBuff(buff);
      if (rowBuff.isName(name)) {
        buffs.push(rowBuff);
      }
    });

    return buffs;
  }
}

class _WeaponBuffs {
  public data: Array<any> = [];

  constructor() {
    this.data = weapon;
  }

  public getBuffs(name: string): Array<RowWeaponBuff> {
    if (!name) {
      return [];
    }
    const buffs: Array<RowWeaponBuff> = [];
    this.data.forEach((buff) => {
      const rowBuff = new RowWeaponBuff(buff);
      if (rowBuff.isName(name)) {
        buffs.push(rowBuff);
      }
    });

    return buffs;
  }
}

class _EchoBuffs {
  public data: Array<any> = [];

  constructor() {
    this.data = echo;
  }

  public getBuffs(name: string): Array<RowEchoBuff> {
    if (!name) {
      return [];
    }
    const buffs: Array<RowEchoBuff> = [];
    this.data.forEach((buff) => {
      const rowBuff = new RowEchoBuff(buff);
      if (rowBuff.isName(name)) {
        buffs.push(rowBuff);
      }
    });

    return buffs;
  }
}

class _SonataBuffs {
  public data: Array<any> = [];

  constructor() {
    this.data = echo_sonata;
  }

  public getBuffs(name: string): Array<RowSonataBuff> {
    if (!name) {
      return [];
    }
    const buffs: Array<RowSonataBuff> = [];
    this.data.forEach((buff) => {
      const rowBuff = new RowSonataBuff(buff);
      if (rowBuff.isName(name)) {
        buffs.push(rowBuff);
      }
    });

    return buffs;
  }
}

export const ResonatorBuffs = new _ResonatorBuffs();
export const WeaponBuffs = new _WeaponBuffs();
export const EchoBuffs = new _EchoBuffs();
export const SonataBuffs = new _SonataBuffs();
