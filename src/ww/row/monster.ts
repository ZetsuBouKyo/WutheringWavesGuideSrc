import { useMonsterStore } from "@/stores/monster";
export class RowMonster {
  public name: string = "";
  public level: string = "";
  public def: string = "";
  public res_physics: string = "";
  public res_glacio: string = "";
  public res_fusion: string = "";
  public res_electro: string = "";
  public res_aero: string = "";
  public res_spectro: string = "";
  public res_havoc: string = "";
  public _item: { title: string; value: any } = { title: "", value: undefined };

  constructor(monster: any = {}) {
    if (!monster || Object.keys(monster).length === 0) {
      return;
    }
    Object.assign(this, monster);
  }

  public getJson(): object {
    return JSON.parse(JSON.stringify(this));
  }

  public updateByMonsterItem(item: any) {
    if (!item) {
      return;
    }
    const monster = item;

    this.name = monster.name;
    this.level = monster.level;
    this.def = monster.def;
    this.res_physics = monster.res_physics;
    this.res_glacio = monster.res_glacio;
    this.res_fusion = monster.res_fusion;
    this.res_electro = monster.res_electro;
    this.res_aero = monster.res_aero;
    this.res_spectro = monster.res_spectro;
    this.res_havoc = monster.res_havoc;
  }

  public updateByName(name: string) {
    const monsterStore = useMonsterStore();
    const monsterItem = monsterStore.getMonsterItemByName(name);
    if (!monsterItem) {
      return;
    }
    this.updateByMonsterItem(monsterItem.value);
  }
}
