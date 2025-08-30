<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('general.resonator') }}</h1>
    <div class="d-flex flex-column mb-4">
      <ElementFilter class="d-flex mb-2" v-model="selectedElement" @update:modelValue="filter" />
      <RarityFilter class="d-flex mb-2" v-model="selectedRarity" @update:modelValue="filter" :rarities='["4", "5"]' />
      <WeaponFilter class="d-flex" v-model="selectedWeapon" @update:modelValue="filter" />
    </div>
    <h2 class="mb-4">{{ $t('resonators.damage_analysis') }}</h2>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <template v-for="resonator in dResonators" :key="resonator.no">
        <v-tooltip v-if="resonator.show" :text="`${resonator.no} ${resonator.name}`">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${resonator.no}`">
              <v-img width="100" :src="resonator.iconSrc"></v-img>
              <v-row no-gutters align="center" justify="center">
                <img :src="resonator.elementSrc" height="36">
                <span class="mr-2 text-truncate name">{{ resonator.name }}</span>
              </v-row>
            </v-card>
          </template>
        </v-tooltip>
      </template>
    </v-sheet>
    <h2 class="my-4">{{ $t('general.wiki') }}</h2>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <template v-for="resonator in wResonators" :key="resonator.no">
        <v-tooltip v-if="resonator.show" :text="`${resonator.no} ${resonator.name}`">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${resonator.no}/wiki`">
              <v-img width="100" :src="resonator.iconSrc"></v-img>
              <v-row no-gutters align="center" justify="center">
                <img :src="resonator.elementSrc" height="36">
                <span class="mr-2 text-truncate name">{{ resonator.name }}</span>
              </v-row>
            </v-card>
          </template>
        </v-tooltip>
      </template>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

import { type IBasicResonatorInfo } from '@/types/resonator';

import { useResonatorStore } from '@/stores/resonator';
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate';
import ElementFilter from '@/components/ElementFilter.vue';


const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()

const dResonators = reactive<Array<IBasicResonatorInfo>>([])
const wResonators = reactive<Array<IBasicResonatorInfo>>([])
const selectedElement = ref(undefined)
const selectedRarity = ref(undefined)
const selectedWeapon = ref(undefined)

function sorting(resonatorA: any, resonatorB: any) {
  const noA = parseFloat(resonatorA.no)
  const noB = parseFloat(resonatorB.no)
  if (!noA || !noB) {
    return 0
  }
  return noA - noB
}

function filter() {
  const r = [dResonators, wResonators]
  for (const resonators of r) {
    for (const resonator of resonators) {
      resonator.show = true
      if (selectedElement.value) {
        if (resonator.element_en !== selectedElement.value) {
          resonator.show = false
        }
      }
      if (selectedRarity.value) {
        if (resonator.rarity.toString() !== selectedRarity.value) {
          resonator.show = false
        }
      }
      if (selectedWeapon.value) {
        if (resonator.weapon_zh_tw !== selectedWeapon.value) {
          resonator.show = false
        }
      }
    }
  }
}

onMounted(async () => {
  // Damage analysis
  await calculatedTemplateStore.init()
  const dNames = calculatedTemplateStore.getNames(spoiler)
  dNames.forEach(async (name: string) => {
    const no = resonatorStore.getNoByName(name)
    const info = await resonatorStore.getInfoByNo(no)
    const resonator = info.getBasicInfo()
    dResonators.push(resonator)
    dResonators.sort(sorting)
  })

  // WIKI
  const wNames = resonatorStore.getNames()
  wNames.forEach(async (name: string) => {
    const no = resonatorStore.getNoByName(name)
    const info = await resonatorStore.getInfoByNo(no)
    const resonator = info.getBasicInfo()
    wResonators.push(resonator)
    wResonators.sort(sorting)
  })
})
</script>

<style scoped lang="sass">
  .name
    max-width: 60px
</style>
