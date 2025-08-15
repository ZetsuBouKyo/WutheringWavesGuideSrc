<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('general.echo') }}</h1>
    <span>{{ $t('general.total') }}: {{ echoes.length }}</span>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <v-tooltip v-for="echo in echoes" :text="`${echo.code} ${echo.name}`" :key="echo.id" location="top">
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
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { useEchoStore } from '@/stores/echo';

const echoStore = useEchoStore()
const echoes = echoStore.getEchoes()

</script>

<style scoped lang="sass">
.name
  min-width: 100px
  max-width: 100px
</style>
