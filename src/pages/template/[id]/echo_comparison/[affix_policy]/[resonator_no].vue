<template>
  <v-container>
    <ImageDownloadPanel :fname="$t('template.header.echo_damage_comparison', { name: resonatorName })">
      <ResonatorTier :title="$t('template.header.echo_damage_comparison', { name: resonatorName })"
        :resonatorNo="resonatorNo" :teamDamageDistributions="teamDamageDistributions" :isWarning="false" :toSort="false"
        :key="teamDamageDistributions.length">
      </ResonatorTier>
    </ImageDownloadPanel>
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
import { reactive, ref } from 'vue'

import { useResonatorStore } from '@/stores/resonator'
import { useEchoComparisonStore } from '@/stores/echoComparison'

const route = useRoute()
const hashedTemplateID = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const resonatorNo = (route.params as { resonator_no: string }).resonator_no

const resonatorStore = useResonatorStore()
const echoComparisonStore = useEchoComparisonStore()

const resonatorName = resonatorStore.getNameByNo(resonatorNo)

const teamDamageDistributions = ref<Array<any>>([])
const resonatorInfos = reactive<Array<any>>([])

onMounted(async () => {
  const comparison = await echoComparisonStore.getEchoComparison(hashedTemplateID, affixPolicy, resonatorNo)

  teamDamageDistributions.value = comparison.damage_distributions
  const resonatorEcho1 = comparison.resonator_template.getResonatorEcho1(resonatorName)

  teamDamageDistributions.value.forEach(async (damageDistribution: any) => {
    const resonatorID = damageDistribution.resonators[resonatorName].resonator_id
    const resonatorInfo = comparison.resonator_models[resonatorID]
    const resonatorElementSrc = await resonatorStore.getElementSrcByName(resonatorName)
    resonatorInfo.resonatorID = resonatorID
    resonatorInfo.echo1 = resonatorEcho1
    resonatorInfo.elementSrc = resonatorElementSrc
    resonatorInfos.push(resonatorInfo)
  });
})
</script>