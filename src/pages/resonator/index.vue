<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('resonators.damage_analysis') }}</h1>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <v-tooltip :text="`${resonator.no} ${resonator.name}`" v-for="resonator in resonators" :key="resonator.no">
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
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRoute } from 'vue-router'

import { useResonatorStore } from '@/stores/resonator';
import { useCalculatedTemplateStore } from '@/stores/calculatedTemplate';

interface IResonator {
  no: string
  name: string
  elementSrc: string
  iconSrc: string
}

const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const resonatorStore = useResonatorStore()
const calculatedTemplateStore = useCalculatedTemplateStore()

const resonators = reactive<Array<IResonator>>([])

onMounted(async () => {
  await calculatedTemplateStore.init()
  const names = calculatedTemplateStore.getNames(spoiler)
  names.forEach(async (name: string) => {
    const no = resonatorStore.getNoByName(name)
    const elementSrc = await resonatorStore.getElementSrcByNo(no)
    const iconSrc = resonatorStore.getIconSrcByNo(no)
    const resonator = {
      no: no,
      name: name,
      iconSrc: iconSrc,
      elementSrc: elementSrc
    }
    resonators.push(resonator)
    resonators.sort((resonatorA: any, resonatorB: any) => {
      const noA = parseFloat(resonatorA.no)
      const noB = parseFloat(resonatorB.no)
      if (!noA || !noB) {
        return 0
      }
      return noA - noB
    })
  })
})
</script>

<style scoped lang="sass">
  .name
    max-width: 60px
</style>
