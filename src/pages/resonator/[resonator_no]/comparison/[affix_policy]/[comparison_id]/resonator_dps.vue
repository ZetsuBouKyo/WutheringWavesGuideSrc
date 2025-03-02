<template>
  <ResonatorTier v-if="comparison" :title="`【${affixPolicyForTitle}】${resonatorNameForTitle} ${$t(comparison.title)}`"
    :resonatorNo="resonatorNo" :teamDamageDistributions="teamDamageDistributions">
  </ResonatorTier>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { reactive } from 'vue'

import { useResonatorStore } from '@/stores/resonator'
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate'
import { useDamageAnalysisStore } from '@/stores/damageAnalysis'

const { t } = useI18n()

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()
const damageAnalysisStore = useDamageAnalysisStore()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonId = (route.params as { comparison_id: string }).comparison_id

const resonatorName = resonatorStore.getNameByNo(resonatorNo)

const teamDamageDistributions = reactive<any>([])
const comparison = ref<any>(undefined)

const affixPolicyForTitle = t(`general.${affixPolicy}`)
const resonatorNameForTitle = t(resonatorName)
onMounted(async () => {
  await calculatedTemplateStore.init()
  comparison.value = calculatedTemplateStore.getComparisonByComparisonId(comparisonId)
  const templateIds = comparison.value.template_ids

  templateIds.forEach(async (templateID: string) => {
    // To be continued
    const damageAnalysis = await damageAnalysisStore.getDamageAnalysisByTemplateId(templateID, affixPolicy)
    if (damageAnalysis) {
      teamDamageDistributions.push(damageAnalysis.getTeamDamageDistribution())
    }
  });

  teamDamageDistributions.sort((distributionA: any, distributionB: any) => {
    const dpsA = distributionA.getResonatorMaxDPS(resonatorName)
    const dpsB = distributionB.getResonatorMaxDPS(resonatorName)
    if (!dpsA || !dpsB) {
      return 0
    }
    return dpsB - dpsA
  })
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