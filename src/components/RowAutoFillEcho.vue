<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-select v-model="resonator.data.base_attr" :items="getResonatorBaseAttrs()" :label="$t('general.base_attr')"
        @update:modelValue="updateEchoes"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.data.main_skill_bonus" :items="getResonatorMainSkillBonus()"
        :label="$t('general.main_skill_bonus')" @update:modelValue="updateEchoes"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-combobox v-model="echoes.getEcho(0)._item" :items="echoItems" :label="$t('general.nth_echo', { n: 1 })"
        @update:modelValue="updateEchoName1"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echoes.data.policy" :items="getEchoPolicyItems()" :label="$t('general.echo_policy')"
        @update:modelValue="updateEchoes"></v-select>
    </div>
    <div v-for="(e, i) in echoes.data.echoes" class="d-flex flex-row" :key="i">
      <v-select v-model="e.sonata" :items="sonataNames" :label="$t('general.nth_sonata', { n: i + 1 })"></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { AffixPolicyEnum } from "@/types/affix"

import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useRowEchoesStore } from '@/stores/calculation/echoes';
import { useEchoStore } from '@/stores/echo';

import { getResonatorBaseAttrs, getResonatorMainSkillBonus } from '@/ww/resonator';
import { RowAutoFillEchoes } from "@/ww/echoes"

const echoStore = useEchoStore()

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id
const echoes = useRowEchoesStore(id)
const echoItems = echoStore.getEchoItemsForCalculation()

const resonator = useRowResonatorStore(id)
const weapon = useRowWeaponStore(id)

const { t } = useI18n()

const sonataNames = echoStore.getSonataNames()

function updateEchoName1(item: { title: string, value: any }) {
  echoes.getEcho(0).name = item.title
  echoes.getEcho(0)._item = item
}

function updateEchoes() {
  const policy = echoes.data.policy
  if (!policy) {
    return
  }
  const auto = new RowAutoFillEchoes(resonator, weapon, echoes.data.echoes, [], policy)
  auto.update43311()
}

function getEchoPolicyItems(): Array<{ title: string; value: string }> {
  return [
    { title: t(`general.${AffixPolicyEnum.AFFIXES_15_1}`), value: AffixPolicyEnum.AFFIXES_15_1 },
    { title: t(`general.${AffixPolicyEnum.AFFIXES_20_SMALL}`), value: AffixPolicyEnum.AFFIXES_20_SMALL },
    { title: t(`general.${AffixPolicyEnum.AFFIXES_20_SKILL_BONUS}`), value: AffixPolicyEnum.AFFIXES_20_SKILL_BONUS }
  ]
}
</script>