<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-4">
      <v-combobox v-model="echo._item" :items="echo.getEchoItems()" :label="$t('general.name')"
        @update:modelValue="(item) => { echoes.updateEchoByEchoItem(i, item) }" variant="outlined" density="compact"
        hide-details>
      </v-combobox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="echo.sonata" :items="echo._sonatas" :label="$t('general.sonata')"
        :disabled="echo._sonatas.length === 0" variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="echo.cost" :label="$t('general.echo_cost')" :items="echo.getCosts()"
        @update:modelValue="(item) => { echoes.updateEchoByCost(i, item) }" variant="outlined" density="compact"
        hide-details>
      </v-select>
    </div>
    <!-- Main affixes -->
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select class="mr-6 w-50" v-model="echo._main_affix_item" :items="echo._main_affix_items"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))" :key="echo._main_affix_item.value"
        @update:modelValue="(item) => { echoes.updateEchoMainAffix(i, item) }" variant="outlined" density="compact"
        hide-details>
      </v-select>
      <v-text-field class="w-50" v-model="echo.main_affix[echo._main_affix_item.value]"
        :label="$t(getAffixLabelByKey(echo._main_affix_item.value))" :key="echo.main_affix[echo._main_affix_item.value]"
        @update:modelValue="echoes.resetPolicy" variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.fixed_main_affix') }}</span>
    </div>
    <div class="d-flex flex-row mb-4" :key="echo._fixed_main_affix_key">
      <v-text-field v-model="echo.main_affix[echo._fixed_main_affix_key]"
        :label="$t(getAffixLabelByKey(echo._fixed_main_affix_key))" :key="echo.main_affix[echo._fixed_main_affix_key]"
        @update:modelValue="echoes.resetPolicy" variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <!-- Sub affixes -->
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in echo.getSubAffixKeys()" class="d-flex flex-row mb-4">
      <v-combobox v-model="echo.sub_affix[key]" :items="(subAffixes as any)[key]" :label="$t(getAffixLabelByKey(key))"
        :key="key" @update:modelValue="echoes.resetPolicy" variant="outlined" density="compact" hide-details>
      </v-combobox>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'
import { useI18n } from 'vue-i18n'

import subAffixes from "@/assets/data/echo/sub_affixes.json";

import { useRowEchoesStore } from '@/stores/calculation/echoes';

import { getAffixLabelByKey } from '@/ww/echo';

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

const echoes = useRowEchoesStore(id)
const echo = echoes.getEcho(i)

watch(() => { return echo.cost }, () => {
  echo.updateMainAffixKeysByCost()
})
</script>