<template>
  <Explorer>
    <v-container class="nav d-flex flex-columnmx-auto pl-8">
      <div class="d-flex flex-row w-100">
        <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1" v-model="tab">
          <v-tab value="resonator">{{ $t('general.resonator') }}</v-tab>
          <v-tab value="echo">{{ $t('general.echo') }}</v-tab>
          <v-tab value="monster">{{ $t('general.monster') }}</v-tab>
          <v-tab value="result">{{ $t('calculation.result') }}</v-tab>
        </v-tabs>
        <div class="d-flex flex-row align-center ml-auto">
          <v-btn v-on:click="calculate">
            {{ $t('general.calculate') }}
          </v-btn>
        </div>
      </div>
    </v-container>
    <v-container>
      <v-tabs-window class="window mx-auto" v-model="tab">
        <v-tabs-window-item value="resonator">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <RowResonator :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.weapon') }}</h2>
              </div>
              <RowWeapon :id="id" />
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="echo">
          <div class="d-flex flex-row w-100">
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="monster">
          <div class="d-flex flex-row w-100">
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="result">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <RowResonatorResult :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.result') }}</h2>
              </div>
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </Explorer>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>

<script lang="ts" setup>
import { ref } from 'vue'

import useRowResonatorStore from '@/stores/calculation/resonator';
import useRowWeaponStore from '@/stores/calculation/weapon';

const id = "simple"
const tab = ref<string>("")
const resonator = useRowResonatorStore(id)
const weapon = useRowWeaponStore(id)

async function calculate() {
  const skill = resonator.skill_item.value
  if (!skill) {
    tab.value = "resonator"
    return
  }

  tab.value = "result"
  resonator.updateSkill(skill)
  console.log(resonator)
  console.log(weapon)
}
</script>

<style scoped lang="sass">
.nav
  z-index: 999
  margin-top: 60px
  background: rgb(var(--v-theme-background))
  position: fixed
  left: 50%
  transform: translateX(-50%)
.window
  margin-top: 140px
  margin-bottom: 60px
</style>