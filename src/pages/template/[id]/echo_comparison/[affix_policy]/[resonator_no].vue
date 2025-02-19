<template>
  <v-container>
    <ResonatorTier :title="title" :resonatorNo="resonatorNo" :teamDamageDistributions="teamDamageDistributions"
      :isWarning="false" :toSort="false">
    </ResonatorTier>
    <v-col v-for="(resonatorInfo, i) in resonatorInfos" :key="i">
      <v-container>
        <v-row class="mb-2">
          <h2 :id="`resonator${i}`">{{ resonatorInfo.resonatorID }}</h2>
        </v-row>
      </v-container>
      <ResonatorInfo :resonator="resonatorInfo" />
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { resonators } from '@/ww/resonator'
import { calculatedEchoComparisonTemplates } from '@/ww/template'

const route = useRoute()
const hashedTemplateID = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const resonatorName = resonators.getNameByNo(resonatorNo)

const comparison = calculatedEchoComparisonTemplates.getEchoComparison(hashedTemplateID, affixPolicy, resonatorNo)
const teamDamageDistributions = comparison.damage_distributions
const resonatorEcho1 = comparison.resonator_template.getResonatorEcho1(resonatorName)

const resonatorInfos: Array<any> = []
teamDamageDistributions.forEach((damageDistribution: any) => {
  const resonatorID = damageDistribution.resonators[resonatorName].resonator_id
  const resonatorInfo = comparison.resonator_models[resonatorID]
  resonatorInfo.resonatorID = resonatorID
  resonatorInfo.echo1 = resonatorEcho1
  resonatorInfos.push(resonatorInfo)
});

const { t } = useI18n()
const title = t('template.header.echo_damage_comparison', { name: resonatorName })
</script>