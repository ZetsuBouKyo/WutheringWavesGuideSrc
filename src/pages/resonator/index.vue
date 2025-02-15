<template>
  <v-container>
    <h1 class="mb-4">{{ $t('resonators.damage_analysis') }}</h1>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <v-tooltip :text="`${no} ${resonators.getNameByNo(no)}`" v-for="no in calculatedResonators" :key="no">
        <template v-slot:activator="{ props }">
          <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${no}`">
            <v-img width="100" :src="resonators.getIconSrcByNo(no)"></v-img>
            <v-row no-gutters align="center" justify="center">
              <img :src="resonators.getElementSrcByNo(no)" height="36">
              <span class="mr-2 text-truncate name">{{
                resonators.getNameByNo(no) }}</span>
            </v-row>
          </v-card>
        </template>
      </v-tooltip>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import calculatedResonators from "@/assets/calculation/resonators.json"
import { resonators } from "@/ww/resonator"
</script>

<style scoped lang="sass">
  .name
    max-width: 60px
</style>