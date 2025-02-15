import { createI18n } from 'vue-i18n';

const i18n = createI18n({
  legacy: false,
  locale: 'zh_TW',
  fallbackLocale: 'zh_TW',
  messages: {
    zh_TW: {
      nav: {
        title: '鳴潮攻略',
        tab: {
          welcome: 'Welcome',
          resonator: '共鳴者',
          tier: 'Tier',
        },
      },
      resonators: {
        damage_analysis: '傷害分析',
      }
    },
    en: {
    },
  },
});

export default i18n;