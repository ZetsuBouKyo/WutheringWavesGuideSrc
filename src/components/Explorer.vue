<template>
  <v-main class="nav position-fixed w-100">
    <v-row class="mx-8 my-4">
      <a href="/"><img class="mr-4" src="/assets/logo.png" height="48px" /></a>
      <h1 class="text-truncate">{{ $t('nav.title') }}</h1>
      <v-tabs class="ml-8" align-tabs="start" color="blue-accent-1">
        <v-tab to="/calculation/simple">{{ $t('calculation.tab.simple') }}</v-tab>
        <v-tab to="/calculation/template">{{ $t('calculation.tab.template') }}</v-tab>
        <v-tab to="/calculation/rotation">{{ $t('calculation.tab.rotation') }}</v-tab>
      </v-tabs>
    </v-row>
  </v-main>
  <slot></slot>
</template>

<script lang="ts" setup>
//
</script>

<style scoped lang="sass">
.nav
  z-index: 999
  background: rgb(var(--v-theme-background))
</style>