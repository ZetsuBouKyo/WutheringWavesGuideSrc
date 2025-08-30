<template>
  <v-btn-toggle :rounded="false">
    <v-btn v-for="rarity in rarities" :value="rarity">
      <span class="text-h6">{{ rarity }}★</span>
    </v-btn>
  </v-btn-toggle>
</template>

<script lang="ts" setup>
defineProps({
  rarities: {
    type: Array<string>,
    default: ["3", "4", "5"]
  },
});
</script>