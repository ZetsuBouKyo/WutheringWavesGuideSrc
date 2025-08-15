<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item v-for="sonata in sonatas" v-on:click="jumpToSection(goTo, `#sonata${sonata.id}`)">
          <div class="d-flex flex-row align-center">
            <img :src="sonata.icon" class="mr-2" height="24px" />
            <span>
              {{ $t(sonata.name) }}
            </span>
          </div>
        </v-list-item>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <SonataInfo v-for="sonata in sonatas" class="mt-16" :info="sonata" :key="sonata?.id" />
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { useGoTo } from 'vuetify'

import { getSonataInfos } from "@/stores/sonata"

import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()
const sonatas = getSonataInfos()
</script>

<style scoped lang="sass">
</style>
