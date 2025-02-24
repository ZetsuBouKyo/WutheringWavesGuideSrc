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
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.auto_fill') }}</h2>
              </div>
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.manual_input') }}</h2>
              </div>
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.echo') }} 1</h3>
              </div>
              <RowEcho :id="echoId1" />
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.echo') }} 2</h3>
              </div>
              <RowEcho :id="echoId2" />
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.echo') }} 3</h3>
              </div>
              <RowEcho :id="echoId3" />
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.echo') }} 4</h3>
              </div>
              <RowEcho :id="echoId4" />
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.echo') }} 5</h3>
              </div>
              <RowEcho :id="echoId5" />
            </div>
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
import useRowEchoStore from '@/stores/calculation/echo'

const id = "simple"
const echoId1 = `${id}1`
const echoId2 = `${id}2`
const echoId3 = `${id}3`
const echoId4 = `${id}4`
const echoId5 = `${id}5`
const echoStore1 = useRowEchoStore(echoId1)
const echoStore2 = useRowEchoStore(echoId2)
const echoStore3 = useRowEchoStore(echoId3)
const echoStore4 = useRowEchoStore(echoId4)
const echoStore5 = useRowEchoStore(echoId5)

const tab = ref<string>("")
const resonator = useRowResonatorStore(id)
const weapon = useRowWeaponStore(id)

async function calculate() {
  const skill = resonator._skill_item.value
  if (!skill) {
    tab.value = "resonator"
    return
  }

  tab.value = "result"
  resonator.updateSkill(skill)
  console.log(resonator)
  console.log(weapon)
  console.log(echoStore1)
  console.log(echoStore2)
  console.log(echoStore3)
  console.log(echoStore4)
  console.log(echoStore5)
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