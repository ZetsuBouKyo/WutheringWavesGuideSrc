import { StatBuffEnum } from "@/types/buff";
import { StatBuff } from "@/ww/buff";
import { getFixedMainAffixes } from "@/ww/echo";

export class RowEcho {
  public no: string = "";
  public name: string = "";
  public sonata: string = "";
  public cost: string = "";
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();
  public _fixed_main_affix_key: string = "";
  public _main_affix_item: { title: string; value: any } = { title: "", value: undefined };
  public _item: { title: string; value: any } = { title: "", value: undefined };

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

  updateByEchoItem(item: { title: string; value: any }) {
    if (!item || !item.title || !item.value) {
      return;
    }
    this.resetMainAffix();
    this.resetSubAffix();
    this.sonata = "";

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
    (this.main_affix as any)[this._fixed_main_affix_key] = fixedMainAffixes[this._fixed_main_affix_key];
    this._main_affix_item = {
      title: "",
      value: undefined,
    };
  }
}
