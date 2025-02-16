<template>
  <Doc>
    <template v-slot:left>
      <v-list>
        <v-list-item :title="$t('resonator.header.damage_analysis')"
          v-on:click="jump('#damage_analysis')"></v-list-item>
        <div v-if="comparisons.length > 0">
          <v-list-item :title="$t('resonator.header.damage_comparison')"
            v-on:click="jump('#damage_comparison')"></v-list-item>
          <v-tooltip :text="comparison.title" v-for="(comparison, i) in comparisons" :key="i">
            <template v-slot:activator="{ props }">
              <v-list-item class="ml-4" :title="comparison.title" v-bind="props"
                v-on:click="jump(`#${getComparisonID(i)}`)"></v-list-item>
            </template>
          </v-tooltip>
        </div>
      </v-list>
    </template>
    <template v-slot:right>
      <v-container class=" ml-4">
        <v-row class="my-2">
          <h1>{{ $t(resonatorName) }}</h1>
        </v-row>
        <v-row class="my-2">
          <h2 id="damage_analysis">{{ $t('resonator.header.damage_analysis') }}</h2>
        </v-row>
        <v-row class="my-1 ml-8" v-for="(templateID, i) in templateIDs" :key="i">
          <v-list-item class="text-blue-accent-1" :title="templateID" to="/"></v-list-item>
        </v-row>
        <div v-if="comparisons.length > 0">
          <v-row class="my-2">
            <h2 id="damage_comparison">{{ $t('resonator.header.damage_comparison') }}</h2>
          </v-row>
          <v-col class="ml-8" v-for="(comparison, i) in comparisons" :key="i" :id="$t(comparison.title)">
            <h3 :id="getComparisonID(i)" class="my-1">{{ $t(comparison.title) }}</h3>
            <v-col class="ml-8">
              <h4>{{ $t('resonator.damage_comparison.team_based') }}</h4>
              <v-col class="my-2">
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('resonator.damage_comparison.affixes_15_1')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_15_1/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('resonator.damage_comparison.affixes_20_small')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_20_small/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1"
                    :title="$t('resonator.damage_comparison.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_20_skill_bonus/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </v-row>
              </v-col>
            </v-col>
            <v-col class="ml-8">
              <h4>{{ $t('resonator.damage_comparison.resonator_based', { name: resonatorName }) }}</h4>
              <v-col class="my-2">
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('resonator.damage_comparison.affixes_15_1')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_15_1/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1" :title="$t('resonator.damage_comparison.affixes_20_small')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_20_small/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </v-row>
                <v-row class="ml-4">
                  <v-list-item class="text-blue-accent-1"
                    :title="$t('resonator.damage_comparison.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorID}/comparison/affixes_20_skill_bonus/${comparison.id}/resonator_dps`"
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
import { useRoute } from 'vue-router'
import { useGoTo } from 'vuetify'

import { resonators, calculatedResonators } from "@/ww/resonator"

const goTo = useGoTo()
function jump(id: string) {
  goTo(id, {
    duration: 400,
    easing: "easeInQuad",
    offset: -180,
  })
}

const route = useRoute()
const resonatorID = (route.params as { id: string }).id
const resonatorName = resonators.getNameByID(resonatorID)

const templateIDs = calculatedResonators.getTemplateIDsByID(resonatorID)
const comparisons = calculatedResonators.getComparisonsByID(resonatorID)

function getComparisonID(i: number | string): string {
  return `comparison-${i}`
}
</script>
