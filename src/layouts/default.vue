<template>
  <v-main class="mx-16">
    <v-row class="my-4">
      <img class="mr-4" src="@/assets/logo.png" height="48px" />
      <h1>{{ $t('nav.title') }}</h1>
    </v-row>
    <v-tabs align-tabs="center" color="blue-accent-1">
      <v-tab to="/">{{ $t('nav.tab.welcome') }}</v-tab>
      <v-tab to="/resonator">{{ $t('nav.tab.resonator') }}</v-tab>
      <v-tab to="/tier">{{ $t('nav.tab.tier') }}</v-tab>
    </v-tabs>
    <router-view />
  </v-main>

  <AppFooter />
</template>

<script lang="ts" setup>
//
</script>
