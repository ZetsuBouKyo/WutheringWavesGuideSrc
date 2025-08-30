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
      <template v-for="resonator in dResonators" :key="resonator.id">
        <v-tooltip v-if="resonator.show" :text="`${resonator.id} ${resonator.name}`">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${resonator.id}`">
              <v-img width="100" :src="resonator.icon"></v-img>
              <v-row no-gutters align="center" justify="center">
                <img :src="getElementSrc(resonator.element_en)" height="36">
                <span class="mr-2 text-truncate name">{{ resonator.name }}</span>
              </v-row>
            </v-card>
          </template>
        </v-tooltip>
      </template>
    </v-sheet>
    <h2 class="my-4">{{ $t('general.wiki') }}</h2>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <template v-for="resonator in wResonators" :key="resonator.id">
        <v-tooltip v-if="resonator.show" :text="`${resonator.id} ${resonator.name}`">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${resonator.id}/wiki`">
              <v-img width="100" :src="resonator.icon"></v-img>
              <v-row no-gutters align="center" justify="center">
                <img :src="getElementSrc(resonator.element_en)" height="36">
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

import { getElementSrc } from '@/stores/element';
import { getBasicResonatorInfos } from '@/stores/resonator';
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate';
import ElementFilter from '@/components/ElementFilter.vue';


const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const calculatedTemplateStore = useCalculatedTemplateStore()

const dBasicResonatorInfos = ref(getBasicResonatorInfos([]))
const wBasicResonatorInfos = ref(getBasicResonatorInfos())

const dResonators = ref<Array<IBasicResonatorInfo>>(dBasicResonatorInfos.value.rows)
const wResonators = ref<Array<IBasicResonatorInfo>>(wBasicResonatorInfos.value.rows)
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
wResonators.value.sort(sorting)

function filter() {
  dBasicResonatorInfos.value.filter(selectedElement.value, selectedRarity.value, selectedWeapon.value)
  wBasicResonatorInfos.value.filter(selectedElement.value, selectedRarity.value, selectedWeapon.value)
}

onMounted(async () => {
  // Damage analysis
  await calculatedTemplateStore.init()
  const dNames = calculatedTemplateStore.getNames(spoiler)
  dBasicResonatorInfos.value = getBasicResonatorInfos(dNames)
  dResonators.value = dBasicResonatorInfos.value.rows
  dResonators.value.sort(sorting)
})
</script>

<style scoped lang="sass">
  .name
    max-width: 60px
</style>
