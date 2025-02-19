<template>
  <v-container>
    <v-row class="mb-2">
      <span>{{ $t('general.resonator') }}</span>
    </v-row>
    <v-row class="d-flex flex-column mb-2 bg-blue-grey-darken-4 overflow-auto w-100">
      <div class="d-flex flex-row align-center mt-1 mx-1 text-truncate">
        <div class="bg-grey-darken-4 d-flex flex-row align-center pa-2 mr-1">
          <img class="title mr-4" :src="resonators.getIconSrcByName(resonator.name)" />
          <h3>{{ $t(resonator.name) }}</h3>
          <img class="title" :src="resonators.getElementSrcByName(resonator.name)" />
          <h3 class="mr-4">{{ $t(resonator.element) }}</h3>
        </div>
        <div class="bg-grey-darken-4 d-flex flex-row pa-2 mr-1">
          <h3 class="title ml-2 mr-1 d-flex align-center">{{ $t('general.resonator_chain') }}</h3>
          <h3 class="title mr-2 d-flex align-center">{{ resonator.chain }}</h3>
        </div>
        <div class="bg-grey-darken-4 d-flex flex-row pa-2">
          <h3 class="title ml-2 d-flex align-center">{{ resonator.weapon_name }}</h3>
          <h3 class="title ml-4 d-flex align-center">{{ $t('general.lv') }}</h3>
          <h3 class="title mr-4 d-flex align-center">{{ resonator.weapon_level }}</h3>
          <h3 class="title mr-1 d-flex align-center">{{ $t('general.tune') }}</h3>
          <h3 class="title mr-2 d-flex align-center">{{ resonator.weapon_rank }}</h3>
        </div>
      </div>
      <div class="d-flex flex-row mx-1">
        <v-data-table class="table my-1 mr-1" :headers="resonatorLeftHeaders" :items="resonatorLeft" disable-sort
          hide-default-footer :items-per-page="22">
        </v-data-table>
        <v-data-table class="table my-1" :headers="resonatorRightHeaders" :items="resonatorRight" disable-sort
          hide-default-footer :items-per-page="22">
        </v-data-table>
      </div>
    </v-row>
    <v-row class="mb-2">
      <span>{{ $t('general.echo') }}</span>
    </v-row>
    <v-row class="d-flex flex-column mb-2 bg-blue-grey-darken-4 overflow-auto w-100">
      <div class="d-flex flex-row mx-1">
        <v-data-table class="table my-1 mr-1" :headers="echoLeftHeaders" :items="echoLeft" disable-sort
          hide-default-footer :items-per-page="18">
        </v-data-table>
        <v-data-table class="table my-1" :headers="echoRightHeaders" :items="echoRight" disable-sort hide-default-footer
          :items-per-page="18">
        </v-data-table>
      </div>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useI18n } from 'vue-i18n'

import { resonators } from "@/ww/resonator";

import { toNumberString, toPercentageString } from "@/ww/utils";

const props = defineProps({
  resonator: {
    type: Object as PropType<any>,
    default: {}
  }
});
const resonator = props.resonator

const { t } = useI18n()

const resonatorLeftCol1 = t('general.level')
const resonatorLeftCol2 = resonator.level
const resonatorLeftHeaders: any = ref([
  {
    title: resonatorLeftCol1,
    key: resonatorLeftCol1,
  },
  {
    title: resonatorLeftCol2,
    key: resonatorLeftCol2,
    align: "end"
  },
])

