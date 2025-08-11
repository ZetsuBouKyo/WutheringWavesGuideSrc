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
      <div class="d-flex flex-column w-100" v-if="resonatorInfo !== undefined">
        <div class="f-flex flex-row my-1">
          <h1>{{ $t(resonatorInfo.name) }}</h1>
        </div>
        <!-- Damage analysis -->
        <div class="f-flex flex-row mt-8 mb-1">
          <h2 id="damage_analysis">{{ $t('resonator.header.damage_analysis') }}</h2>
        </div>
        <div class="f-flex" v-for="(templateId, i) in templateIds" :key="i">
          <v-list-item class="text-blue-accent-1" :title="$t(templateId)"
            :to="`/template/${calculatedTemplateStore.getHashedTemplateIdByTemplateId(templateId)}`" :active="false">
          </v-list-item>
        </div>
        <div v-if="comparisons.length > 0">
          <div class="f-flex flex-row mt-8 mb-1">
            <h2 id="damage_comparison">{{ $t('resonator.header.damage_comparison') }}</h2>
          </div>
          <div class="f-flex flex-column py-1" v-for="(comparison, i) in comparisons" :key="i"
            :id="$t(comparison.title)">
            <h3 :id="getComparisonId(i)" class="mb-2">{{ $t(comparison.title) }}</h3>
            <div class="f-flex flex-column py-1">
              <h4>{{ $t('resonator.damage_comparison.team_based') }}</h4>
              <div class="f-flex flex-column my-2">
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_15_1')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_15_1/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </div>
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_20_small')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_small/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </div>
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1 w-100" :title="$t('general.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_skill_bonus/${comparison.id}/team_dps`"
                    :active="false"></v-list-item>
                </div>
              </div>
            </div>
            <div class="f-flex flex-column py-1">
              <h4>{{ $t('resonator.damage_comparison.resonator_based', { name: resonatorInfo.name }) }}</h4>
              <div class="f-flex flex-column my-2">
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_15_1')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_15_1/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </div>
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_20_small')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_small/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </div>
                <div class="f-flex flex-row">
                  <v-list-item class="text-blue-accent-1" :title="$t('general.affixes_20_skill_bonus')"
                    :to="`/resonator/${resonatorNo}/comparison/affixes_20_skill_bonus/${comparison.id}/resonator_dps`"
                    :active="false"></v-list-item>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useGoTo } from 'vuetify'
import { useRoute } from 'vue-router'

import { useResonatorStore } from '@/stores/resonator'
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate'

import { ResonatorInfo } from "@/ww/resonator";
import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
// const resonatorName = resonatorStore.getNameByNo(resonatorNo)
const resonatorInfo = ref<undefined | ResonatorInfo>(undefined)

const templateIds = ref<any>([])
const comparisons = ref<any>([])

function getComparisonId(i: number | string): string {
  return `comparison-${i}`
}

onMounted(async () => {
  await calculatedTemplateStore.init()
  templateIds.value = calculatedTemplateStore.getTemplateIdsByNo(resonatorNo)
  comparisons.value = calculatedTemplateStore.getComparisonsByNo(resonatorNo)

  resonatorInfo.value = await resonatorStore.getInfoByNo(resonatorNo)
})
</script>

<style scoped lang="sass">
.name
  max-width: 60px
</style>
