<template>
  <v-btn-toggle :rounded="false">
    <v-btn v-for="cost in costs" :value="cost">
      <v-tooltip location="bottom" :text="`Cost ${cost}`">
        <template v-slot:activator="{ props }">
          <span class="text-h6" v-bind="props">{{ cost }}</span>
        </template>
      </v-tooltip>
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts" setup>
const costs = ["1", "3", "4"]
</script>
