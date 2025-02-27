import { StatBuff } from "@/ww/buff";

import { RowEcho } from "./echo";
export class RowEchoesSummary {
  public name1: string = "";
  public sonatas: Array<string> = [];
  public total_cost: number = 0;
  public main_affix: StatBuff = new StatBuff();
  public sub_affix: StatBuff = new StatBuff();
}

export class RowEchoes {
  public policy: string = "";
  public echoes: Array<RowEcho> = [];
  public summary: RowEchoesSummary = new RowEchoesSummary();

  constructor() {
    this.echoes = Array.from({ length: 5 }, (_, __) => new RowEcho());
  }

  public resetPolicy() {
    this.policy = "";
  }

  public resetSummary() {
    this.summary.name1 = "";
    this.summary.sonatas = [];
    this.summary.total_cost = 0;
    this.summary.main_affix = new StatBuff();
    this.summary.sub_affix = new StatBuff();
  }

  public getEcho(i: number): RowEcho {
    return this.echoes[i];
  }

  public updateSummaryByEchoes() {
    this.resetSummary();
    const name = this.echoes[0].name;
    if (name) {
      this.summary.name1 = name;
    }
    this.echoes.forEach((echo: RowEcho) => {
      this.summary.total_cost += parseFloat(echo.cost);
      const sonata = echo.sonata;
      if (sonata) {
        this.summary.sonatas.push(sonata);
      }
      this.summary.main_affix.addStatBuff(echo.main_affix);
      this.summary.sub_affix.addStatBuff(echo.sub_affix);
    });
  }
}
