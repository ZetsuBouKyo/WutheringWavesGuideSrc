<template>
  <div v-if="info && type" class="f-flex flex-column" :key="type">
    <div :class="`d-flex text-${info.element_en} font-weight-bold my-1`">
      {{ $t(info.skill_infos[type].name) }}
    </div>
    <div class="bg-blue-grey-darken-4 pa-2" v-html="getRichText(info.skill_infos[type].description)">
    </div>
    <!-- <v-tooltip location="bottom">
      <v-data-table class="table my-1" :items="skillTable" disable-sort hide-default-footer
        :items-per-page="skillTable.length + 1" />
      <template v-slot:activator="{ props }">
        <div v-bind="props">
          123
        </div>
      </template>
</v-tooltip> -->
    <v-data-table v-if="skillInfoTable.length > 0" class="table my-1" :items="skillInfoTable" disable-sort
      hide-default-footer :items-per-page="skillInfoTable.length + 1">
      <template v-slot:item.LV10="{ item }">
        <v-tooltip v-if="getToolTipTable(item.LV10).length > 0" location="left">
          <v-data-table class="table" :items="getToolTipTable(item.LV10)" disable-sort hide-default-footer>
            <template v-slot:item="{ item, index }">
              <tr :class="{ 'text-highlight font-weight-bold': item[t('general.id')] === t('general.sum') }">
                <td>{{ item[t('general.id')] }}</td>
                <td>{{ item[t('general.element')] }}</td>
                <td>{{ item[t('general.base_attr')] }}</td>
                <td>{{ item[t('general.skill_bonus_type')] }}</td>
                <td>{{ item["LV10"] }}</td>
                <td>{{ item[t('general.resonance_energy_regen')] }}</td>
                <td>{{ item[t('general.concerto_regen')] }}</td>
              </tr>
            </template>
          </v-data-table>
          <template v-slot:activator="{ props }">
            <span v-bind="props" class="cursor-pointer">
              {{ item.LV10 }}
            </span>
          </template>
        </v-tooltip>
        <span v-else v-bind="props">
          {{ item.LV10 }}
        </span>
      </template>
    </v-data-table>
    <v-expansion-panels v-if="skillTable.length > 0">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <span class="text-highlight font-weight-bold">
            {{ $t('general.detailed_skill_info') }}
          </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table class="table my-1" :items="skillTable" disable-sort hide-default-footer
            :items-per-page="skillTable.length + 1" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'

import { SkillBonusEnum } from "@/types/buff";
import { SkillTypeEnum } from "@/types/skill";

import { ResonatorInfo } from "@/ww/resonator";
import { getFormatString, getRichText } from "@/ww/utils"

const { t } = useI18n()

const props = defineProps({
  info: {
    type: Object as PropType<ResonatorInfo>,
    default: new ResonatorInfo()
  },
  type: {
    type: String,
    default: ""
  }
});

function sumLV(lv: string) {
  if (!lv.includes("%")) {
    return ""
  }
  const safeCalc = (expr: string): number => {
    return Function('"use strict";return (' + expr + ')')() as number;
  };

  const sanitized = lv
    .replace(/[^\d.%+\-*/]/g, "") // 移除中文字等
    .replace(/(\d+(\.\d+)?)%/g, (_, num: string) =>
      (parseFloat(num) / 100).toString()
    );

  const totalSafe = safeCalc(sanitized) * 100;
  return totalSafe.toFixed(2) + "%";
}

const lv10ToSkillKeys: Array<string> = [
  t('general.element'),
  t('general.base_attr'),
  t('general.skill_bonus_type'),
  t('general.resonance_energy_regen'),
  t('general.concerto_regen'),
]
const lv10ToSkill: any = {}

