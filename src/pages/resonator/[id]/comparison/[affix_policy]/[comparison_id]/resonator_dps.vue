<template>
  <v-container class="h-100">
    <div class="d-flex flex-column align-start">
      <div class="d-flex flex-column w-100 my-2" v-for="(teamDistribution, i) in teamDamageDistributions" :key="i">
        <div class="d-flex flex-row mb-1">
          <div class=" d-flex flex-column mr-4 justify-center">
            <img class="resonator" :src="resonators.getIconSrcByID(resonatorID)" />
          </div>
          <v-col>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row">
                <span class="header">{{ $t('general.template_id') }}: </span>
                <a class="text-decoration-none text-truncate"
                  :href="`/template/${teamDistribution.getHashedTemplateID()}`">{{
                    teamDistribution.template_id }}</a>
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
                <span class="text-truncate">{{ teamDistribution.getTeamDPS() }}</span>
              </div>
            </v-row>
          </v-col>
        </div>
        <div class="d-flex flex-column align-start bg-grey-darken-4">
          <div v-if="teamDistribution.getResonatorDamagePercentage(resonatorName, baseDamage) > 0.5"
            :class="`barh d-flex flex-row-reverse align-center bg-${resonators.getElementEnByID(resonatorID)}`"
            :style="`width: ${teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage)};`">
            <span class="mr-4 text-truncate">
              DPS: {{ teamDistribution.getResonatorDPSString(resonatorName) }}
              ({{ teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage) }})</span>
          </div>
          <div v-else class="d-flex flex-row align-center w-100">
            <div :class="`barh d-flex bg-${resonators.getElementEnByID(resonatorID)}`"
              :style="`width: ${teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage)};`">
            </div>
            <span class="ml-4 text-truncate">
              DPS: {{ teamDistribution.getResonatorDPSString(resonatorName) }}
              ({{ teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage) }})</span>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { getNestedValue } from "@/ww/utils";
import { resonators } from '@/ww/resonator'
import { calculatedTemplates } from '@/ww/template';
import { calculatedDamageAnalyses } from '@/ww/damage';

const route = useRoute()
const resonatorID = (route.params as { id: string }).id
const resonatorName = resonators.getNameByID(resonatorID)
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id
const templateIDs = calculatedTemplates.getTemplateIDsByComparisonID(comparisonID)
const teamDamageDistributions: Array<any> = []

templateIDs.forEach((templateID: string) => {
  const damageAnalysis = calculatedDamageAnalyses.getDamageAnalysis(templateID, affixPolicy)
  if (damageAnalysis) {
    teamDamageDistributions.push(damageAnalysis.getTeamDamageDistribution())
  }
});

console.log(resonatorID, affixPolicy, comparisonID, templateIDs)

teamDamageDistributions.sort((analysisA: any, analysisB: any) => {
  const damageA = getNestedValue(analysisA, `resonators.${resonatorName}.damage`) as number
  const damageB = getNestedValue(analysisB, `resonators.${resonatorName}.damage`) as number
  if (!damageA || !damageB) {
    return 0
  }
  return damageB - damageA
})

const baseDamage = parseFloat(teamDamageDistributions[0].resonators[resonatorName].damage)

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