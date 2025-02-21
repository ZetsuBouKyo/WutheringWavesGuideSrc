<template>
  <v-container>
    <div class="d-flex flex-column align-start">
      <v-row class="mb-2">
        <h1 :key="title">{{ title }}</h1>
      </v-row>
      <v-row v-if="isWarning" class="ma-1">
        <h2>{{ $t('resonator.damage_comparison.warning') }}</h2>
      </v-row>
      <div class="d-flex flex-column w-100 my-2" v-for="(teamDistribution, i) in teamDamageDistributions" :key="i">
        <div class="d-flex flex-row mb-1">
          <div class=" d-flex flex-column mr-4 justify-center">
            <img class="resonator" :src="resonatorStore.getIconSrcByNo(resonatorNo)" />
          </div>
          <v-col>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row">
                <span class="header">{{ $t('general.template_id') }}: </span>
                <a class="text-blue-accent-1 text-decoration-none text-truncate"
                  :href="`/template/${teamDistribution.getHashedTemplateID()}`">{{
                    teamDistribution.template_id }}</a>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row">
                <span class="header">{{ $t('general.resonator_id') }}: </span>
                <div class="text-blue-accent-1 text-decoration-none text-truncate cursor-pointer"
                  v-on:click="jumpToSection(goTo, `#resonator${i}`)">
                  {{ teamDistribution.resonators[resonatorName].resonator_id }}
                </div>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row">
                <span class="header text-truncater">{{ $t('general.monster_id') }}: </span>
                <span class="text-truncate">{{ teamDistribution.monster_id }}</span>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row">
                <span class="header text-truncate">{{ $t('general.team_dps') }}: </span>
                <div class="d-flex flex-row text-truncate">
                  <span>{{ teamDistribution.getMinTeamDPSString() }} ({{ teamDistribution.duration_1 }}s)</span>
                  <span>&ensp;~&ensp;</span>
                  <span class="text-grey-lighten-1">
                    {{ teamDistribution.getMaxTeamDPSString() }} ({{ teamDistribution.duration_2 }}s)
                  </span>
                </div>
              </div>
            </v-row>
          </v-col>
        </div>
        <div class="d-flex flex-column align-start bg-grey-darken-4" :key="baseDPS">
          <div v-if="teamDistribution.getResonatorMaxDPSPercentageByBasedDPS(resonatorName, baseDPS) > 0.5"
            :class="`barh d-flex flex-row-reverse align-center bg-${resonatorElementEn}`"
            :style="`width: ${teamDistribution.getResonatorMaxDPSPercentageStringByBasedDPS(resonatorName, baseDPS)};`">
            <span class="mr-4 text-truncate">
              DPS: {{ teamDistribution.getResonatorDPSString(resonatorName) }}
              ({{ teamDistribution.getResonatorMaxDPSPercentageStringByBasedDPS(resonatorName, baseDPS) }})</span>
          </div>
          <div v-else class="d-flex flex-row align-center w-100">
            <div :class="`barh d-flex bg-${resonatorElementEn}`"
              :style="`width: ${teamDistribution.getResonatorMaxDPSPercentageStringByBasedDPS(resonatorName, baseDPS)};`">
            </div>
            <span class="ml-4 text-truncate">
              DPS: {{ teamDistribution.getResonatorDPSString(resonatorName) }}
              ({{ teamDistribution.getResonatorMaxDPSPercentageStringByBasedDPS(resonatorName, baseDPS) }})</span>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useGoTo } from 'vuetify'

import { useResonatorStore } from '@/stores/resonator'

import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  resonatorNo: {
    type: String,
    default: ""
  },
  teamDamageDistributions: {
    type: Object as PropType<Array<any>>,
    default: []
  },
  isWarning: {
    type: Boolean,
    default: true
  }
});

const title = props.title
const teamDamageDistributions = props.teamDamageDistributions
const resonatorNo = props.resonatorNo
const isWarning = props.isWarning

const resonatorStore = useResonatorStore()
const resonatorName = resonatorStore.getNameByNo(resonatorNo)
const resonatorElementEn = ref<string>("white")

const baseDPS = ref<number>(0)

function init() {
  if (teamDamageDistributions.length > 0) {
    teamDamageDistributions.sort((distributionA: any, distributionB: any) => {
      const dpsA = distributionA.getResonatorMaxDPS(resonatorName)
      const dpsB = distributionB.getResonatorMaxDPS(resonatorName)
      if (!dpsA || !dpsB) {
        return 0
      }
      return dpsB - dpsA
    })
    baseDPS.value = parseFloat(teamDamageDistributions[0].getResonatorMaxDPS(resonatorName))
  }
}

onMounted(async () => {
  resonatorElementEn.value = await resonatorStore.getElementEnByNo(resonatorNo)
  init()
})

watch(() => { return teamDamageDistributions.length }, () => {
  init()
})
</script>

<style scoped lang="sass">
.resonator
  height: 60px
  width: 60px
.header
  width: 80px
.barh
  height: 40px
</style>