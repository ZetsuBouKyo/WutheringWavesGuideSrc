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
          <v-file-input class="mr-2" max-width="100%" min-width="200" :label="$t('general.load_file')" accept=".json"
            @change="loadData" variant="outlined" density="compact" hide-details>
          </v-file-input>
          <v-btn class="mr-2" v-on:click="saveToJson">
            {{ $t('general.download_json') }}
          </v-btn>
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
import { saveJson } from '@/ww/utils';

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

function saveToJson() {
  const data = {
    resonator: resonator.getJson(),
    weapon: weapon.getJson(),
    echoes: echoes.getJson(),
    buffs: buffs.getJson(),
    monster: monster.getJson()
  }
  let fname = ""
  const name = resonator.data?.name
  const skill = resonator.data?.skill?.id
  if (name) {
    fname = name
  }
  if (skill) {
    fname = `${fname}-${skill}`
  }
  if (fname) {
    saveJson(data, fname)
  } else {
    saveJson(data)
  }
}

function loadData(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) {
    return [undefined, undefined];
  }
  const file = input.files[0];
  const reader = new FileReader();
  let data;
  reader.onload = (e) => {
    try {
      data = JSON.parse(e.target?.result as string);
      resonator.loadJson(data.resonator)
      weapon.loadJson(data.weapon)
      echoes.loadJson(data.echoes)
      buffs.loadJson(data.buffs)
      monster.loadJson(data.monster)
    } catch (error) {
      console.error("Invalid JSON file", error);
    }
  };
  reader.readAsText(file);
};

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