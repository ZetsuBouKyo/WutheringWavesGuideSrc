<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('general.echo') }}</h1>
    <div class="d-flex flex-column mb-4">
      <SonataFilter class="d-flex mb-2" v-model="selectedSonata" @update:modelValue="filter" />
      <CostFilter class="d-flex mb-2" v-model="selectedCost" @update:modelValue="filter" />
    </div>
    <span>{{ $t('general.total') }}: {{ getNumber() }}</span>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <template v-for="echo in echoes" :key="echo.id">
        <v-tooltip v-if="echo.show" :text="`${echo.code} ${echo.name}`" location="top">
          <template v-slot:activator="{ props }">
            <v-card class="ma-2 pa-2" v-bind="props" :to="`/echo/${echo.id}`">
              <v-row class="my-1" no-gutters align="center" justify="center">
                <v-img width="100" :src="echo.icon"></v-img>
              </v-row>
              <v-row class="my-1" no-gutters align="center" justify="center">
                <v-tooltip v-for="group in echo.groups" :text="`${group.name}`" location="top">
                  <template v-slot:activator="{ props }">
                    <img class="mx-1" v-bind="props" :src="group.icon" height="24">
                  </template>
                </v-tooltip>
              </v-row>
              <v-row no-gutters align="center" justify="center">
                <!-- <img :src="resonator.elementSrc" height="36"> -->
                <span class="mr-2 text-truncate name text-center">{{ echo.name }}</span>
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

import CostFilter from '@/components/CostFilter.vue';
import { useEchoStore } from '@/stores/echo';

const echoStore = useEchoStore()
const echoes = echoStore.getEchoes()

const selectedSonata = ref(undefined)
const selectedCost = ref(undefined)

function filter() {
  for (const echo of echoes) {
    echo.show = true
    if (selectedSonata.value) {
      if (!echo.sonatas.includes(selectedSonata.value)) {
        echo.show = false
      }
    }
    if (selectedCost.value) {
      if (echo.cost !== selectedCost.value) {
        echo.show = false
      }
    }
  }
}

function getNumber() {
  let c = 0
  for (const echo of echoes) {
    if (echo.show) {
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
