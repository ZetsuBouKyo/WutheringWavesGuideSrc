<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-combobox v-model="weapon.data.name" :items="weaponNames" :label="$t('general.name')" :rules="[checkWeaponName]"
        @update:modelValue="weapon.updateRowWeaponByName()"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="weapon.data.level" :items="weapon.data.getLevels()" :label="$t('general.level')"
        @update:modelValue="weapon.updateRowWeaponByName()"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="weapon.data.tune" :items="weaponTunes" :label="$t('general.tune')"
        @update:modelValue="weapon.updateRowWeaponByName()"></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

import { useRowWeaponStore } from '@/stores/calculation/weapon';

import { useWeaponStore } from '@/stores/weapon';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const { t } = useI18n()

const weaponStore = useWeaponStore()
const weaponNames = weaponStore.getNames()
const weaponTunes = weaponStore.getTunes()

const weapon = useRowWeaponStore(id)

function checkWeaponName(name: string) {
  if (weaponNames.includes(name)) {
    return true
  }
  return t('general.error')
}
</script>