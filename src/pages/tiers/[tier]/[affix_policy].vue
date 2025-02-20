<template>
  <TeamTier :title="title" :affixPolicy="affixPolicy" :templateIDs="templateIDs" />
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

import { TierEnum } from '@/interfaces/tier';
import { calculatedTemplates } from '@/ww/db';

const route = useRoute()
const tier = (route.params as { tier: TierEnum }).tier
const affixPolicy = (route.params as { affix_policy: string }).affix_policy

const templateIDs = calculatedTemplates.getTierTemplateIDs(tier)
const titlePrefix1 = t(`general.${affixPolicy}`)
const titlePrefix2 = t(`tiers.${tier}`)
const title = `【${titlePrefix1}】${titlePrefix2} ${t('general.tier_list')}`
</script>

<style scoped lang="sass">
</style>
