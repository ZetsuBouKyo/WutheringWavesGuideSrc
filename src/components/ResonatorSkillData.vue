<template>
  <div v-if="info && type" class="f-flex flex-column" :key="type">
    <div :class="`d-flex text-${info.element_en} font-weight-bold my-1`">
      {{ $t(info.skill_infos[type].name) }}
    </div>
    <div class="bg-blue-grey-darken-4 pa-2" v-html="getRichText(info.skill_infos[type].description)">
    </div>
    <v-data-table v-if="skillInfoTable.length > 0" class="table my-1" :items="skillInfoTable" disable-sort
      hide-default-footer :items-per-page="skillInfoTable.length + 1" />
    <v-expansion-panels v-if="skillTable.length > 0">
      <v-expansion-panel>
        <v-expansion-panel-title>
          {{ $t('general.detailed_skill_info') }}
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

type TypeOption = "normal_attack" | "resonance_skill" | "anotherType" | "";

const props = defineProps({
  info: {
    type: Object as PropType<ResonatorInfo>,
    default: undefined
  },
  type: {
    type: String,
    default: ""
  }
});


const detailedSkills = {}
const skillTable = reactive<Array<any>>([])
const skills = props.info.skills
for (const skill of skills) {
  const id = skill.id
  const type = skill.type
  const lv10 = skill.lv10
  const skill_type = skill.skill_type

  if (!id || type !== "Damage" || !lv10 || skill_type !== SkillTypeEnum[props.type.toUpperCase()]) {
    continue
  }
  const row = {}

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
}

const skillInfoTable = reactive<Array<any>>([])
const skillInfoList = props.info.skill_infos[props.type].skill_list
for (const skill of skillInfoList) {
  const row = {}

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
  row["LV10"] = getFormatString(skill.format, skill.param[0][9])
  // row[t('general.resonance_energy_regen')] = resonance_energy_regen
  // row[t('general.concerto_regen')] = concerto_regen

  skillInfoTable.push(row)
}


</script>