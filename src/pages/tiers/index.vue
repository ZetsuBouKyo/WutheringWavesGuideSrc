<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item v-for="t in tiers" :title="$t(`tiers.${t}`)"
          v-on:click="jumpToSection(goTo, `#${t}`)"></v-list-item>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <v-container>
        <v-row class="my-1">
          <h1>{{ $t('general.tiers') }}</h1>
        </v-row>
        <div v-for="t in tiers">
          <v-row class="my-1">
            <h2 :id="t">{{ $t(`tiers.${t}`) }}</h2>
          </v-row>
          <v-tooltip v-for="afffixPolicy in afffixPolicies" location="bottom">
            <template v-slot:activator="{ props }">
              <v-list-item v-bind="props" class="text-blue-accent-1" :title="$t(`general.${afffixPolicy}`)"
                :to="`/tiers/${t}/${afffixPolicy}`" :active="false">
              </v-list-item>
            </template>
          </v-tooltip>
        </div>
      </v-container>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { useGoTo } from 'vuetify'

import { TierEnum } from "@/types/tier";
import { AffixPolicyEnum } from '@/types/affix';

import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()
const tiers: Array<string> = Object.values(TierEnum)
const afffixPolicies: Array<string> = Object.values(AffixPolicyEnum)
</script>

<style scoped lang="sass">
</style>
