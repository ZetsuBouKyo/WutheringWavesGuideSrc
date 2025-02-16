<template>
  <v-container>
    <v-row no-gutters>
      <v-col class="left position-fixed">
        <slot name="left"></slot>
      </v-col>
      <v-col class="right" cols="9">
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
    margin-left: 30%
</style>