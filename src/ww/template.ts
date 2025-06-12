import Decimal from "decimal.js";

import { AffixPolicyEnum } from "@/types/affix";
import { StatBuffEnum, type TStatBuffEnum } from "@/types/buff";

import { useEchoStore } from "@/stores/echo";
import { ResonatorBuffs, WeaponBuffs, EchoBuffs, SonataBuffs } from "@/stores/buff";

import { RowCalculation, RowCalculationData } from "@/ww/row";
import { RowResonator } from "@/ww/row/resonator";
import { RowWeapon } from "@/ww/row/weapon";
import { RowEchoes } from "@/ww/row/echoes";
import { RowMonster } from "@/ww/row/monster";
import { RowBuff } from "@/ww/row/buff";
import { RowBuffs } from "@/ww/row/buffs";

import { RowAutoFillEchoes } from "@/ww/echoes";
import { getRotation } from "@/ww/rotation";
import { getDecimal, toNumberString, toPercentageString } from "@/ww/utils";

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

  // UI
  public id: number = 0;
  public selected: boolean = false;
  public _item: { title: string; value: RowBuff | undefined } = { title: "", value: undefined };

  constructor(buff: any = {}) {
    if (!buff || Object.keys(buff).length === 0) {
      return;
    }
    Object.assign(this, buff);
    this._item.title = buff.name ? buff.name : "";
  }

  public isEmpty(): boolean {
    if (this.name || this.type || this.value || this.stack || this.duration) {
      return false;
    }
    return true;
  }

  public updateByRowBuff(buff: { title: string; value: RowBuff } | string | any) {
    if (typeof buff === "string") {
      this.name = buff;
      this._item = { title: buff, value: undefined };
    }
    if (buff.title) {
      this.name = buff.title;
    }
    if (buff.value?.type) {
      this.type = buff.value?.type;
    }
    if (buff.value?.value) {
      this.value = buff.value?.value;
    }
    if (buff.value?.duration) {
      this.duration = buff.value?.duration;
    }
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
  public hit: string = "1";
  public buffs: Array<TemplateRowBuff> = [new TemplateRowBuff()];
  public resonating_spin_concerto_regen: string = "";
  public accumulated_resonating_spin_concerto_regen: string = "";
  public time_start: string = "";
  public time_end: string = "";
  public cumulative_time: string = "";
  public comment: string = "";

  // UI
  public id: number = 0;
  public selected: boolean = false;
  public skill_ids: Array<any> = [];

  // Calculation
  public calculation: RowCalculation = new RowCalculation();

  constructor(row: any = {}) {
    if (!row || Object.keys(row).length === 0) {
      return;
    }
    const { buffs, calculation, ...data } = row;
    Object.assign(this, data);
    if (buffs.length > 0) {
      this.buffs = [];
      buffs.forEach((buff: any, i: number) => {
        const b = new TemplateRowBuff(buff);
        b.id = i;
        this.buffs.push(b);
      });
    }
    if (calculation && calculation.data) {
      const data = new RowCalculationData(calculation.data);
      this.calculation = new RowCalculation(data.resonator, data.weapon, data.echoes, data.buffs, data.monster);
    }
  }

  public duplicate(): TemplateRow {
    const data = JSON.parse(JSON.stringify(this));
    const row = new TemplateRow(data);
    return row;
  }

  public areBuffs(): boolean {
    for (const buff of this.buffs) {
      if (!buff.isEmpty()) {
        return true;
      }
    }
    return false;
  }

  public calculate(
    resonator: RowResonator,
    weapon: RowWeapon,
    echoes: RowEchoes,
    buffs: RowBuffs,
    monster: RowMonster,
    ignoreBuffs: Array<string> = [],
  ): RowCalculation {
    const calculation = new RowCalculation();
    calculation.data.resonator = resonator;
    calculation.data.weapon = weapon;
    calculation.data.echoes = echoes;
    calculation.data.monster = monster;
    if (this.hit !== "" || this.hit !== undefined) {
      calculation.data.resonator.skill.hit = this.hit;
    }
    calculation.result.real_dmg_no_crit = this.real_dmg_no_crit;
    calculation.result.real_dmg_crit = this.real_dmg_crit;
    calculation.result.action = this.action;
    calculation.result.time_start = this.time_start;
    calculation.result.time_end = this.time_end;
    calculation.result.buffs = this.buffs;

    // Buffs
    calculation.data.buffs = buffs;
    this.buffs.forEach((buff) => {
      const name = buff.name;
      if (ignoreBuffs.includes(name)) {
        return;
      }
      if (!buff.isEmpty()) {
        const newBuff = new RowBuff();
        newBuff.id = name;
        newBuff.type = buff.type;
        newBuff.value = buff.value;
        newBuff.stack = buff.stack;
        newBuff.duration = buff.duration;

        calculation.data.buffs.buffs.push(newBuff);
      }
    });

    calculation.calculate();
    return calculation;
  }
}