const detailedSkills: any = {}
const skillTable = reactive<Array<any>>([])
const skills = props.info.skills
for (const skill of skills) {
  const id = skill.id
  const type = skill.type
  const lv10 = skill.lv10
  const skill_type = skill.skill_type

  if (type !== "Damage" || !lv10 || !props.type || skill_type !== SkillTypeEnum[props.type.toUpperCase() as keyof typeof SkillTypeEnum]) {
    continue
  }
  const row: any = {}

  const skill_bonus_types = []
  if (skill.bonus_type) {
    skill_bonus_types.push(skill.bonus_type)
  }
  if (skill.bonus_type_2) {
    skill_bonus_types.push(skill.bonus_type_2)
  }
  if (skill.coordinated) {
    skill_bonus_types.push(SkillBonusEnum.COORDINATED_ATTACK)
  }

  row[t('general.id')] = id
  row[t('general.element')] = skill.element
  row[t('general.base_attr')] = skill.base_attr
  row[t('general.skill_bonus_type')] = skill_bonus_types.join(", ")
  row["LV10"] = lv10
  row[t('general.resonance_energy_regen')] = skill.resonance_energy_regen
  row[t('general.concerto_regen')] = skill.concerto_regen
  skillTable.push(row)
  detailedSkills[id] = skill

  if (lv10 in lv10ToSkill) {
    const row0 = lv10ToSkill[lv10][0]
    for (const key of lv10ToSkillKeys) {
      if (row[key] !== row0[key]) {
        lv10ToSkill[lv10].push(row)
      }
    }
  } else {
    lv10ToSkill[lv10] = [row]
  }
}

function getToolTipTable(lv: string) {
  const table: Array<any> = []
  const percentages = lv.match(/\d+(\.\d+)?%/g) || [];
  for (const percentage of percentages) {
    const rows = lv10ToSkill[percentage]
    if (!rows) {
      continue
    }
    for (const row of rows) {
      table.push(row)
    }
  }
  const sumPercentages = sumLV(lv)
  if (sumPercentages in lv10ToSkill) {
    const rows = lv10ToSkill[sumPercentages]

    const newRow = JSON.parse(JSON.stringify(rows[rows.length - 1]))
    newRow[t('general.id')] = t('general.sum')
    table.push(newRow)
  }
  return table
}

const skillInfoTable = reactive<Array<any>>([])
const skillInfoList = props.info.skill_infos[props.type].skill_list
for (const skill of skillInfoList) {
  const row: any = {}

  let skillName = skill.name

  let element = "-"
  let base_attr = "-"
  let resonance_energy_regen = "-"
  let concerto_regen = "-"

  if (skillName === t('general.skill_damage')) {
    skillName = props.info.skill_infos[props.type].name
  }
  if (detailedSkills[skillName]) {
    element = detailedSkills[skillName].element
    base_attr = detailedSkills[skillName].base_attr
    resonance_energy_regen = detailedSkills[skillName].resonance_energy_regen
    concerto_regen = detailedSkills[skillName].concerto_regen
  }


  row[t('general.name')] = skill.name
  // row[t('general.element')] = element
  // row[t('general.base_attr')] = base_attr

  // row["LV1"] = getFormatString(skill.format, skill.param[0][0])
  // row["LV2"] = getFormatString(skill.format, skill.param[0][1])
  // row["LV3"] = getFormatString(skill.format, skill.param[0][2])
  // row["LV4"] = getFormatString(skill.format, skill.param[0][3])
  // row["LV5"] = getFormatString(skill.format, skill.param[0][4])
  // row["LV6"] = getFormatString(skill.format, skill.param[0][5])
  // row["LV7"] = getFormatString(skill.format, skill.param[0][6])
  // row["LV8"] = getFormatString(skill.format, skill.param[0][7])
  // row["LV9"] = getFormatString(skill.format, skill.param[0][8])
  const lv10 = getFormatString(skill.format, skill.param[0][9])
  row["LV10"] = lv10
  // row[t('general.resonance_energy_regen')] = resonance_energy_regen
  // row[t('general.concerto_regen')] = concerto_regen

  skillInfoTable.push(row)
}

</script>

<style scoped lang="sass">
.table
  display: block
  overflow-x: auto
  white-space: nowrap
</style>