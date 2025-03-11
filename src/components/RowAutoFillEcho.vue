<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-select v-model="echoes.data.base_attr" :items="getResonatorBaseAttrs()" :label="$t('general.base_attr')"
        @update:modelValue="updateEchoesWith43311(resonator.data, weapon.data, echoes.data)"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echoes.data.main_skill_bonus" :items="getResonatorMainSkillBonus()"
        :label="$t('general.main_skill_bonus')"
        @update:modelValue="updateEchoesWith43311(resonator.data, weapon.data, echoes.data)"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-combobox v-model="echoes.getEcho(0)._item" :items="echoes.getEcho(0).getEchoItems()"
        :label="$t('general.nth_echo', { n: 1 })"
        @update:modelValue="echoes.getEcho(0).updateByEchoItem()"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="echoes.data.policy" :items="echoes.getEchoPolicyItems()" :label="$t('general.echo_policy')"
        @update:modelValue="updateEchoesWith43311(resonator.data, weapon.data, echoes.data)"></v-select>
    </div>
    <div v-for="(e, i) in echoes.data.echoes" class="d-flex flex-row" :key="i">
      <v-select v-model="e.sonata" :items="e._sonatas" :label="$t('general.nth_sonata', { n: i + 1 })"></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useRowEchoesStore } from '@/stores/calculation/echoes';

import { getResonatorBaseAttrs, getResonatorMainSkillBonus } from '@/ww/resonator';
import { updateEchoesWith43311 } from "@/ww/echoes"

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id
const echoes = useRowEchoesStore(id)

const resonator = useRowResonatorStore(id)
const weapon = useRowWeaponStore(id)
</script>