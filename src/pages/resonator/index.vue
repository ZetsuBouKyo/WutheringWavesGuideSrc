<template>
  <v-container>
    <h1 class="my-2">{{ $t('resonators.damage_analysis') }}</h1>
    <v-sheet class="d-flex flex-wrap">
      <v-card v-for="(icon, i) in calculatedResonatorIcons" :key="i" class="ma-2 pa-2">
        <v-img width="80" :src="icon"></v-img>
        Flex item
      </v-card>
    </v-sheet>
  </v-container>
</template>

<script lang="ts" setup>
import calculatedResonators from "@/assets/calculation/resonators.json"

const calculatedResonatorIcons: Array<string> = []
for (const no of calculatedResonators) {
  calculatedResonatorIcons.push(new URL(`../../assets/resonators/${no}/icon.png`, import.meta.url).href)
}
console.log(calculatedResonatorIcons)

</script>