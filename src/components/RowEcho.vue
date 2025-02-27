<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-combobox v-model="echo._item" :items="echoItems" :label="$t('general.name')" :rules="[checkEchoName]"
        @update:modelValue="updateEchoByName"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echo.sonata" :items="sonataNames" :label="$t('general.sonata')"
        :disabled="sonataNames.length === 0"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="echo.cost" :label="$t('general.echo_cost')" readonly>
      </v-text-field>
    </div>
    <!-- Main affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-select class="mr-6" v-model="echo._main_affix_item" :items="mainAffixKeys"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))" :key="echo._main_affix_item.value"
        @update:modelValue="updateEchoMainAffix"></v-select>
      <v-text-field v-model="echo.main_affix[echo._main_affix_item.value]"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))" :key="echo.main_affix[echo._main_affix_item.value]"
        @update:modelValue="echoes.resetPolicy"></v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.fixed_main_affix') }}</span>
    </div>
    <div class="d-flex flex-row" :key="echo._fixed_main_affix_key">
      <v-text-field v-model="echo.main_affix[echo._fixed_main_affix_key]"
        :label="$t(getAffixLabelByKey(echo._fixed_main_affix_key))" :key="echo.main_affix[echo._fixed_main_affix_key]"
        @update:modelValue="echoes.resetPolicy"></v-text-field>
    </div>
    <!-- Sub affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in echoStore.getSubAffixKeys()" class="d-flex flex-row">
      <v-combobox v-model="echo.sub_affix[key]" :items="(subAffixes as any)[key]" :label="$t(getAffixLabelByKey(key))"
        :key="key" @update:modelValue="echoes.resetPolicy"></v-combobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import subAffixes from "@/assets/data/echo/sub_affixes.json";

import { useRowEchoesStore } from '@/stores/calculation/echoes';
import { useEchoStore } from '@/stores/echo';

import { getAffixLabelByKey, getMainAffixes } from '@/ww/echo';

const props = defineProps({
  i: {
    type: Number,
    required: true
  },
  id: {
    type: String,
    required: true
  },
});

const i = props.i
const id = props.id

const { t } = useI18n()

const echoStore = useEchoStore()
const echoItems = echoStore.getEchoItemsForCalculation()
const sonataNames = ref<Array<string>>(echoStore.getSonataNames())

const mainAffixKeys = ref<Array<{ title: string, value: any }>>([])

const echoes = useRowEchoesStore(id)
const echo = echoes.getEcho(i)

function checkEchoName(item: { title: string, value: any }) {
  if (echoItems.some(e => e.title === item.title)) {
    return true
  }
  return t('general.error')
}

function updateMainAffixKeysByCost() {
  if (!echo.cost) {
    return
  }
  const mainAffixes = getMainAffixes(echo.cost)
  mainAffixKeys.value = Object.keys(mainAffixes).map((value: any, _, __) => {
    return { title: getAffixLabelByKey(value), value: value };
  });
}

function updateEchoByName(item: { title: string, value: any }) {
  const check = checkEchoName(item)
  if (check !== true) {
    return
  }
  updateMainAffixKeysByCost()
  echoes.resetPolicy()

  if (item.value.sonatas && item.value.sonatas.length > 0) {
    sonataNames.value = item.value.sonatas
  } else {
    sonataNames.value = echoStore.getSonataNames()
  }

  echo.updateByEchoItem(item)
}

function updateEchoMainAffix(item: string) {
  echoes.resetPolicy()

  echo._main_affix_item = {
    title: getAffixLabelByKey(item),
    value: item
  }
  const key = echo._main_affix_item.value
  const cost = echo.cost
  if (!key || !cost) {
    return
  }
  const mainAffixes = getMainAffixes(cost)
  echo.main_affix[echo._main_affix_item.value] = mainAffixes[key]
}

watch(() => { return echo.cost }, () => {
  updateMainAffixKeysByCost()
})
</script>