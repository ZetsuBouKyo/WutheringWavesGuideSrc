<template>
  <ResonatorTier :title="title" :resonatorNo="resonatorNo" :teamDamageDistributions="teamDamageDistributions"
    :isWarning="false">
  </ResonatorTier>
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

const teamDamageDistributions = calculatedEchoComparisonTemplates.getDamageDistributions(hashedTemplateID, affixPolicy, resonatorNo)
console.log(teamDamageDistributions)
const { t } = useI18n()
const title = t('template.header.echo_damage_comparison', { name: resonatorName })
</script>