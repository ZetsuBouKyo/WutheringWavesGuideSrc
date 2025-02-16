<template>
  <v-container>Resonator DPS</v-container>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { calculatedResonators } from '@/ww/resonator'

const route = useRoute()
const resonatorID = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id
const templateIDs = calculatedResonators.getTemplateIDsByComparisonID(comparisonID)

console.log(resonatorID, affixPolicy, comparisonID, templateIDs)
</script>