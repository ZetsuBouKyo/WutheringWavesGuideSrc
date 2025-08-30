<template>
  <v-main class="nav position-fixed w-100">
    <v-row class="mx-8 my-4">
      <a href="/"><img class="mr-4" src="/assets/logo.png" height="48px" /></a>
      <h1 class="text-truncate">{{ $t('nav.title') }}</h1>
    </v-row>
    <v-tabs align-tabs="center" color="blue-accent-1" show-arrows>
      <v-tab to="/">{{ $t('nav.tab.welcome') }}</v-tab>
      <v-tab to="/guide">{{ $t('nav.tab.guide') }}</v-tab>
      <v-tab to="/resonator">{{ $t('nav.tab.resonator') }}</v-tab>
      <v-tab to="/weapon">{{ $t('nav.tab.weapon') }}</v-tab>
      <v-tab to="/echo">{{ $t('nav.tab.echo') }}</v-tab>
      <v-tab to="/sonata">{{ $t('nav.tab.sonata') }}</v-tab>
      <v-tab to="/tiers">{{ $t('nav.tab.tiers') }}</v-tab>
      <v-tab to="/tool/simple_calculator">{{ $t('nav.tab.tool') }}</v-tab>
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
    margin-top: var(--ww-nav-height)
    margin-bottom: 60px
</style>