<template>
  <ResonatorTier :title="title" :resonatorNo="resonatorNo" :teamDamageDistributions="teamDamageDistributions">
  </ResonatorTier>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { resonators, calculatedTemplates, calculatedDamageAnalyses } from '@/ww/db'

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id

const resonatorName = resonators.getNameByNo(resonatorNo)
const comparison = calculatedTemplates.getComparisonByComparisonID(comparisonID)
const templateIDs = comparison.template_ids

const { t } = useI18n()
const affixPolicyString = t(`general.${affixPolicy}`)
const title = `【${t(affixPolicyString)}】${resonatorName} ${comparison.title}`

const teamDamageDistributions: Array<any> = []

templateIDs.forEach((templateID: string) => {
  const damageAnalysis = calculatedDamageAnalyses.getDamageAnalysis(templateID, affixPolicy)
  if (damageAnalysis) {
    teamDamageDistributions.push(damageAnalysis.getTeamDamageDistribution())
  }
});

console.log(resonatorNo, affixPolicy, comparisonID, templateIDs)

teamDamageDistributions.sort((distributionA: any, distributionB: any) => {
  const dpsA = distributionA.getResonatorMaxDPS(resonatorName)
  const dpsB = distributionB.getResonatorMaxDPS(resonatorName)
  if (!dpsA || !dpsB) {
    return 0
  }
  return dpsB - dpsA
})

const baseDPS = parseFloat(teamDamageDistributions[0].getResonatorMaxDPS(resonatorName))

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