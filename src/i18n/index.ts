import { createI18n } from "vue-i18n";

const i18n = createI18n({
  legacy: false,
  locale: "zh_TW",
  fallbackLocale: "zh_TW",
  messages: {
    zh_TW: {
      general: {
        template_id: "模板ID",
        monster_id: "怪物ID",
        team_dps: "隊伍DPS",
        resonator_id: "共鳴者ID",
        resonator_name: "共鳴者名稱",
        resonator_chain: "共鳴鏈",
        resonator_skill_id: "技能ID",
        resonator_energy_regen: "共鳴效率",
        weapon_name: "武器名稱",
        weapon_tune: "武器諧振",
        base_attr: "基礎屬性",
        main_skill_bonuss: "主要技能加成",
        echo_name_1: "聲骸1",
        echo_sonata_1: "合鳴1",
        echo_sonata_2: "合鳴2",
        echo_sonata_3: "合鳴3",
        echo_sonata_4: "合鳴4",
        echo_sonata_5: "合鳴5",
        affixes_15_1: "15有效-1",
        affixes_20_small: "20有效-小Ｏ",
        affixes_20_skill_bonus: "20有效-技能加成",
        time_start: "開始",
        time_end: "結束",
      },
      nav: {
        title: "鳴潮攻略",
        tab: {
          welcome: "Welcome",
          resonator: "共鳴者",
          tier: "Tier",
        },
      },
      resonators: {
        damage_analysis: "傷害分析",
      },
      resonator: {
        header: {
          damage_analysis: "傷害分析",
          damage_comparison: "傷害比較",
        },
        damage_comparison: {
          team_based: "以【隊伍】為基準比較DPS",
          resonator_based: "以【{name}】為基準比較DPS",
          affixes_15_1: "15有效-1",
          affixes_20_small: "20有效-小Ｏ",
          affixes_20_skill_bonus: "20有效-技能加成",
          warning: "注意！這邊的順序不代表隊伍DPS高低，可能會有角色DPS較高，但隊伍DPS變低的狀況。",
        },
      },
      template: {
        header: {
          basic_info: "基本資料",
          resonator: "共鳴者",
          echo: "聲骸",
          damage_analysis: "傷害分析",
          detailed_damage_analysis: "詳細傷害分析",
          echo_damage_comparison: "【{name}】聲骸傷害比較",
          rotation: "輸出手法",
        },
      },
    },
    en: {},
  },
});

export default i18n;
