<template>
  <v-container>
    <v-list class="left">
      <slot></slot>
    </v-list>
  </v-container>
</template>

<script lang="ts" setup>
//
</script>

<style scoped lang="sass">
.left
  max-height: calc(80vh - var(--ww-nav-height) - var(--ww-footer-height))
</style>