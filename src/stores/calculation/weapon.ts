import { defineStore } from "pinia";

import { useWeaponStore } from "@/stores/weapon";

import { StatBuff } from "@/ww/buff";
import { WeaponInfo } from "@/ww/weapon";

export const useRowWeaponStore = (id: string) => {
  const storeId: string = `row-weapon-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      no: "",
      name: "",
      star: "",
      type: "",
      level: "90",
      tune: "1",
      atk: "",
      stat_bonus: new StatBuff(),
      passive_stat_bonus: new StatBuff(),
    }),
    actions: {
      async updateRowWeaponByName() {
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
      },
    },
  });
  return new store();
};
