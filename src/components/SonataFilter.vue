<template>
  <v-btn-toggle class="d-flex flex-wrap h-100" :rounded="false">
    <v-btn v-for="sonata in sonatas" class="d-flex px-1 py-2" :value="sonata.name">
      <v-tooltip location="bottom" :text="sonata.name">
        <template v-slot:activator="{ props }">
          <img :src="sonata.icon" v-bind="props" height="36">
        </template>
      </v-tooltip>
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts" setup>
import sonatas from "@/assets/data/sonatas.json";
</script>