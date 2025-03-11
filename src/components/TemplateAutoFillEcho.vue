<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-4">
      <v-select v-model="echoes.base_attr" :items="getResonatorBaseAttrs()" :label="$t('general.base_attr')"
        @update:modelValue="updateEchoesWith43311(resonator.resonator, weapon, echoes)" variant="outlined"
        density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="echoes.main_skill_bonus" :items="getResonatorMainSkillBonus()"
        :label="$t('general.main_skill_bonus')"
        @update:modelValue="updateEchoesWith43311(resonator.resonator, weapon, echoes)" variant="outlined"
        density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-combobox v-model="echoes.getEcho(0)._item" :items="echoes.getEcho(0).getEchoItems()"
        :label="$t('general.nth_echo', { n: 1 })" @update:modelValue="echoes.getEcho(0).updateByEchoItem()"
        variant="outlined" density="compact" hide-details>
      </v-combobox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="echoes.policy" :items="echoes.getEchoPolicyItems()" :label="$t('general.echo_policy')"
        @update:modelValue="updateEchoesWith43311(resonator.resonator, weapon, echoes)" variant="outlined"
        density="compact" hide-details>
      </v-select>
    </div>
    <div v-for="(e, i) in echoes.echoes" class="d-flex flex-row mb-4" :key="i">
      <v-select v-model="e.sonata" :items="e._sonatas" :label="$t('general.nth_sonata', { n: i + 1 })"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useTemplateStore } from '@/stores/calculation/template';

import { getResonatorBaseAttrs, getResonatorMainSkillBonus } from '@/ww/resonator';
import { updateEchoesWith43311 } from "@/ww/echoes"

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

const template = useTemplateStore(id)
const resonator = template.data.calculation.resonators[i]
const echoes = resonator.echoes
const weapon = resonator.weapon
</script>