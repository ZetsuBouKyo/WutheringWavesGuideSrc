import { defineStore } from "pinia";

import { StatBuff } from "@/ww/buff";

export const useRowEchoesStore = (id: string) => {
  const storeId: string = `row-echoes-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      name1: "",
      sonatas: [],
      total_cost: 0,
      main_affix: new StatBuff(),
      sub_affix: new StatBuff(),
    }),
    actions: {
      updateByStores(stores: Array<any>) {
        if (!stores || stores.length === 0) {
          return;
        }
        const name = stores[0].name;
        if (name) {
          this.name1 = name;
        }
        stores.forEach((store: any) => {
          this.total_cost += parseFloat(store.cost);
          const sonata = store.sonata;
          if (sonata) {
            this.sonatas.push(sonata);
          }
          this.main_affix.addStatBuff(store.main_affix);
          this.sub_affix.addStatBuff(store.sub_affix);
        });
      },
    },
  });
  return new store();
};
