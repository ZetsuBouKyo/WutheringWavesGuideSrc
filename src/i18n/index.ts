import { createI18n } from "vue-i18n";

import { zh_TW } from "./zh_TW";

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: "zh_TW",
  fallbackLocale: "zh_TW",
  messages: {
    zh_TW: {
      "": "",
      calculation: {
        tab: {
          simple: "簡易計算",
          template: "模板計算",
          rotation: "排軸",
        },
        region: {
          attr: "基礎屬性區",
          skill_dmg: "技能傷害區",
          magnifier: "倍率區",
          amplifier: "加深區",
          bonus: "加成區",
          crit: "暴擊區",
          def: "防禦區",
          res: "抗性區",
        },
        result: "計算結果",
      },
      general: {
        comment: "註解",
        output_image_width: "輸出圖片寬度",
        delete: "刪除",
        cancel: "取消",
        confirm: "確定",
        row: "列",
        basic_info: "基本資料",
        ignore_def: "忽視防禦",
        reduce_res: "抗性降低",
        fixed_value: "固定數值",
        percentage: "百分比",
        manual_input: "手動輸入",
        auto_fill: "自動帶入",
        quick_input: "快捷輸入",
        main_affix: "主詞條",
        fixed_main_affix: "固定主詞條",
        sub_affix: "副詞條",
        insert_above: "向上插入",
        insert_above_at_n: "第{n}列向上插入",
        insert_below: "向下插入",
        insert_below_at_n: "第{n}列向下插入",
        insert_bottom: "底部新增",
        load_file: "讀檔",
        download_image: "下載圖片",
        download_json: "下載JSON",
        result: "結果",
        sonata: "合鳴",
        nth_sonata: "合鳴{n}",
        error: "錯誤",
        stat_bonus: "屬性加成",
        passive_stat_bonus: "被動屬性加成",
        calculate: "計算",
        monster: "怪物",
        monster_level: "怪物等級",
        back_to: "回到{to}",
        name: "名稱",
        real_damage: "實際傷害",
        real_crit_damage: "實際暴擊傷害",
        detailed_damage: "詳細傷害",
        calculated_damage: "計算傷害",
        calculated_crit_damage: "計算暴擊傷害",
        calculate_expected_damage: "計算期望傷害",
        action: "動作",
        skill_bonus_type: "技能加成種類",
        hits: "段數",
        n_hits: "{n}段",
        skill: "技能",
        skill_level: "技能等級",
        skill_base_attr: "技能基礎屬性",
        skill_damage_ratio: "技能傷害倍率",
        nth_row: "第{n}列",
        nth_row_comment: "第{n}列註解",
        buff: "增益",
        buff_type: "增益種類",
        value: "數值",
        stack: "層數",
        calculation: "計算",
        damage: "傷害",
        dps: "DPS",
        lv: "LV.",
        level: "等級",
        hp: "生命",
        hp_p: "生命百分比",
        atk: "攻擊",
        atk_p: "攻擊百分比",
        def: "防禦",
        def_p: "防禦百分比",
        crit_rate: "暴擊",
        crit_dmg: "暴擊傷害",
        energy_regen: "共鳴效率",
        // Bonus
        bonus_resonance_skill: "共鳴技能傷害加成",
        bonus_basic_attack: "普攻傷害加成",
        bonus_heavy_attack: "重擊傷害加成",
        bonus_resonance_liberation: "共鳴解放傷害加成",
        bonus_healing: "治療效果加成",
        bonus_physics: "物理傷害加成",
        bonus_glacio: "冷凝傷害加成",
        bonus_fusion: "熱熔傷害加成",
        bonus_electro: "導電傷害加成",
        bonus_aero: "氣動傷害加成",
        bonus_spectro: "衍射傷害加成",
        bonus_havoc: "湮滅傷害加成",
        // Res
        res_physics: "物理傷害抗性",
        res_glacio: "冷凝傷害抗性",
        res_fusion: "熱熔傷害加成",
        res_electro: "導電傷害抗性",
        res_aero: "氣動傷害抗性",
        res_spectro: "衍射傷害抗性",
        res_havoc: "湮滅傷害抗性",
        resonator_level: "共鳴者等級",
        resonator_skills: {
          normal_attack: "常態攻擊",
          resonance_skill: "共鳴技能",
          forte_circuit: "共鳴回路",
          resonance_liberation: "共鳴解放",
          intro_skill: "變奏技能",
          outro_skill: "延奏技能",
          normal_attack_lv: "常態攻擊LV",
          resonance_skill_lv: "共鳴技能LV",
          forte_circuit_lv: "共鳴回路LV",
          resonance_liberation_lv: "共鳴解放LV",
          intro_skill_lv: "變奏技能LV",
          inherent_skill_1: "固有技能1",
          inherent_skill_2: "固有技能2",
        },
        resonator_bonus: {
          basic: "普攻",
          heavy: "重擊",
          skill: "共鳴技能",
          liberation: "共鳴解放",
          intro: "變奏",
          outro: "延奏",
          echo: "聲骸",
          coordinated_attack: "協同攻擊",
          none: "無",
        },
        template_id: "模板ID",
        monster_id: "怪物ID",
        team_dps: "隊伍DPS",
        resonator_dps: "共鳴者DPS",
        resonator_damage: "共鳴者傷害",
        resonator: "共鳴者",
        resonator_id: "共鳴者ID",
        resonator_name: "共鳴者名稱",
        resonator_chain: "共鳴鏈",
        resonator_skill_id: "技能ID",
        resonator_energy_regen: "共鳴效率",
        weapon: "武器",
        weapon_name: "武器名稱",
        weapon_tune: "武器諧振",
        tune: "諧振",
        base_attr: "基礎屬性",
        main_skill_bonus: "主要技能加成",
        nth_echo: "聲骸{n}",
        echo: "聲骸",
        echo_policy: "聲骸策略",
        echo_cost: "Cost",
        echo_name_1: "聲骸1",
        echo_sonata_1: "合鳴1",
        echo_sonata_2: "合鳴2",
        echo_sonata_3: "合鳴3",
        echo_sonata_4: "合鳴4",
        echo_sonata_5: "合鳴5",
        affixes_15_1: "聲骸詞條 15有效-1",
        affixes_20_small: "聲骸詞條 20有效-小Ｏ",
        affixes_20_skill_bonus: "聲骸詞條 20有效-技能加成",
        time_start: "開始",
        time_end: "結束",
        rotation: "輸出手法",
        rotation_time: "軸長",
        denominator: "分母",
        tiers: "Tiers",
        tier_list: "Tier List",
        disclaimer: "免責聲明",
      },
      nav: {
        title: "鳴潮攻略",
        tab: {
          welcome: "Welcome",
          docs: "文件",
          resonator: "共鳴者",
          tiers: "Tiers",
          tool: "工具",
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
        },
        damage_analysis: {
          team_damage_distribution: "隊伍傷害占比",
          buff_damage_distribution: "增益傷害占比",
          skill_damage_distribution: "技能傷害占比",
          skill_type_damage_distribution: "技能種類傷害占比",
          skill_bonus_damage_distribution: "技能加成傷害占比",
          rotation_damage: "傷害列表",
          detailed_damage: "詳細傷害",
        },
      },
      tiers: {
        t01: "5星 0鏈",
        t11: "5星 1鏈",
        t21: "5星 2鏈",
        t31: "5星 3鏈",
        t41: "5星 4鏈",
        t51: "5星 5鏈",
        t61: "5星 6鏈",
        t65: "5星 6鏈5諧",
      },
      rotation: {
        width: "請輸入數字加上px或是%，例如: 1080px、100%......。",
      },
      ...zh_TW,
    },
    en: {},
  },
});

export default i18n;
