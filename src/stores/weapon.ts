import { mande } from "mande";
import { defineStore } from "pinia";
import { type IWeaponInfo } from "@/types/weapon";
import { WeaponInfo } from "@/ww/weapon";

import _weapons_info from "@/assets/data/weapons.json";

const name2info: { [name: string]: IWeaponInfo } = {};
const no2name: { [no: string]: string } = {};
const nos: Array<string> = [];

for (const _info of _weapons_info) {
  const _name = _info.name;
  if (_name) {
    name2info[_name] = _info;
    const _no = _info.no;
    if (_no) {
      nos.push(_no);
      no2name[_no] = _name;
    }
  }
}

const spoilerNames: Array<string> = [];

export const useWeaponStore = defineStore("weapon", {
  state: () => ({}),
  actions: {
    getNames(spoiler: any = false, star: any = null): Array<string> {
      const infos: Array<IWeaponInfo> = Object.values(name2info);
      const names: Array<string> = [];

      for (const info of infos) {
        const name = info.name;
        if (!spoiler && spoilerNames.includes(name)) {
          continue;
        }

        if (star !== null && star !== info.star) {
          continue;
        }

        names.push(name);
      }

      return names;
    },
    getTunes(): Array<string> {
      return new Array("1", "2", "3", "4", "5");
    },
    getNoByName(name: string): string {
      return name2info[name].no;
    },
    getInfoByNo(no: string): WeaponInfo | undefined {
      const name = no2name[no];
      if (!name) {
        return undefined;
      }
      const info = name2info[name];
      return new WeaponInfo(info);
    },
    getInfoByName(name: string): WeaponInfo | undefined {
      const no = this.getNoByName(name);
      const info = this.getInfoByNo(no);
      return info;
    },
  },
});
