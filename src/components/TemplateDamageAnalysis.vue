<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row ml-auto mb-4">
      <v-btn v-on:click="analyze()">
        {{ $t('general.analyze') }}
      </v-btn>
    </div>
    <div v-if="damageAnalysis" class="d-flex flex-row mb-4">
      <WDamageAnalysis :damageAnalysis="damageAnalysis" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useTemplateStore } from '@/stores/calculation/template'

import { DamageAnalysis } from '@/ww/damage';

import WDamageAnalysis from './DamageAnalysis.vue';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});
const id = props.id
const template = useTemplateStore(id)
const damageAnalysis = ref<DamageAnalysis>(new DamageAnalysis())

function analyze() {
  damageAnalysis.value.calculateByTemplate(template.data)
}
</script>