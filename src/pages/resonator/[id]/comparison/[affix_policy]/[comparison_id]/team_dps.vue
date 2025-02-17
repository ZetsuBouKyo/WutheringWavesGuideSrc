<template>
  <TeamTier :affixPolicy="affixPolicy" :templateIDs="templateIDs" />
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { calculatedTemplates } from '@/ww/template';

import TeamTier from '@/components/TeamTier.vue';

const route = useRoute()
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id
const templateIDs = calculatedTemplates.getTemplateIDsByComparisonID(comparisonID)
</script>
