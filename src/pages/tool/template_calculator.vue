<template>
  <Explorer>
    <v-container class="base-nav nav d-flex flex-columnmx-auto pa-1">
      <div class="d-flex flex-row w-100">
        <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1" v-model="tab">
          <v-tab value="basic_info">{{ $t('general.basic_info') }}</v-tab>
          <v-tab v-if="resonatorTab[0].tab" :value="resonatorTab[0].tab">{{ $t(resonatorTab[0].tab) }}</v-tab>
          <v-tab value="rotation">{{ $t('general.rotation') }}</v-tab>
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
        <v-tabs-window-item value="basic_info">
          <div class="d-flex flex-row w-100 tab">
            基本資料，施工中
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item v-if="resonatorTab[0].tab" :value="resonatorTab[0].tab">
          <v-container class="base-nav d-flex flex-columnmx-auto pa-1">
            <div class="d-flex flex-row w-100">
              <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1"
                v-model="resonatorTab[0].subTab">
                <v-tab value="resonator">{{ $t('general.resonator') }}</v-tab>
                <v-tab value="echo">{{ $t('general.echo') }}</v-tab>
              </v-tabs>
            </div>
          </v-container>
          <v-tabs-window class="mx-auto" v-model="resonatorTab[0].subTab">
            <v-tabs-window-item value="resonator">
              <div class="d-flex flex-row w-100 sub-tab">
                共鳴者，施工中
              </div>
            </v-tabs-window-item>
            <v-tabs-window-item value="echo">
              <div class="d-flex flex-row w-100 sub-tab">
                聲骸，施工中
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-tabs-window-item>
        <v-tabs-window-item value="rotation">
          <div class="d-flex flex-row w-100 tab">
            輸出手法，施工中
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="result">
          <div class="d-flex flex-row w-100 tab">
            結果，施工中
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

const tab = ref<string>("")
const resonatorTab = ref<any>([{ tab: "", subTab: "resonator" }, { tab: "", subTab: "resonator" }, { tab: "", subTab: "resonator" }])

async function calculate() {
  tab.value = "result"
  resonatorTab.value[0].tab = "漂泊者·衍射(男)"
}
</script>

<style scoped lang="sass">
.base-nav
  z-index: 999
  background: rgb(var(--v-theme-background))
  position: fixed
  left: 50%
  transform: translateX(-50%)
.nav
  margin-top: 64px
.sub-nav
  margin-top: 100px
.window
  margin-top: 100px
  margin-bottom: 64px
.tab
  margin-top: 20px
.sub-tab
  margin-top: 72px
</style>