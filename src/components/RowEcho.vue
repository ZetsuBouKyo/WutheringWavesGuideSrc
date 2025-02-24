<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-combobox v-model="echo._item" :items="echoItems" :label="$t('general.name')" :rules="[checkEchoName]"
        @update:modelValue="updateEcho"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echo.sonata" :items="sonataNames" :label="$t('general.sonata')"
        :disabled="sonataNames.length === 0"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="echo.cost" :label="$t('general.echo_cost')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-select class="mr-6" v-model="echo._main_affix_item" :items="mainAffixKeys"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))" :key="echo._main_affix_item.value"
        @update:modelValue="updateEchoMainAffix"></v-select>
      <v-text-field v-model="echo.main_affix[echo._main_affix_item.value]"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))"
        :key="echo.main_affix[echo._main_affix_item.value]"></v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.fixed_main_affix') }}</span>
    </div>
    <div class="d-flex flex-row" :key="echo._fixed_main_affix_key">
      <v-text-field v-model="echo.main_affix[echo._fixed_main_affix_key]"
        :label="$t(getAffixLabelByKey(echo._fixed_main_affix_key))"
        :key="echo.main_affix[echo._fixed_main_affix_key]"></v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in echoStore.getSubAffixKeys()" class="d-flex flex-row">
      <v-combobox v-model="echo.sub_affix[key]" :items="subAffixes[key]" :label="$t(getAffixLabelByKey(key))"
        :key="key"></v-combobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import mainAffixes from "@/assets/data/echo/main_affixes.json";
import fixedMainAffixes from "@/assets/data/echo/fixed_main_affixes.json";
import subAffixes from "@/assets/data/echo/sub_affixes.json";

import { StatBuffEnum, StatBuffZhTwEnum } from "@/interfaces/buff";

import useRowEchoStore from '@/stores/calculation/echo';
import { useEchoStore } from '@/stores/echo';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const { t } = useI18n()

const echoStore = useEchoStore()
const echoItems = echoStore.getEchoItemsForCalculation()
const sonataNames = ref<Array<string>>(echoStore.getSonataNames())

const mainAffixKeys = ref<Array<string>>([])

const echo = useRowEchoStore(id)

function getAffixLabelByKey(key: string): string {
  if (!key) {
    return ""
  }
  const label = StatBuffZhTwEnum[key.toUpperCase()]
  if (label) {
    return label
  }
  return ""
}

function getSubAffixValues(key: string) {
  return echoStore.getSubAffixValues(key)
}

function checkEchoName(item: { title: string, value: any }) {
  if (echoItems.some(e => e.title === item.title)) {
    return true
  }
  return t('general.error')
}

function updateEcho(item: { title: string, value: any }) {
  const check = checkEchoName(item)
  if (check !== true) {
    return
  }
  echo.resetMainAffix()
  echo.resetSubAffix()
  echo.sonata = { title: "", value: undefined }
  if (item.value.sonatas && item.value.sonatas.length > 0) {
    sonataNames.value = item.value.sonatas
  } else {
    sonataNames.value = echoStore.getSonataNames()
  }
  echo.name = item.value.name
  echo.cost = item.value.cost
  switch (echo.cost) {
    case "4":
    case "3":
      echo._fixed_main_affix_key = StatBuffEnum.ATK
      break;
    case "1":
      echo._fixed_main_affix_key = StatBuffEnum.HP
      break;
    default:
      break
  }
  mainAffixKeys.value = Object.keys(mainAffixes[echo.cost]).map((value: any, _, __) => {
    return { title: getAffixLabelByKey(value), value: value };
  });
  echo.main_affix[echo._fixed_main_affix_key] = fixedMainAffixes[echo.cost][echo._fixed_main_affix_key]
  echo._main_affix_item = {
    title: "",
    value: undefined
  }
}

function updateEchoMainAffix(item: string) {
  echo._main_affix_item = {
    title: getAffixLabelByKey(item),
    value: item
  }
  const key = echo._main_affix_item.value
  const cost = echo.cost
  if (!key || !cost) {
    return
  }
  echo.main_affix[echo._main_affix_item.value] = mainAffixes[cost][key]
}
</script>