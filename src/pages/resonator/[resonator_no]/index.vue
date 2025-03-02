<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item :title="$t('resonator.header.damage_analysis')"
          v-on:click="jumpToSection(goTo, '#damage_analysis')"></v-list-item>
        <div v-if="comparisons.length > 0">
          <v-list-item :title="$t('resonator.header.damage_comparison')"
            v-on:click="jumpToSection(goTo, '#damage_comparison')"></v-list-item>
          <v-tooltip :text="comparison.title" v-for="(comparison, i) in comparisons" :key="i">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" v-on:click="jumpToSection(goTo, `#${getComparisonId(i)}`)">
                <span class="ml-4 text-truncate">{{ comparison.title }}</span>
              </v-list-item>
            </template>
          </v-tooltip>
        </div>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <v-container>
        <v-row class="my-1">
          <h1>{{ $t(resonatorName) }}</h1>
        </v-row>
        <v-row class="my-1">
          <h2 id="damage_analysis">{{ $t('resonator.header.damage_analysis') }}</h2>
        </v-row>
        <v-row class="my-1 ml-8" v-for="(templateId, i) in templateIds" :key="i">
          <v-list-item class="text-blue-accent-1 w-100" :title="$t(templateId)"
            :to="`/template/${calculatedTemplateStore.getHashedTemplateIdByTemplateId(templateId)}`"
            :active="false"></v-list-item>
        </v-row>
        <div v-if="comparisons.length > 0">
          <v-row class="my-1">
            <h2 id="damage_comparison">{{ $t('resonator.header.damage_comparison') }}</h2>
          </v-row>
          <v-col class="ml-8 py-1" v-for="(comparison, i) in comparisons" :key="i" :id="$t(comparison.title)">
            <h3 :id="getComparisonId(i)" class="mb-2">{{ $t(comparison.title) }}</h3>
            <v-col class="ml-8 py-1">
              <h4>{{ $t('resonator.damage_comparison.team_based') }}</h4>
              <v-col class="my-2">
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_15_1')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_15_1/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_20_small')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_small/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_skill_bonus/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
              </v-col>
            </v-col>
            <v-col class="ml-8 py-1">
              <h4>{{ $t('resonator.damage_comparison.resonator_based', { name: resonatorName }) }}</h4>
              <v-col class="my-2">
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_15_1')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_15_1/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_20_small')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_small/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_skill_bonus/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </v-row>
              </v-col>
            </v-col>
          </v-col>
        </div>
      </v-container>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { useGoTo } from 'vuetify'
import { useRoute } from 'vue-router'

import { useResonatorStore } from '@/stores/resonator'
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate'

import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const resonatorName = resonatorStore.getNameByNo(resonatorNo)

const templateIds = ref<any>([])
const comparisons = ref<any>([])

function getComparisonId(i: number | string): string {
  return `comparison-${i}`
}

onMounted(async () => {
  await calculatedTemplateStore.init()
  templateIds.value = calculatedTemplateStore.getTemplateIdsByNo(resonatorNo)
  comparisons.value = calculatedTemplateStore.getComparisonsByNo(resonatorNo)
})
</script>

<style scoped lang="sass">
.name
  max-width: 60px
</style>
