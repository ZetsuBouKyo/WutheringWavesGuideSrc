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
              <v-list-item v-bind="props" v-on:click="jumpToSection(goTo, `#${getComparisonID(i)}`)">
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
        <v-row class="my-1 ml-8" v-for="(templateID, i) in templateIDs" :key="i">
          <v-list-item class="text-blue-accent-1 w-100" :title="$t(templateID)"
            :to="`/template/${templates.getHashedTemplateIDByTemplateID(templateID)}`" :active="false"></v-list-item>
        </v-row>
        <div v-if="comparisons.length > 0">
          <v-row class="my-1">
            <h2 id="damage_comparison">{{ $t('resonator.header.damage_comparison') }}</h2>
          </v-row>
          <v-col class="ml-8 py-1" v-for="(comparison, i) in comparisons" :key="i" :id="$t(comparison.title)">
            <h3 :id="getComparisonID(i)" class="mb-2">{{ $t(comparison.title) }}</h3>
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

import { templates, resonators, calculatedTemplates } from "@/ww/db"
import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
const resonatorName = resonators.getNameByNo(resonatorNo)

const templateIDs = calculatedTemplates.getTemplateIDsByResonatorNo(resonatorNo)
const comparisons = calculatedTemplates.getComparisonsByID(resonatorNo)

function getComparisonID(i: number | string): string {
  return `comparison-${i}`
}
</script>

<style scoped lang="sass">
.name
  max-width: 60px
</style>
