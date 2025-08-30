<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('general.weapon') }}</h1>
    <div class="d-flex flex-column mb-4">
      <WeaponFilter class="d-flex mb-2" v-model="selectedWeapon" @update:modelValue="filter" />
      <RarityFilter class="d-flex mb-2" v-model="selectedRarity" @update:modelValue="filter"
        :rarities='["3", "4", "5"]' />
    </div>
    <span>{{ $t('general.total') }}: {{ getNumber() }}</span>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <template v-for="weapon in weapons" :key="weapon.id">
        <v-tooltip v-if="weapon.show" :text="weapon.name" location="top">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/weapon/${weapon.id}`">
              <v-row class="my-1" no-gutters align="center" justify="center">
                <v-img width="100" :src="weapon.icon"></v-img>
              </v-row>
              <v-row no-gutters align="center" justify="center">
                <span class="mr-2 text-truncate name text-center">{{ weapon.name }}</span>
              </v-row>
            </v-card>
          </template>
        </v-tooltip>
      </template>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

import _weapons from "@/assets/data/weapons.json";

import { type IWeaponInfo } from "@/types/weapon";

interface IWeapon extends IWeaponInfo {
  show?: boolean
}

const selectedWeapon = ref(undefined)
const selectedRarity = ref(undefined)

let weapons: Array<IWeapon> = _weapons

for (const weapon of weapons) {
  weapon.show = true
}

function filter() {
  for (const weapon of weapons) {
    weapon.show = true
    if (selectedWeapon.value) {
      if (weapon.type_zh_tw !== selectedWeapon.value) {
        weapon.show = false
      }
    }
    if (selectedRarity.value) {
      if (weapon.rarity.toString() !== selectedRarity.value) {
        weapon.show = false
      }
    }
  }
}

function getNumber() {
  let c = 0
  for (const weapon of weapons) {
    if (weapon.show) {
      c += 1
    }
  }
  return c
}
</script>

<style scoped lang="sass">
.name
  min-width: 100px
  max-width: 100px
</style>
