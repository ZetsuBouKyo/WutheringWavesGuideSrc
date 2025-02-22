import { mapValueToValue } from "./utils";
import { getRotation } from "./rotation";

export class Template {
  public resonators: Array<{
    resonator_name: string;
    resonator_chain: string;
    resonator_weapon_name: string;
    resonator_weapon_rank: string;
    resonator_inherent_skill_1: boolean;
    resonator_inherent_skill_2: boolean;
    resonator_base_attr: string;
    resonator_skill_bonus: string;
    resonator_energy_regen: string;
    resonator_echo_1: string;
    resonator_echo_sonata_1: string;
    resonator_echo_sonata_2: string;
    resonator_echo_sonata_3: string;
    resonator_echo_sonata_4: string;
    resonator_echo_sonata_5: string;
    resonator_echo_cost_1: string;
    resonator_echo_cost_2: string;
    resonator_echo_cost_3: string;
    resonator_echo_cost_4: string;
    resonator_echo_cost_5: string;
    resonator_echo_affix_1: string;
    resonator_echo_affix_2: string;
    resonator_echo_affix_3: string;
    resonator_echo_affix_4: string;
    resonator_echo_affix_5: string;
  }> = [];
  public rows: Array<any> = [];

  constructor(template: any) {
    Object.assign(this, template);
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
}
