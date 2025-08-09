<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item :title="$t('resonator.header.skill')" v-on:click="jumpToSection(goTo, '#skill')"></v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#normal_attack')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.normal_attack') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#resonance_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.resonance_skill') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#forte_circuit')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.forte_circuit') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#resonance_liberation')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.resonance_liberation') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#intro_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.intro_skill') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#outro_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.outro_skill') }}</span>
        </v-list-item>
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
        <div class="f-flex flex-row my-1">
          <h2 id="skill">{{ $t('resonator.header.skill') }}</h2>
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="normal_attack">
            {{ $t('resonator.header.normal_attack') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="normal_attack" />
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="resonance_skill">
            {{ $t('resonator.header.resonance_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="resonance_skill" />
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="forte_circuit">
            {{ $t('resonator.header.forte_circuit') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="forte_circuit" />
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="resonance_liberation">
            {{ $t('resonator.header.resonance_liberation') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="resonance_liberation" />
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="intro_skill">
            {{ $t('resonator.header.intro_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="intro_skill" />
        </div>
        <div class="f-flex flex-row my-1">
          <h3 id="outro_skill">
            {{ $t('resonator.header.outro_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="outro_skill" />
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