export class TemplateCalculationResonator {
  public resonator: RowResonator = new RowResonator();
  public weapon: RowWeapon = new RowWeapon();
  public echoes: RowEchoes = new RowEchoes();

  constructor(r: any = {}) {
    if (!r || Object.keys(r).length === 0) {
      return;
    }
    const { resonator, weapon, echoes } = r;
    if (resonator) {
      this.resonator = new RowResonator(resonator);
    }
    if (weapon) {
      this.weapon = new RowWeapon(weapon);
    }
    if (echoes) {
      if (resonator && resonator.name && !echoes.resonator_name) {
        echoes.resonator_name = resonator.name;
      }
      this.echoes = new RowEchoes(echoes);
    }
  }

  public getId(): string {
    let s = "";

    const policy = this.echoes.policy;
    if (policy) {
      s = `[${policy}]`;
    }

    const r = this.resonator.getId();
    if (r) {
      s = `${s} ${r}`;
    }

    const w = this.weapon.getId();
    if (w) {
      s = `${s}${w}`;
    }

    const e = this.echoes.getId();
    if (e) {
      s = `${s} ${e}`;
    }

    return s;
  }

  public getHp(): string {
    const r = getDecimal(this.resonator.hp);
    const p = getDecimal(this.getStat(StatBuffEnum.HP_P));
    const e = getDecimal(this.echoes.summary.getStat(StatBuffEnum.HP));
    return toNumberString(r.times(p.plus(getDecimal(1))).plus(e));
  }

  public getAtk(): string {
    const r = getDecimal(this.resonator.atk);
    const w = getDecimal(this.weapon.atk);
    const p = getDecimal(this.getStat(StatBuffEnum.ATK_P));
    const e = getDecimal(this.echoes.summary.getStat(StatBuffEnum.ATK));
    return toNumberString(
      r
        .plus(w)
        .times(p.plus(getDecimal(1)))
        .plus(e),
    );
  }

  public getDef(): string {
    const r = getDecimal(this.resonator.def);
    const p = getDecimal(this.getStat(StatBuffEnum.DEF_P));
    const e = getDecimal(this.echoes.summary.getStat(StatBuffEnum.DEF));
    return toNumberString(r.times(p.plus(getDecimal(1))).plus(e));
  }

  public getCritRate(): string {
    let crit_rate = getDecimal(this.getStat(StatBuffEnum.CRIT_RATE));
    crit_rate = crit_rate.plus(new Decimal(0.05));
    if (crit_rate.gte(new Decimal(1))) {
      crit_rate = new Decimal(1);
    }
    return toPercentageString(crit_rate);
  }

  public getCritDmg(): string {
    let crit_dmg = getDecimal(this.getStat(StatBuffEnum.CRIT_DMG));
    crit_dmg = crit_dmg.plus(getDecimal(1.5));
    return toPercentageString(crit_dmg);
  }

  public getStat(s: TStatBuffEnum): string {
    const r = getDecimal(this.resonator.stat_bonus[s]);
    const w = getDecimal(this.weapon.stat_bonus[s]).plus(getDecimal(this.weapon.passive_stat_bonus[s]));
    const e = getDecimal(this.echoes.summary.main_affix[s])
      .plus(getDecimal(this.echoes.summary.sub_affix[s]))
      .plus(getDecimal(this.echoes.summary.stat_bonus[s]));
    return r.plus(w).plus(e).toString();
  }

  public getEnergyRegen(): string {
    const r = getDecimal(this.resonator.stat_bonus[StatBuffEnum.ENERGY_REGEN]);
    const w = getDecimal(this.weapon.stat_bonus[StatBuffEnum.ENERGY_REGEN]).plus(
      getDecimal(this.weapon.passive_stat_bonus[StatBuffEnum.ENERGY_REGEN]),
    );
    const e = getDecimal(this.echoes.summary.main_affix[StatBuffEnum.ENERGY_REGEN])
      .plus(getDecimal(this.echoes.summary.sub_affix[StatBuffEnum.ENERGY_REGEN]))
      .plus(getDecimal(this.echoes.summary.stat_bonus[StatBuffEnum.ENERGY_REGEN]));
    return toPercentageString(r.plus(w).plus(e).plus(new Decimal(1)));
  }

