import { AffixPolicyEnum } from "@/types/affix";

import { getRotation } from "@/ww/rotation";
import { RowResonator } from "@/ww/row/resonator";
import { RowWeapon } from "@/ww/row/weapon";
import { RowEchoes } from "@/ww/row/echoes";
import { RowMonster } from "@/ww/row/monster";

import { useEchoStore } from "@/stores/echo";

import { RowAutoFillEchoes } from "@/ww/echoes";

export class TemplateResonator {
  public resonator_name: string = "";
  public resonator_chain: string = "";
  public resonator_weapon_name: string = "";
  public resonator_weapon_rank: string = "";
  public resonator_inherent_skill_1: boolean = true;
  public resonator_inherent_skill_2: boolean = true;
  public resonator_base_attr: string = "";
  public resonator_skill_bonus: string = "";
  public resonator_energy_regen: string = "";
  public resonator_echo_1: string = "";
  public resonator_echo_sonata_1: string = "";
  public resonator_echo_sonata_2: string = "";
  public resonator_echo_sonata_3: string = "";
  public resonator_echo_sonata_4: string = "";
  public resonator_echo_sonata_5: string = "";
  public resonator_echo_cost_1: string = "";
  public resonator_echo_cost_2: string = "";
  public resonator_echo_cost_3: string = "";
  public resonator_echo_cost_4: string = "";
  public resonator_echo_cost_5: string = "";
  public resonator_echo_affix_1: string = "";
  public resonator_echo_affix_2: string = "";
  public resonator_echo_affix_3: string = "";
  public resonator_echo_affix_4: string = "";
  public resonator_echo_affix_5: string = "";

  public sub_tab: "resonator" | "echo" = "resonator";

  constructor(resonator: any = {}) {
    if (Object.keys(resonator).length === 0) {
      return;
    }
    Object.assign(this, resonator);
  }
}

export class TemplateRowBuff {
  public name: string = "";
  public type: string = "";
  public value: string = "";
  public stack: string = "";
  public duration: string = "";

  constructor(buff: any = {}) {
    if (Object.keys(buff).length === 0) {
      return;
    }
    Object.assign(this, buff);
  }
}

export class TemplateRow {
  public labels: Array<string> = [];
  public resonator_name: string = "";
  public real_dmg_no_crit: string = "";
  public real_dmg_crit: string = "";
  public action: string = "";
  public skill_id: string = "";
  public skill_bonus_type: string = "";
  public hit: string = "";
  public buffs: Array<TemplateRowBuff> = [];
  public resonating_spin_concerto_regen: string = "";
  public accumulated_resonating_spin_concerto_regen: string = "";
  public time_start: string = "";
  public time_end: string = "";
  public cumulative_time: string = "";
  public comment: string = "";

  constructor(row: any = {}) {
    if (Object.keys(row).length === 0) {
      return;
    }
    const { buffs, ...data } = row;
    Object.assign(this, data);
    if (buffs.length > 0) {
      this.buffs = [];
      buffs.forEach((buff: any) => {
        this.buffs.push(new TemplateRowBuff(buff));
      });
    }
  }
}

export class TemplateCalculationResonator {
  public resonator: RowResonator = new RowResonator();
  public weapon: RowWeapon = new RowWeapon();
  public echoes: RowEchoes = new RowEchoes();
}

export class TemplateCalculation {
  public resonators: Array<TemplateCalculationResonator> = [
    new TemplateCalculationResonator(),
    new TemplateCalculationResonator(),
    new TemplateCalculationResonator(),
  ];
  public monster: RowMonster = new RowMonster();
}

export class Template {
  public hashed_id: string = "";
  public id: string = "";
  public labels: Array<{ name: string; duration_1: string; duration_2: string }> = [];
  public test_resonator_id_1: string = "";
  public test_resonator_id_2: string = "";
  public test_resonator_id_3: string = "";
  public duration_1: string = "";
  public duration_2: string = "";
  public monster_id: string = "";
  public description: string = "";
  public resonators: Array<TemplateResonator> = [];
  public rows: Array<any> = [];

  public calculation: TemplateCalculation = new TemplateCalculation();

  constructor(template: any = {}) {
    if (Object.keys(template).length === 0) {
      this.resonators = [new TemplateResonator(), new TemplateResonator(), new TemplateResonator()];
      return;
    }
    const { resonators, rows, ...data } = template;
    Object.assign(this, data);
    if (resonators.length > 0) {
      this.resonators = [];
      resonators.forEach((resonator: any) => {
        this.resonators.push(new TemplateResonator(resonator));
      });
    }

    if (rows.length > 0) {
      this.rows = [];
      rows.forEach((row: any) => {
        this.rows.push(new TemplateRow(row));
      });
    }
  }

