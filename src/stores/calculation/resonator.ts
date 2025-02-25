import { defineStore } from "pinia";

import { useResonatorStore } from "@/stores/resonator";

import { SkillBonusEnum } from "@/interfaces/buff";
import { SkillTypeEnum } from "@/interfaces/skill";

import { StatBuff } from "@/ww/buff";
import { RowResonatorSkill } from "@/ww/resonator";

interface RowResonatorStore {
  id: string;
  no: string;
  name: string;
  base_attr: string;
  main_skill_bonus: string;
  element_zh_tw: string;
  level: string;
  chain: string;
  hp: string;
  atk: string;
  def: string;
  normal_attack_lv: string;
  resonance_skill_lv: string;
  forte_circuit_lv: string;
  resonance_liberation_lv: string;
  intro_skill_lv: string;
  inherent_skill_1: boolean;
  inherent_skill_2: boolean;
  stat_bonus: StatBuff;
  skill: RowResonatorSkill;
  _skill_item: { title: string; value: any };
}

export const useRowResonatorStore = (id: string) => {
  const storeId: string = `row-resonator-${id}`;
  const store: any = defineStore(storeId, {
    state: () => ({
      id: "",
      no: "",
      name: "",
      base_attr: "",
      main_skill_bonus: "",
      element_zh_tw: "",
      level: "90",
      chain: "1",
      hp: "",
      atk: "",
      def: "",
      normal_attack_lv: "10",
      resonance_skill_lv: "10",
      forte_circuit_lv: "10",
      resonance_liberation_lv: "10",
      intro_skill_lv: "10",
      inherent_skill_1: true,
      inherent_skill_2: true,
      stat_bonus: new StatBuff(),
      skill: new RowResonatorSkill(),
      _skill_item: { title: "", value: undefined },
    }),
    actions: {
      async updateRowResonatorByName() {
        const resonatorStore = useResonatorStore();

        // Reset
        this.stat_bonus = new StatBuff();
        this.skill = new RowResonatorSkill();

        const name = this.name as string;
        const no = resonatorStore.getNoByName(name);
        if (!no) {
          return;
        }
        this.no = no;

        const info = await resonatorStore.getInfoByName(name);
        this.element_zh_tw = info.element_zh_tw;
        const stat_bonus = info.stat_bonus;
        Object.keys(stat_bonus).forEach((key: string) => {
          const value = (stat_bonus as any)[key];
          (this.stat_bonus as any)[key] = value;
        });
      },

      updateSkillDmg(skill: any) {
        const skill_type = skill.skill_type;
        let level;
        switch (skill_type) {
          case SkillTypeEnum.NORMAL_ATTACK:
            level = this.normal_attack_lv;
            break;
          case SkillTypeEnum.RESONANCE_SKILL:
            level = this.resonance_skill_lv;
            break;
          case SkillTypeEnum.FORTE_CIRCUIT:
            level = this.forte_circuit_lv;
            break;
          case SkillTypeEnum.RESONANCE_LIBERATION:
            level = this.resonance_liberation_lv;
            break;
          case SkillTypeEnum.INTRO_SKILL:
            level = this.intro_skill_lv;
            break;
          default:
            level = "10";
        }
        this.skill.dmg = skill[`lv${level}`];
      },
      updateSkill(skill: any) {
        this.skill = new RowResonatorSkill();
        this.skill.id = skill.id;
        this.skill.type = skill.skill_type;
        this.skill.base_attr = skill.base_attr;
        this.skill.elment_zh_tw = skill.element;
        this.skill.bonus_types.push(skill.element);
        this.skill.bonus_types.push(skill.bonus_type);
        if (skill.coordinated) {
          this.skill.bonus_types.push(SkillBonusEnum.COORDINATED_ATTACK);
        }
        this.updateSkillDmg(skill);
      },

      updateSkillByItem(item: any) {
        if (!item.title || !item.value) {
          return;
        }
        const skill = item.value;
        this.updateSkill(skill);
      },
    },
  });
  return new store();
};
