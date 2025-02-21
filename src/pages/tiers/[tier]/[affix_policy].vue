<template>
  <TeamTier :title="title" :affixPolicy="affixPolicy" :templateIds="templateIds" :key="templateIds.length" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { TierEnum } from '@/interfaces/tier';

import { useCalculatedTemplateStore } from '@/stores/calculateTemplate';

const { t } = useI18n()

const calculatedTemplateStore = useCalculatedTemplateStore()

const route = useRoute()
const tier = (route.params as { tier: TierEnum }).tier
const affixPolicy = (route.params as { affix_policy: string }).affix_policy

const templateIds = ref<Array<string>>([])

const titlePrefix1 = t(`general.${affixPolicy}`)
const titlePrefix2 = t(`tiers.${tier}`)
const title = `【${titlePrefix1}】${titlePrefix2} ${t('general.tier_list')}`

onMounted(async () => {
  await calculatedTemplateStore.init()
  templateIds.value = calculatedTemplateStore.getTierTemplateIds(tier)
})
</script>

<style scoped lang="sass">
</style>
