import { StatBuff } from "@/ww/buff";

export class RowEchoes {
  public name1: string = "";
  public sonatas: Array<string> = [];
  public total_cost: number = 0;
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();

  public reset() {
    this.name1 = "";
    this.sonatas = [];
    this.total_cost = 0;
    this.main_affix = new StatBuff();
    this.sub_affix = new StatBuff();
  }

  public updateByStores(stores: Array<any>) {
    if (!stores || stores.length === 0) {
      return;
    }
    this.reset();
    const name = stores[0].data.name;
    if (name) {
      this.name1 = name;
    }
    stores.forEach((store: any) => {
      this.total_cost += parseFloat(store.data.cost);
      const sonata = store.data.sonata;
      if (sonata) {
        this.sonatas.push(sonata);
      }
      this.main_affix.addStatBuff(store.data.main_affix);
      this.sub_affix.addStatBuff(store.data.sub_affix);
    });
  }
}
