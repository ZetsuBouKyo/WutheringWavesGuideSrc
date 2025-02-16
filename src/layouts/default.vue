<template>
  <v-main class="nav position-fixed w-100">
    <v-row class="mx-8 my-4">
      <img class="mr-4" src="@/assets/logo.png" height="48px" />
      <h1>{{ $t('nav.title') }}</h1>
    </v-row>
    <v-tabs align-tabs="center" color="blue-accent-1">
      <v-tab to="/">{{ $t('nav.tab.welcome') }}</v-tab>
      <v-tab to="/resonator">{{ $t('nav.tab.resonator') }}</v-tab>
      <v-tab to="/tier">{{ $t('nav.tab.tier') }}</v-tab>
    </v-tabs>
  </v-main>
  <router-view class="view" />
  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>

<style scoped lang="sass">
  .nav
    z-index: 999
    background: rgb(var(--v-theme-background))
  .view
    margin-top: 160px
</style>