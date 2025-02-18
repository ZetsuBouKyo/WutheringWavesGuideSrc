<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="left position-fixed">
        <slot name="left"></slot>
      </v-col>
      <v-col class="right">
        <slot name="right"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>

<style scoped lang="sass">
  .left
    width: 20%
  .right
    width: 70%
    margin-left: 33%
</style>