  public async initResonator(i: number) {
    const echoStore = useEchoStore();

    this.calculation.resonators[i].resonator.name = this.resonators[i].resonator_name;
    await this.calculation.resonators[i].resonator.updateByName();
    this.calculation.resonators[i].resonator.chain = this.resonators[i].resonator_chain;
    this.calculation.resonators[i].resonator.energy_regen = this.resonators[i].resonator_energy_regen;
    if (!this.resonators[i].resonator_inherent_skill_1) {
      this.calculation.resonators[i].resonator.inherent_skill_1 = false;
    }
    if (!this.resonators[i].resonator_inherent_skill_2) {
      this.calculation.resonators[i].resonator.inherent_skill_2 = false;
    }

    // Weapon
    this.calculation.resonators[i].weapon.name = this.resonators[i].resonator_weapon_name;
    this.calculation.resonators[i].weapon.tune = this.resonators[i].resonator_weapon_rank;
    await this.calculation.resonators[i].weapon.updateRowWeaponByName();

    // Echoes
    this.calculation.resonators[i].echoes.base_attr = this.resonators[i].resonator_base_attr;
    this.calculation.resonators[i].echoes.main_skill_bonus = this.resonators[i].resonator_skill_bonus;
    this.calculation.resonators[i].echoes.echoes[0].name = this.resonators[i].resonator_echo_1;
    const echoItem1 = echoStore.getEchoItemForCalculationByName(this.resonators[i].resonator_echo_1);
    this.calculation.resonators[i].echoes.echoes[0]._item = echoItem1;

    this.calculation.resonators[i].echoes.echoes[0].sonata = this.resonators[i].resonator_echo_sonata_1;
    this.calculation.resonators[i].echoes.echoes[1].sonata = this.resonators[i].resonator_echo_sonata_2;
    this.calculation.resonators[i].echoes.echoes[2].sonata = this.resonators[i].resonator_echo_sonata_3;
    this.calculation.resonators[i].echoes.echoes[3].sonata = this.resonators[i].resonator_echo_sonata_4;
    this.calculation.resonators[i].echoes.echoes[4].sonata = this.resonators[i].resonator_echo_sonata_5;

    this.calculation.resonators[i].echoes.echoes[0].cost = this.resonators[i].resonator_echo_cost_1;
    if (!this.calculation.resonators[i].echoes.echoes[0].cost) {
      if (echoItem1.value && echoItem1.value.cost) {
        this.calculation.resonators[i].echoes.echoes[0].cost = echoItem1.value.cost;
      }
    }
    this.calculation.resonators[i].echoes.echoes[1].cost = this.resonators[i].resonator_echo_cost_2;
    this.calculation.resonators[i].echoes.echoes[2].cost = this.resonators[i].resonator_echo_cost_3;
    this.calculation.resonators[i].echoes.echoes[3].cost = this.resonators[i].resonator_echo_cost_4;
    this.calculation.resonators[i].echoes.echoes[4].cost = this.resonators[i].resonator_echo_cost_5;
    const cost1 = this.calculation.resonators[i].echoes.echoes[0].cost;
    const cost2 = this.calculation.resonators[i].echoes.echoes[1].cost;
    const cost3 = this.calculation.resonators[i].echoes.echoes[2].cost;
    const cost4 = this.calculation.resonators[i].echoes.echoes[3].cost;
    const cost5 = this.calculation.resonators[i].echoes.echoes[4].cost;

    const abbr1 = this.resonators[i].resonator_echo_affix_1;
    const abbr2 = this.resonators[i].resonator_echo_affix_2;
    const abbr3 = this.resonators[i].resonator_echo_affix_3;
    const abbr4 = this.resonators[i].resonator_echo_affix_4;
    const abbr5 = this.resonators[i].resonator_echo_affix_5;

    if (!cost1 || cost1 === "4") {
      if (!this.calculation.resonators[i].echoes.policy) {
        this.calculation.resonators[i].echoes.policy = AffixPolicyEnum.AFFIXES_15_1;
      }
      const auto = new RowAutoFillEchoes(
        this.calculation.resonators[i].resonator,
        this.calculation.resonators[i].weapon,
        this.calculation.resonators[i].echoes,
      );

      auto.update(cost1, cost2, cost3, cost4, cost5, abbr1, abbr2, abbr3, abbr4, abbr5);
    }
  }

  public async init() {
    // Resonators
    this.resonators.forEach(async (resonator, i) => {
      await this.initResonator(i);
    });
  }

  public getResonatorEcho1(resonatorName: string): string {
    for (const resonator of this.resonators) {
      if (resonatorName === resonator.resonator_name) {
        return resonator.resonator_echo_1;
      }
    }
    return "";
  }

  public getResonatorNames(): Array<string> {
    const resonatorNames: Array<string> = [];
    this.resonators.forEach((resonator: any) => {
      resonatorNames.push(resonator.resonator_name);
    });
    return resonatorNames;
  }

  public getRotation(): any {
    const rows = this.rows;
    return getRotation(rows);
  }

  public getRotationIndices(): Array<string> {
    const indices: Array<string> = [];
    const rotation = this.getRotation();
    rotation.forEach((r: any) => {
      const actions = r.actions;
      actions.forEach((action: any) => {
        const i = action.index0Based;
        indices.push(i);
      });
    });
    return indices;
  }

  public async updateByResonatorName(i: number) {
    await this.initResonator(i);
  }

  public updateResonatorByCalculation(i: number) {
    this.resonators[i].resonator_chain = this.calculation.resonators[i].resonator.chain;
    this.resonators[i].resonator_energy_regen = this.calculation.resonators[i].resonator.energy_regen;
    this.resonators[i].resonator_inherent_skill_1 = this.calculation.resonators[i].resonator.inherent_skill_1;
    this.resonators[i].resonator_inherent_skill_2 = this.calculation.resonators[i].resonator.inherent_skill_2;

    this.resonators[i].resonator_weapon_name = this.calculation.resonators[i].weapon.name;
    this.resonators[i].resonator_weapon_rank = this.calculation.resonators[i].weapon.tune;
  }
}