  public getBuffsForSelect(): Array<{ title: string; value: RowBuff }> {
    // Resonator
    const buffs: Array<{ title: string; value: RowBuff }> = [];
    if (this.resonator.name) {
      const resonatorBuffs = ResonatorBuffs.getBuffs(this.resonator.name);
      resonatorBuffs.forEach((buff) => {
        buffs.push({
          title: buff.id,
          value: buff,
        });
      });
    }
    // Weapon
    if (this.weapon.name) {
      const weaponBuffs = WeaponBuffs.getBuffs(this.weapon.name);
      weaponBuffs.forEach((buff) => {
        buffs.push({
          title: buff.id,
          value: buff,
        });
      });
    }
    // Echo
    if (this.echoes.echoes[0].name) {
      const echoBuffs = EchoBuffs.getBuffs(this.echoes.echoes[0].name);
      echoBuffs.forEach((buff) => {
        buffs.push({
          title: buff.id,
          value: buff,
        });
      });
    }
    // Sonata
    const s = new Set(this.echoes.getSonatas());
    const sonatas = Array.from(s);
    sonatas.forEach((sonata) => {
      if (!sonata) {
        return;
      }
      const sonataBuffs = SonataBuffs.getBuffs(sonata);
      sonataBuffs.forEach((buff) => {
        buffs.push({
          title: buff.id,
          value: buff,
        });
      });
    });

    return buffs;
  }
}

export class TemplateCalculation {
  public resonators: Array<TemplateCalculationResonator> = [
    new TemplateCalculationResonator(),
    new TemplateCalculationResonator(),
    new TemplateCalculationResonator(),
  ];
  public monster: RowMonster = new RowMonster(); // TODO: deprecate?

  constructor(calculation: any = {}) {
    if (!calculation || Object.keys(calculation).length === 0) {
      return;
    }
    const { resonators, monster } = calculation;

    if (resonators) {
      resonators.forEach((resonator: any, i: number) => {
        switch (i) {
          case 0:
            this.resonators[0] = new TemplateCalculationResonator(resonator);
            break;
          case 1:
            this.resonators[1] = new TemplateCalculationResonator(resonator);
            break;
          case 2:
            this.resonators[2] = new TemplateCalculationResonator(resonator);
            break;
          default:
            break;
        }
      });
    }

    if (monster) {
      this.monster = new RowMonster(monster);
    }
  }
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
  public rows: Array<TemplateRow> = [];

  public calculation: TemplateCalculation = new TemplateCalculation();
  public calculated: boolean = false;

  constructor(template: any = {}) {
    if (!template || Object.keys(template).length === 0) {
      this.resonators = [new TemplateResonator(), new TemplateResonator(), new TemplateResonator()];
      return;
    }
    const { resonators, rows, calculation, ...data } = template;
    Object.assign(this, data);
    if (resonators && resonators.length > 0) {
      this.resonators = [];
      resonators.forEach((resonator: any) => {
        this.resonators.push(new TemplateResonator(resonator));
      });
    }

    if (rows && rows.length > 0) {
      this.rows = [];
      rows.forEach((row: any) => {
        this.rows.push(new TemplateRow(row));
      });
    }

    if (calculation) {
      this.calculation = new TemplateCalculation(calculation);
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
    this.calculation.resonators[i].echoes.echoes[0].updateByEchoItem(echoItem1);

    this.calculation.resonators[i].echoes.echoes[0].sonata = this.resonators[i].resonator_echo_sonata_1;
    this.calculation.resonators[i].echoes.echoes[1].sonata = this.resonators[i].resonator_echo_sonata_2;
    this.calculation.resonators[i].echoes.echoes[2].sonata = this.resonators[i].resonator_echo_sonata_3;
    this.calculation.resonators[i].echoes.echoes[3].sonata = this.resonators[i].resonator_echo_sonata_4;
    this.calculation.resonators[i].echoes.echoes[4].sonata = this.resonators[i].resonator_echo_sonata_5;

    if (this.resonators[i].resonator_echo_cost_1) {
      this.calculation.resonators[i].echoes.echoes[0].cost = this.resonators[i].resonator_echo_cost_1;
    }
    this.calculation.resonators[i].echoes.echoes[1].cost = this.resonators[i].resonator_echo_cost_2;
    this.calculation.resonators[i].echoes.echoes[2].cost = this.resonators[i].resonator_echo_cost_3;
    this.calculation.resonators[i].echoes.echoes[3].cost = this.resonators[i].resonator_echo_cost_4;
    this.calculation.resonators[i].echoes.echoes[4].cost = this.resonators[i].resonator_echo_cost_5;
    const cost1 = this.calculation.resonators[i].echoes.echoes[0].cost;
    let cost2 = this.calculation.resonators[i].echoes.echoes[1].cost;
    let cost3 = this.calculation.resonators[i].echoes.echoes[2].cost;
    let cost4 = this.calculation.resonators[i].echoes.echoes[3].cost;
    let cost5 = this.calculation.resonators[i].echoes.echoes[4].cost;

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

      if (!cost2 && !cost3 && !cost4 && !cost5) {
        cost2 = "3";
        cost3 = "3";
        cost4 = "1";
        cost5 = "1";
      }
      auto.update(cost1, cost2, cost3, cost4, cost5, abbr1, abbr2, abbr3, abbr4, abbr5);
    }
  }

