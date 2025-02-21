<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item :title="$t('template.header.basic_info')"
          v-on:click="jumpToSection(goTo, '#basic_info')"></v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#resonator')">
          <span class="ml-4 text-truncate">{{ $t('template.header.resonator') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#echo')">
          <span class="ml-4 text-truncate">{{ $t('template.header.echo') }}</span>
        </v-list-item>
        <v-list-item :title="$t('template.header.damage_analysis')"
          v-on:click="jumpToSection(goTo, '#damage_analysis')"></v-list-item>
        <v-list-item :title="$t('general.rotation')" v-on:click="jumpToSection(goTo, '#rotation')"></v-list-item>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <v-container class="mb-4">
        <v-row class="my-1">
          <h1>{{ title }}</h1>
        </v-row>
        <v-row class="my-2 ml-8">
          <span>{{ $t('general.template_id') }}: {{ $t(templateId) }}</span>
        </v-row>

        <!-- Basic information -->
        <v-row class="my-1">
          <h2 id="basic_info">{{ $t('template.header.basic_info') }}</h2>
        </v-row>
        <v-row class="my-1 ml-8">
          <h3 id="resonator">{{ $t('template.header.resonator') }}</h3>
        </v-row>
        <v-data-table class="table my-2 mx-8" :items="resonatorsTable" disable-sort hide-default-footer>
        </v-data-table>
        <v-row class="my-1 ml-8">
          <h3 id="echo">{{ $t('template.header.echo') }}</h3>
        </v-row>
        <v-data-table class="table my-2 mx-8" :items="echoesTable" disable-sort hide-default-footer>
        </v-data-table>

        <!-- Damage analysis -->
        <v-row class="my-1">
          <h2 id="damage_analysis">{{ $t('template.header.damage_analysis') }}</h2>
        </v-row>
        <!-- Affixes 15-1 -->
        <v-row class="my-1 ml-8">
          <h3 id="affixes_15_1">{{ $t('general.affixes_15_1') }}</h3>
        </v-row>
        <v-row class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100" :title="$t('template.header.detailed_damage_analysis')"
            :to="`/template/${hashedTemplateId}/damage_analysis/affixes_15_1`" :active="false"></v-list-item>
        </v-row>
        <v-row v-for="resonatorName in resonatorNames" class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100"
            :title="$t('template.header.echo_damage_comparison', { name: resonatorName })"
            :to="`/template/${hashedTemplateId}/echo_comparison/affixes_15_1/${resonatorStore.getNoByName(resonatorName)}`"
            :active="false"></v-list-item>
        </v-row>
        <!-- Affixes 20 small -->
        <v-row class="my-1 ml-8">
          <h3 id="affixes_20_small">{{ $t('general.affixes_20_small') }}</h3>
        </v-row>
        <v-row class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100" :title="$t('template.header.detailed_damage_analysis')"
            :to="`/template/${hashedTemplateId}/damage_analysis/affixes_20_small`" :active="false"></v-list-item>
        </v-row>
        <v-row v-for="resonatorName in resonatorNames" class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100"
            :title="$t('template.header.echo_damage_comparison', { name: resonatorName })"
            :to="`/template/${hashedTemplateId}/echo_comparison/affixes_20_small/${resonatorStore.getNoByName(resonatorName)}`"
            :active="false"></v-list-item>
        </v-row>
        <!-- Affixes 20 skill bonus -->
        <v-row class="my-1 ml-8">
          <h3 id="affixes_20_skill_bonus">{{ $t('general.affixes_20_skill_bonus') }}</h3>
        </v-row>
        <v-row class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100" :title="$t('template.header.detailed_damage_analysis')"
            :to="`/template/${hashedTemplateId}/damage_analysis/affixes_20_skill_bonus`" :active="false"></v-list-item>
        </v-row>
        <v-row v-for="resonatorName in resonatorNames" class="my-1 ml-16">
          <v-list-item class="text-blue-accent-1 w-100"
            :title="$t('template.header.echo_damage_comparison', { name: resonatorName })"
            :to="`/template/${hashedTemplateId}/echo_comparison/affixes_20_skill_bonus/${resonatorStore.getNoByName(resonatorName)}`"
            :active="false"></v-list-item>
        </v-row>

        <!-- Rotation -->
        <v-row class="my-1">
          <h2 id="rotation">{{ $t('general.rotation') }}</h2>
        </v-row>
        <Rotation v-if="template" class="my-2 ml-8" :rotation="template.getRotation()" />
      </v-container>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useGoTo } from 'vuetify'
import { useI18n } from 'vue-i18n'

import { useResonatorStore } from '@/stores/resonator';
import { useTemplateStore } from '@/stores/template';
import { useCalculatedTemplateStore } from '@/stores/calculateTemplate';

import { jumpToSection } from '@/ww/utils';

const goTo = useGoTo()

const { t } = useI18n()

const route = useRoute()
const hashedTemplateId = (route.params as { id: string }).id

const calculatedTemplateStore = useCalculatedTemplateStore()
const resonatorStore = useResonatorStore()
const templateStore = useTemplateStore()


const resonatorNames = ref<Array<string>>([])
const title = ref<string>("")

const template = ref<any>(undefined)
const templateId = ref<string>("")
const resonatorsTable = reactive<Array<any>>([])
const echoesTable = reactive<Array<any>>([])

onMounted(async () => {
  await calculatedTemplateStore.init()
  templateId.value = calculatedTemplateStore.getTemplateIdByHashedTemplateId(hashedTemplateId)
  template.value = await templateStore.getTemplateByHashedTemplateId(hashedTemplateId)

  resonatorNames.value = calculatedTemplateStore.getResonatorNamesForEchoComparisonByHashedTemplateId(hashedTemplateId)

  const resonatorNamesForTitle: Array<string> = []
  template.value.getResonatorNames().forEach((name: string) => {
    resonatorNamesForTitle.push(t(name))
  })

  template.value.resonators.forEach((resonator: any) => {
    const rowResonator: any = {}
    rowResonator[t('general.resonator_name')] = resonator.resonator_name
    rowResonator[t('general.resonator_chain')] = resonator.resonator_chain
    rowResonator[t('general.weapon_name')] = resonator.resonator_weapon_name
    rowResonator[t('general.weapon_tune')] = resonator.resonator_weapon_rank
    rowResonator[t('general.base_attr')] = resonator.resonator_base_attr
    rowResonator[t('general.main_skill_bonuss')] = resonator.resonator_skill_bonus
    rowResonator[t('general.resonator_energy_regen')] = resonator.resonator_energy_regen
    resonatorsTable.push(rowResonator)

    const rowEchoes: any = {}
    rowEchoes[t('general.resonator_name')] = resonator.resonator_name
    rowEchoes[t('general.echo_name_1')] = resonator.resonator_echo_1
    rowEchoes[t('general.echo_sonata_1')] = resonator.resonator_echo_sonata_1
    rowEchoes[t('general.echo_sonata_2')] = resonator.resonator_echo_sonata_2
    rowEchoes[t('general.echo_sonata_3')] = resonator.resonator_echo_sonata_3
    rowEchoes[t('general.echo_sonata_4')] = resonator.resonator_echo_sonata_4
    rowEchoes[t('general.echo_sonata_5')] = resonator.resonator_echo_sonata_5
    echoesTable.push(rowEchoes)
  });
  title.value = resonatorNamesForTitle.join(" | ")
})

</script>

<style scoped lang="sass">
.table
  display: block
  overflow-x: auto
  white-space: nowrap
</style>