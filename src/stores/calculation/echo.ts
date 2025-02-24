import { defineStore } from "pinia";

import { StatBuff } from "@/ww/buff";

export const useRowEchoStore = (id: string) => {
  const storeId: string = `row-echo-${id}`;
  const store: any = defineStore(storeId, {
    state: (): any => ({
      no: "",
      name: "",
      sonata: "",
      const: "",
      main_affix: new StatBuff(),
      sub_affix: new StatBuff(),
      _fixed_main_affix_key: "",
      _main_affix_item: { title: "", value: undefined },
      _item: { title: "", value: undefined },
    }),
    actions: {
      resetMainAffix() {
        this.main_affix = new StatBuff();
      },
      resetSubAffix() {
        this.sub_affix = new StatBuff();
      },
    },
  });
  return new store();
};

export default useRowEchoStore;