  public async init() {
    // Resonators
    this.resonators.forEach(async (_, i) => {
      await this.initResonator(i);
    });
  }

  public getJson(): object {
    return JSON.parse(JSON.stringify(this));
  }

  public getRowBuffNames(): Array<string> {
    const s = new Set();
    this.rows.forEach((row) => {
      row.buffs.forEach((buff) => {
        const name = buff.name;
        if (!name) {
          return;
        }
        s.add(name);
      });
    });
    const names = Array.from(s) as Array<string>;
    return names;
  }

  public getRowBuffsForSelect(): Array<{ title: string; value: RowBuff }> {
    // Resonators
    let buffs: Array<{ title: string; value: RowBuff }> = [];
    this.calculation.resonators.forEach((resonator) => {
      const resonatorBuffs = resonator.getBuffsForSelect();
      buffs = [...buffs, ...resonatorBuffs];
    });

    return buffs;
  }

  public getRowResonator(resonatorName: string): RowResonator | undefined {
    for (const resonator of this.calculation.resonators) {
      if (resonatorName === resonator.resonator.name) {
        return resonator.resonator;
      }
    }
  }

  public getRowWeapon(resonatorName: string): RowWeapon | undefined {
    for (const resonator of this.calculation.resonators) {
      if (resonatorName === resonator.resonator.name) {
        return resonator.weapon;
      }
    }
  }

  public getRowEchoes(resonatorName: string): RowEchoes | undefined {
    for (const resonator of this.calculation.resonators) {
      if (resonatorName === resonator.resonator.name) {
        return resonator.echoes;
      }
    }
  }

  public getRowMonster(): RowMonster {
    return this.calculation.monster;
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
    for (const resonator of this.resonators) {
      resonatorNames.push(resonator.resonator_name);
    }
    return resonatorNames;
  }

  public getResonatorElementEn(name: string): string {
    for (const resonator of this.calculation.resonators) {
      if (resonator.resonator.name === name) {
        return resonator.resonator.element_en;
      }
    }
    return "";
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

  public getRowCalculation(i: number, ignoreBuffs: Array<string> = []): RowCalculation | undefined {
    if (this.rows.length <= i) {
      return;
    }
    const row = this.rows[i];

    // Resonator
    const name = row.resonator_name;
    if (!name) {
      return;
    }
    let resonator = this.getRowResonator(name);
    if (!resonator) {
      return;
    }
    resonator = resonator.duplicate();
    resonator.updateSkillById(row.skill_id);

    // Weapon
    let weapon = this.getRowWeapon(name);
    if (!weapon) {
      return;
    }
    weapon = weapon.duplicate();

    // Echoes
    let echoes = this.getRowEchoes(name);
    if (!echoes) {
      return;
    }
    echoes = echoes.duplicate();

    // Buffs
    const buffs = new RowBuffs();

    // Monster
    const monster = new RowMonster();
    const monsterId = this.monster_id;
    monster.updateByName(monsterId);

    const calculation = row.calculate(resonator, weapon, echoes, buffs, monster, ignoreBuffs);
    return calculation;
  }

  public getCalculatedRows(ignoreBuffs: Array<string> = []): Array<TemplateRow> {
    const rows: Array<TemplateRow> = [];
    this.rows.forEach((row, i) => {
      const newRow = row.duplicate();
      const calculation = this.getRowCalculation(i, ignoreBuffs);
      if (calculation) {
        newRow.calculation = calculation;
        rows.push(newRow);
      }
    });
    return rows;
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

  public calculateRow(i: number) {
    const calculation = this.getRowCalculation(i);
    if (calculation === undefined) {
      return;
    }
    this.rows[i].calculation = calculation;
  }

  public async calculate() {
    this.calculated = true;
    for (let i = 0; i < this.rows.length; i++) {
      this.calculateRow(i);
    }
  }
}
