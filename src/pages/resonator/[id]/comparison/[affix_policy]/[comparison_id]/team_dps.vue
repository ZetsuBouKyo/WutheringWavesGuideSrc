<template>
  <TeamTier :title="title" :affixPolicy="affixPolicy" :templateIDs="comparison.template_ids" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { calculatedTemplates } from '@/ww/template';
import { resonators } from '@/ww/resonator';

import TeamTier from '@/components/TeamTier.vue';

const { t } = useI18n()
const route = useRoute()
const resonatorID = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id

const resonatorName = resonators.getNameByID(resonatorID)
const comparison = calculatedTemplates.getComparisonByComparisonID(comparisonID)
const affixPolicyString = t(`general.${affixPolicy}`)
const title = `【${affixPolicyString}】${resonatorName} ${comparison.title}`
</script>
