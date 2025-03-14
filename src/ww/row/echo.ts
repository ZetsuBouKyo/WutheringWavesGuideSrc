import { StatBuffEnum, type TAbbrBonusEnum } from "@/types/buff";
import { StatBuff } from "@/ww/buff";
import { getAffixLabelByKey, getFixedMainAffixes, getMainAffixes } from "@/ww/echo";

import { useEchoStore } from "@/stores/echo";

export class RowEcho {
  public no: string = "";
  public name: string = "";
  public sonata: string = "";
  public cost: string = "";
  public abbr: TAbbrBonusEnum = "";
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();
  public _fixed_main_affix_key: string = "";
  public _main_affix_item: { title: string; value: any } = { title: "", value: undefined };
  public _main_affix_items: Array<{ title: string; value: any }> = [];
  public _item: { title: string; value: any } = { title: "", value: undefined };
  public _sonatas: Array<string> = this.getSonataNames();

  constructor(echo: any = {}) {
    if (!echo || Object.keys(echo).length === 0) {
      return;
    }
    const { main_affix, sub_affix, ...data } = echo;
    Object.assign(this, data);

    this.main_affix = new StatBuff(main_affix);
    this.sub_affix = new StatBuff(sub_affix);
  }

  public duplicate(): RowEcho {
    const e = new RowEcho();
    e.no = this.no;
    e.name = this.name;
    e.sonata = this.sonata;
    e.main_affix = this.main_affix.duplicate();
    e.sub_affix = this.sub_affix.duplicate();
    e._fixed_main_affix_key = this._fixed_main_affix_key;
    e._main_affix_item = JSON.parse(JSON.stringify(this._main_affix_item));
    e._main_affix_items = JSON.parse(JSON.stringify(this._main_affix_items));
    e._item = JSON.parse(JSON.stringify(this._item));
    e._sonatas = JSON.parse(JSON.stringify(this._sonatas));
    return e;
  }

  public reset() {
    this.cost = "";
    this._item = { title: "", value: undefined };
    this.resetMainAffix();
    this.resetSubAffix();
  }

  public resetMainAffix() {
    this.main_affix = new StatBuff();
    this._fixed_main_affix_key = "";
    this._main_affix_item = { title: "", value: undefined };
  }

  public resetSubAffix() {
    this.sub_affix = new StatBuff();
  }

  public getId(): string {
    return `${this.cost}${this.abbr}`;
  }

  public getCosts(): Array<string> {
    const echoStore = useEchoStore();
    const costs = echoStore.getCosts();
    return costs;
  }

  public getEchoItems() {
    const echoStore = useEchoStore();
    const echoItems = echoStore.getEchoItemsForCalculation();
    return echoItems;
  }

  public getSonataNames() {
    const echoStore = useEchoStore();
    const sonatas = echoStore.getSonataNames();
    return sonatas;
  }

  public getSubAffixKeys(): Array<string> {
    const echoStore = useEchoStore();
    const keys = echoStore.getSubAffixKeys();
    return keys;
  }

  public updateByCost(cost: string) {
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

  public updateByEchoItem(item: {
    title: string;
    value: { name: string; cost: string; sonatas: Array<string> } | undefined;
  }) {
    if (!item || !item.title || !item.value) {
      item = this._item;
    }
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

  public updateMainAffix(item: string) {
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

  public updateMainAffixKeysByCost() {
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
