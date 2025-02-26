<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-combobox v-model="echo.data._item" :items="echoItems" :label="$t('general.name')" :rules="[checkEchoName]"
        @update:modelValue="updateEcho"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echo.data.sonata" :items="sonataNames" :label="$t('general.sonata')"
        :disabled="sonataNames.length === 0"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="echo.data.cost" :label="$t('general.echo_cost')" readonly>
      </v-text-field>
    </div>
    <!-- Main affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-select class="mr-6" v-model="echo.data._main_affix_item" :items="mainAffixKeys"
        :label="$t(getAffixLabelByKey(echo.data._main_affix_item.value))" :key="echo.data._main_affix_item.value"
        @update:modelValue="updateEchoMainAffix"></v-select>
      <v-text-field v-model="echo.data.main_affix[echo.data._main_affix_item.value]"
        :label="$t(getAffixLabelByKey(echo.data._main_affix_item.value))"
        :key="echo.data.main_affix[echo.data._main_affix_item.value]"></v-text-field>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.fixed_main_affix') }}</span>
    </div>
    <div class="d-flex flex-row" :key="echo.data._fixed_main_affix_key">
      <v-text-field v-model="echo.data.main_affix[echo.data._fixed_main_affix_key]"
        :label="$t(getAffixLabelByKey(echo.data._fixed_main_affix_key))"
        :key="echo.data.main_affix[echo.data._fixed_main_affix_key]"></v-text-field>
    </div>
    <!-- Sub affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in echoStore.getSubAffixKeys()" class="d-flex flex-row">
      <v-combobox v-model="echo.data.sub_affix[key]" :items="(subAffixes as any)[key]"
        :label="$t(getAffixLabelByKey(key))" :key="key"></v-combobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import subAffixes from "@/assets/data/echo/sub_affixes.json";

import { useRowEchoStore } from '@/stores/calculation/echo';
import { useEchoStore } from '@/stores/echo';

import { getAffixLabelByKey, getMainAffixes } from '@/ww/echo';

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

const mainAffixKeys = ref<Array<{ title: string, value: any }>>([])

const echo = useRowEchoStore(id)

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

  if (item.value.sonatas && item.value.sonatas.length > 0) {
    sonataNames.value = item.value.sonatas
  } else {
    sonataNames.value = echoStore.getSonataNames()
  }

  echo.updateByEchoItem(item)

  const mainAffixes = getMainAffixes(echo.data.cost)
  mainAffixKeys.value = Object.keys(mainAffixes).map((value: any, _, __) => {
    return { title: getAffixLabelByKey(value), value: value };
  });
}

function updateEchoMainAffix(item: string) {
  echo.data._main_affix_item = {
    title: getAffixLabelByKey(item),
    value: item
  }
  const key = echo.data._main_affix_item.value
  const cost = echo.data.cost
  if (!key || !cost) {
    return
  }
  const mainAffixes = getMainAffixes(cost)
  echo.data.main_affix[echo.data._main_affix_item.value] = mainAffixes[key]
}
</script>