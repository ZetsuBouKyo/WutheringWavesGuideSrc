import { StatBuffEnum } from "@/types/buff";
import { StatBuff } from "@/ww/buff";
import { getAffixLabelByKey, getFixedMainAffixes, getMainAffixes } from "@/ww/echo";

import { useEchoStore } from "@/stores/echo";

export class RowEcho {
  public no: string = "";
  public name: string = "";
  public sonata: string = "";
  public cost: string = "";
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();
  public _fixed_main_affix_key: string = "";
  public _main_affix_item: { title: string; value: any } = { title: "", value: undefined };
  public _main_affix_items: Array<{ title: string; value: any }> = [];
  public _item: { title: string; value: any } = { title: "", value: undefined };
  public _sonatas: Array<string> = this.getSonataNames();

  reset() {
    this.cost = "";
    this._item = { title: "", value: undefined };
    this.resetMainAffix();
    this.resetSubAffix();
  }

  resetMainAffix() {
    this.main_affix = new StatBuff();
    this._fixed_main_affix_key = "";
    this._main_affix_item = { title: "", value: undefined };
  }

  resetSubAffix() {
    this.sub_affix = new StatBuff();
  }

  getCosts(): Array<string> {
    const echoStore = useEchoStore();
    const costs = echoStore.getCosts();
    return costs;
  }

  getEchoItems() {
    const echoStore = useEchoStore();
    const echoItems = echoStore.getEchoItemsForCalculation();
    return echoItems;
  }

  getSonataNames() {
    const echoStore = useEchoStore();
    const sonatas = echoStore.getSonataNames();
    return sonatas;
  }

  getSubAffixKeys(): Array<string> {
    const echoStore = useEchoStore();
    const keys = echoStore.getSubAffixKeys();
    return keys;
  }

  updateByCost(cost: string) {
    if (!cost) {
      return;
    }
    this.cost = cost;

    // Main affix items
    this.updateMainAffixKeysByCost();

    this.resetMainAffix();
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
    (this.main_affix as any)[this._fixed_main_affix_key] = fixedMainAffixes[this._fixed_main_affix_key];
    this._main_affix_item = {
      title: "",
      value: undefined,
    };
  }

  updateByEchoItem(item: { title: string; value: { name: string; cost: string; sonatas: Array<string> } | undefined }) {
    if (!item || !item.title || !item.value) {
      return;
    }

    this.name = item.value.name;

    // Sonata items
    if (item.value.sonatas && item.value.sonatas.length > 0) {
      this._sonatas = item.value.sonatas;
    } else {
      this._sonatas = this.getSonataNames();
    }

    this.sonata = "";
    if (this._sonatas.length === 1) {
      this.sonata = this._sonatas[0];
    }

    this._item = item;
    this.updateByCost(item.value.cost);
  }

  updateMainAffix(item: string) {
    const cost = this.cost;
    if (!item || !cost) {
      return;
    }
    this._main_affix_item = {
      title: getAffixLabelByKey(item),
      value: item,
    };
    const mainAffixes = getMainAffixes(cost);
    (this.main_affix as any)[item] = mainAffixes[item];
  }

  updateMainAffixKeysByCost() {
    const cost = this.cost;
    if (!cost) {
      return;
    }
    const mainAffixes = getMainAffixes(cost);
    this._main_affix_items = Object.keys(mainAffixes).map((value: any, _, __) => {
      return { title: getAffixLabelByKey(value), value: value };
    });
  }
}