const resonatorLeft = [
  { [resonatorLeftCol1]: t('general.hp'), [resonatorLeftCol2]: toNumberString(resonator.hp) },
  { [resonatorLeftCol1]: t('general.atk'), [resonatorLeftCol2]: toNumberString(resonator.attack) },
  { [resonatorLeftCol1]: t('general.def'), [resonatorLeftCol2]: toNumberString(resonator.defense) },
  { [resonatorLeftCol1]: t('general.crit_rate'), [resonatorLeftCol2]: toPercentageString(resonator.crit_rate) },
  { [resonatorLeftCol1]: t('general.crit_dmg'), [resonatorLeftCol2]: toPercentageString(resonator.crit_dmg) },
  { [resonatorLeftCol1]: t('general.energy_regen'), [resonatorLeftCol2]: toPercentageString(resonator.energy_regen) },
  { [resonatorLeftCol1]: "", [resonatorLeftCol2]: "" },
  { [resonatorLeftCol1]: t('general.bonus.skill'), [resonatorLeftCol2]: toPercentageString(resonator.resonance_skill_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.basic'), [resonatorLeftCol2]: toPercentageString(resonator.basic_attack_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.heavy'), [resonatorLeftCol2]: toPercentageString(resonator.heavy_attack_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.liberation'), [resonatorLeftCol2]: toPercentageString(resonator.resonance_liberation_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.healing'), [resonatorLeftCol2]: toPercentageString(resonator.healing_bonus) },
  { [resonatorLeftCol1]: "", [resonatorLeftCol2]: "" },
  { [resonatorLeftCol1]: t('general.bonus.physics'), [resonatorLeftCol2]: toPercentageString(resonator.physical_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.glacio'), [resonatorLeftCol2]: toPercentageString(resonator.glacio_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.fusion'), [resonatorLeftCol2]: toPercentageString(resonator.fusion_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.electro'), [resonatorLeftCol2]: toPercentageString(resonator.electro_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.aero'), [resonatorLeftCol2]: toPercentageString(resonator.aero_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.spectro'), [resonatorLeftCol2]: toPercentageString(resonator.spectro_dmg_bonus) },
  { [resonatorLeftCol1]: t('general.bonus.havoc'), [resonatorLeftCol2]: toPercentageString(resonator.havoc_dmg_bonus) },
]

const resonatorRightCol1 = t('general.res.physics')
const resonatorRightCol2 = toNumberString(resonator.physical_dmg_res)
const resonatorRightHeaders: any = ref([
  {
    title: resonatorRightCol1,
    key: resonatorRightCol1,
  },
  {
    title: resonatorRightCol2,
    key: resonatorRightCol2,
    align: "end"
  },
])

const resonatorRight = [
  { [resonatorRightCol1]: t('general.res.glacio'), [resonatorRightCol2]: toNumberString(resonator.glacio_dmg_res) },
  { [resonatorRightCol1]: t('general.res.fusion'), [resonatorRightCol2]: toNumberString(resonator.fusion_dmg_res) },
  { [resonatorRightCol1]: t('general.res.electro'), [resonatorRightCol2]: toNumberString(resonator.electro_dmg_res) },
  { [resonatorRightCol1]: t('general.res.aero'), [resonatorRightCol2]: toPercentageString(resonator.aero_dmg_res) },
  { [resonatorRightCol1]: t('general.res.spectro'), [resonatorRightCol2]: toPercentageString(resonator.spectro_dmg_res) },
  { [resonatorRightCol1]: t('general.res.havoc'), [resonatorRightCol2]: toPercentageString(resonator.havoc_dmg_res) },
  { [resonatorRightCol1]: "", [resonatorRightCol2]: "" },
  { [resonatorRightCol1]: t('general.resonator_skills.normal_attack_lv'), [resonatorRightCol2]: resonator.normal_attack_lv },
  { [resonatorRightCol1]: t('general.resonator_skills.resonance_skill_lv'), [resonatorRightCol2]: resonator.resonance_skill_lv },
  { [resonatorRightCol1]: t('general.resonator_skills.forte_circuit_lv'), [resonatorRightCol2]: resonator.forte_circuit_lv },
  { [resonatorRightCol1]: t('general.resonator_skills.resonance_liberation_lv'), [resonatorRightCol2]: resonator.resonance_liberation_lv },
  { [resonatorRightCol1]: t('general.resonator_skills.intro_skill_lv'), [resonatorRightCol2]: resonator.intro_skill_lv },
  { [resonatorRightCol1]: "", [resonatorRightCol2]: "" },
  { [resonatorRightCol1]: t('general.resonator_skills.inherent_skill_1'), [resonatorRightCol2]: resonator.inherent_skill_1 },
  { [resonatorRightCol1]: t('general.resonator_skills.inherent_skill_2'), [resonatorRightCol2]: resonator.inherent_skill_2 },
  { [resonatorRightCol1]: "", [resonatorRightCol2]: "" },
]

const echoLeftCol1 = t('general.hp')
const echoLeftCol2 = toNumberString(resonator.echo_hp)
const echoLeftHeaders: any = ref([
  {
    title: echoLeftCol1,
    key: echoLeftCol1,
  },
  {
    title: echoLeftCol2,
    key: echoLeftCol2,
    align: "end"
  },
])

const echoLeft = [
  { [echoLeftCol1]: t('general.hp_p'), [echoLeftCol2]: toPercentageString(resonator.echo_hp_p) },
  { [echoLeftCol1]: t('general.atk'), [echoLeftCol2]: toNumberString(resonator.echo_atk) },
  { [echoLeftCol1]: t('general.atk_p'), [echoLeftCol2]: toPercentageString(resonator.echo_atk_p) },
  { [echoLeftCol1]: t('general.def'), [echoLeftCol2]: toNumberString(resonator.echo_def) },
  { [echoLeftCol1]: t('general.def_p'), [echoLeftCol2]: toPercentageString(resonator.echo_def_p) },
  { [echoLeftCol1]: "", [echoLeftCol2]: "" },
  { [echoLeftCol1]: t('general.crit_rate'), [echoLeftCol2]: toPercentageString(resonator.echo_crit_rate) },
  { [echoLeftCol1]: t('general.crit_dmg'), [echoLeftCol2]: toPercentageString(resonator.echo_crit_dmg) },
  { [echoLeftCol1]: t('general.energy_regen'), [echoLeftCol2]: toPercentageString(resonator.echo_energy_regen) },
  { [echoLeftCol1]: "", [echoLeftCol2]: "" },
  { [echoLeftCol1]: t('general.echo_name_1'), [echoLeftCol2]: resonator.echo1 },
  { [echoLeftCol1]: t('general.echo_sonata_1'), [echoLeftCol2]: resonator.echo_sonata_1 },
  { [echoLeftCol1]: t('general.echo_sonata_2'), [echoLeftCol2]: resonator.echo_sonata_2 },
  { [echoLeftCol1]: t('general.echo_sonata_3'), [echoLeftCol2]: resonator.echo_sonata_3 },
  { [echoLeftCol1]: t('general.echo_sonata_4'), [echoLeftCol2]: resonator.echo_sonata_4 },
  { [echoLeftCol1]: t('general.echo_sonata_5'), [echoLeftCol2]: resonator.echo_sonata_5 },
]

const echoRightCol1 = t('general.bonus.skill')
const echoRightCol2 = toPercentageString(resonator.echo_resonance_skill_dmg_bonus)
const echoRightHeaders: any = ref([
  {
    title: echoRightCol1,
    key: echoRightCol1,
  },
  {
    title: echoRightCol2,
    key: echoRightCol2,
    align: "end"
  },
])

const echoRight = [
  { [echoRightCol1]: t('general.bonus.basic'), [echoRightCol2]: toPercentageString(resonator.echo_basic_attack_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.heavy'), [echoRightCol2]: toPercentageString(resonator.echo_heavy_attack_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.liberation'), [echoRightCol2]: toPercentageString(resonator.echo_resonance_liberation_dmg_bonus) },
  { [echoRightCol1]: "", [echoRightCol2]: "" },
  { [echoRightCol1]: t('general.bonus.healing'), [echoRightCol2]: toPercentageString(resonator.echo_healing_bonus) },
  { [echoRightCol1]: "", [echoRightCol2]: "" },
  { [echoRightCol1]: t('general.bonus.glacio'), [echoRightCol2]: toPercentageString(resonator.echo_glacio_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.fusion'), [echoRightCol2]: toPercentageString(resonator.echo_fusion_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.electro'), [echoRightCol2]: toPercentageString(resonator.echo_electro_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.aero'), [echoRightCol2]: toPercentageString(resonator.echo_aero_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.spectro'), [echoRightCol2]: toPercentageString(resonator.echo_spectro_dmg_bonus) },
  { [echoRightCol1]: t('general.bonus.havoc'), [echoRightCol2]: toPercentageString(resonator.echo_havoc_dmg_bonus) },
  { [echoRightCol1]: "", [echoRightCol2]: "" },
]
</script>

<style scoped lang="sass">
.table
  display: block
  overflow-x: auto
  white-space: nowrap
.title
  height: 60px
</style>