import { defineStore } from "pinia";

import { StatBuffEnum } from "@/types/buff";
import { StatBuff } from "@/ww/buff";
import { getFixedMainAffixes } from "@/ww/echo";

export const useRowEchoStore = (id: string) => {
  const storeId: string = `row-echo-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      no: "",
      name: "",
      sonata: "",
      cost: "",
      main_affix: new StatBuff(),
      sub_affix: new StatBuff(),
      _fixed_main_affix_key: "",
      _main_affix_item: { title: "", value: undefined },
      _item: { title: "", value: undefined },
    }),
    actions: {
      reset() {
        this.cost = "";
        this._fixed_main_affix_key = "";
        this._main_affix_item = { title: "", value: undefined };
        this._item = { title: "", value: undefined };
        this.resetMainAffix();
        this.resetSubAffix();
      },
      resetMainAffix() {
        this.main_affix = new StatBuff();
      },
      resetSubAffix() {
        this.sub_affix = new StatBuff();
      },
      updateByEchoItem(item: { title: string; value: any }) {
        if (!item || !item.title || !item.value) {
          return;
        }
        this.resetMainAffix();
        this.resetSubAffix();
        this.sonata = { title: "", value: undefined };

        this.name = item.value.name;
        this.cost = item.value.cost;
        switch (this.cost) {
          case "4":
          case "3":
            this._fixed_main_affix_key = StatBuffEnum.ATK;
            break;
          case "1":
            this._fixed_main_affix_key = StatBuffEnum.HP;
            break;
          default:
            break;
        }

        const fixedMainAffixes = getFixedMainAffixes(this.cost);
        this.main_affix[this._fixed_main_affix_key] = fixedMainAffixes[this._fixed_main_affix_key];
        this._main_affix_item = {
          title: "",
          value: undefined,
        };
      },
    },
  });
  return new store();
};

export function getEchoStores(prefixId: string): Array<{ id: string; store: any }> {
  const stores: Array<{ id: string; store: any }> = Array.from({ length: 5 }, (_, i) => ({
    id: `${prefixId}${i + 1}`,
    store: useRowEchoStore(`${prefixId}${i + 1}`),
  }));
  return stores;
}
