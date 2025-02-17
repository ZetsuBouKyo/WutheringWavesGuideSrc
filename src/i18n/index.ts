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
          info: "基本資料",
          resonator: "共鳴者",
          echo: "聲骸",
          damage_analysis: "傷害分析",
          damage_comparison: "傷害比較",
        },
        damage_comparison: {
          team_based: "以【隊伍】為基準比較DPS",
          resonator_based: "以【{name}】為基準比較DPS",
          affixes_15_1: "15有效-1",
          affixes_20_small: "20有效-小Ｏ",
          affixes_20_skill_bonus: "20有效-技能加成",
        },
      },
    },
    en: {},
  },
});

export default i18n;
