<template>
  <Explorer>
    <v-container class="nav d-flex flex-columnmx-auto pa-1">
      <div class="d-flex flex-row w-100">
        <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1" v-model="tab">
          <v-tab value="resonator">{{ $t('general.resonator') }}</v-tab>
          <v-tab value="echo">{{ $t('general.echo') }}</v-tab>
          <v-tab value="monster">{{ $t('general.monster') }}</v-tab>
          <v-tab value="buff">{{ $t('general.buff') }}</v-tab>
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
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <RowResonator :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.weapon') }}</h2>
              </div>
              <RowWeapon :id="id" />
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="echo">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.auto_fill') }}</h2>
              </div>
              <RowAutoFillEcho :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.manual_input') }}</h2>
              </div>
              <div v-for="(_, i) in echoes.data.echoes" class="d-flex flex-column w-100">
                <div class="d-flex flex-row mb-4">
                  <h3>{{ $t('general.nth_echo', { n: i + 1 }) }}</h3>
                </div>
                <RowEcho :i="i" :id="id" />
              </div>
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="monster">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.monster') }}</h2>
              </div>
              <RowMonster :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="buff">
          <div class="d-flex flex-row w-100">
            <!-- <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.quick_input') }}</h2>
              </div>
            </div> -->
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.manual_input') }}</h2>
              </div>
              <RowManualBuff :id="id" />
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="result">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-6">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <RowResonatorResult :id="id" />
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.weapon') }}</h2>
              </div>
              <RowWeaponResult :id="id" />
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.echo') }}</h2>
              </div>
              <RowEchoResult :id="id" />
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.monster') }}</h2>
              </div>
              <RowMonsterResult :id="id" />
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.buff') }}</h2>
              </div>
              <RowBuffResult :id="id" />
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-4">
                <h2>{{ $t('general.result') }}</h2>
              </div>
              <RowDetailedDamage v-if="calculation" :calculation="calculation" />
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

import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useRowEchoesStore } from '@/stores/calculation/echoes'
import { useRowBuffsStore } from '@/stores/calculation/buffs';
import { useRowMonsterStore } from '@/stores/calculation/monster';
import { useMonsterStore } from '@/stores/monster';

import { RowCalculation } from '@/ww/row';

const id = "simple"

const tab = ref<string>("")
const resonator = useRowResonatorStore(id)
const weapon = useRowWeaponStore(id)
const echoes = useRowEchoesStore(id)
const buffs = useRowBuffsStore(id)
const monster = useRowMonsterStore(id)
const calculation = ref<RowCalculation | undefined>(undefined)

const monsterStore = useMonsterStore()
const monsterItems = monsterStore.getMonsterItems()
monster.updateByMonsterItem(monsterItems[1].value)

async function calculate() {
  tab.value = "result"
  calculation.value = undefined
  await nextTick();
  calculation.value = new RowCalculation(resonator.data, weapon.data, echoes.data, buffs.data, monster.data)
  calculation.value.calculate()
}
</script>

<style scoped lang="sass">
.nav
  z-index: 999
  margin-top: 64px
  background: rgb(var(--v-theme-background))
  position: fixed
  left: 50%
  transform: translateX(-50%)
.window
  margin-top: 120px
  margin-bottom: 64px
</style>