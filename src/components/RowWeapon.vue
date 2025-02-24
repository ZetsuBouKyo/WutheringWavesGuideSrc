<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-select v-model="weapon.name" :items="weaponNames" :label="$t('general.name')"
        @update:modelValue="weapon.updateRowWeaponByName()"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="weapon.level" :items="weaponLevels" :label="$t('general.level')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="weapon.tune" :items="weaponTunes" :label="$t('general.tune')"></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useRowWeaponStore from '@/stores/calculation/weapon';

import { useWeaponStore } from '@/stores/weapon';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const weaponStore = useWeaponStore()
const weaponNames = weaponStore.getNames()
const weaponLevels = weaponStore.getLevels()
const weaponTunes = weaponStore.getTunes()

const weapon = useRowWeaponStore(id)
</script>