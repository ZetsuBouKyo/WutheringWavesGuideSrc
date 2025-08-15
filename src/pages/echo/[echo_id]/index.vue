<template>
  <Doc :no-headers="true">
    <template v-slot:right>
      <EchoInfo :info="echo" :key="echo?.id" />
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'

import { useEchoStore } from '@/stores/echo';

const route = useRoute()
const echoStore = useEchoStore()
const echoID = (route.params as { echo_id: number }).echo_id
const echo = echoStore.getInfoByID(echoID)

</script>

<style scoped lang="sass">
</style>
