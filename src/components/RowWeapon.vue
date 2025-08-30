<template>
  <div class="d-flex flex-column w-100">
    <WeaponFilter class="d-flex mb-2" v-model="selectedWeapon" @update:modelValue="filter" />
    <RarityFilter class="d-flex mb-4" v-model="selectedRarity" @update:modelValue="filter"
      :rarities='["3", "4", "5"]' />
    <div class="d-flex flex-row mb-4">
      <v-combobox v-model="weapon.data.name" :items="weaponNames" :label="$t('general.name')" :rules="[checkWeaponName]"
        @update:modelValue="weapon.updateRowWeaponByName()" variant="outlined" density="compact" hide-details>
      </v-combobox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="weapon.data.level" :items="weapon.data.getLevels()" :label="$t('general.level')"
        @update:modelValue="weapon.updateRowWeaponByName()" variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="weapon.data.tune" :items="weaponTunes" :label="$t('general.tune')"
        @update:modelValue="weapon.updateRowWeaponByName()" variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { getWeaponInfos } from "@/stores/weapon"

import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useWeaponStore } from '@/stores/weapon';

const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});
const id = props.id

const { t } = useI18n()

const weaponStore = useWeaponStore()
const weaponInfos = getWeaponInfos()

const selectedWeapon = ref(undefined)
const selectedRarity = ref(undefined)
const weaponNames = ref(weaponInfos.getNames(selectedWeapon.value, selectedRarity.value))

const weaponTunes = weaponStore.getTunes()

const weapon = useRowWeaponStore(id)

function checkWeaponName(name: string) {
  if (weaponNames.value.includes(name)) {
    return true
  }
  return t('general.error')
}

function filter() {
  weaponNames.value = weaponInfos.getNames(selectedWeapon.value, selectedRarity.value)
}
</script>