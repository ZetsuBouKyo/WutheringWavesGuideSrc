<template>
  <v-container class="h-100">
    <h1 class="mb-4">{{ $t('resonators.damage_analysis') }}</h1>
    <v-sheet class=" d-flex flex-wrap justify-center">
      <v-tooltip :text="`${id} ${resonators.getNameByID(id)}`"
        v-for="id in calculatedTemplates.getCalculatedResonatorIDs()" :key="id">
        <template v-slot:activator="{ props }">
          <v-card class="ma-2 pa-2" v-bind="props" :to="`/resonator/${id}`">
            <v-img width="100" :src="resonators.getIconSrcByID(id)"></v-img>
            <v-row no-gutters align="center" justify="center">
              <img :src="resonators.getElementSrcByID(id)" height="36">
              <span class="mr-2 text-truncate name">{{
                resonators.getNameByID(id) }}</span>
            </v-row>
          </v-card>
        </template>
      </v-tooltip>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import { resonators } from "@/ww/resonator"
import { calculatedTemplates } from "@/ww/template";
</script>

<style scoped lang="sass">
  .name
    max-width: 60px
</style>
