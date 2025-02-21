<template>
  <TeamTier v-if="comparison" :title="`【${affixPolicyForTitle}】${resonatorNameForTitle} ${$t(comparison.title)}`"
    :affixPolicy="affixPolicy" :templateIds="templateIds" />
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useResonatorStore } from '@/stores/resonator'
import { useCalculatedTemplateStore } from '@/stores/calculateTemplate'


const { t } = useI18n()
const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const comparisonID = (route.params as { comparison_id: string }).comparison_id

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()

const resonatorName = resonatorStore.getNameByNo(resonatorNo)
const templateIds = reactive<Array<string>>([])
const comparison = ref<any>(undefined)

const affixPolicyForTitle = t(`general.${affixPolicy}`)
const resonatorNameForTitle = t(resonatorName)

onMounted(async () => {
  await calculatedTemplateStore.init()
  comparison.value = calculatedTemplateStore.getComparisonByComparisonId(comparisonID)
  comparison.value.template_ids.forEach((id: string) => { templateIds.push(id) })
})
</script>
