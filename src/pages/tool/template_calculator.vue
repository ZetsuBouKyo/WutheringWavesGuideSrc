<template>
  <Explorer>
    <v-container class="base-nav nav d-flex flex-columnmx-auto pa-1">
      <div class="d-flex flex-row w-100">
        <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1" v-model="tab">
          <v-tab value="template">{{ $t('general.template') }}</v-tab>
          <template v-for="resonator in template.data.resonators">
            <v-tab v-if="resonator.resonator_name" :value="resonator.resonator_name">{{
              $t(resonator.resonator_name) }}</v-tab>
          </template>
          <v-tab value="damage_analysis">{{ $t('general.damage_analysis') }}</v-tab>
        </v-tabs>
      </div>
    </v-container>
    <v-container>
      <v-tabs-window class="window mx-auto" v-model="tab">
        <v-tabs-window-item value="template" :key="`${template.data.id}`">
          <v-container class="base-nav d-flex flex-columnmx-auto pa-1">
            <div class="d-flex flex-row w-100">
              <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1"
                v-model="templateTab">
                <v-tab value="basic_info">{{ $t('general.basic_info') }}</v-tab>
                <v-tab value="rotation">{{ $t('general.rotation') }}</v-tab>
              </v-tabs>
            </div>
          </v-container>
          <v-tabs-window class="mx-auto" v-model="templateTab">
            <v-tabs-window-item value="basic_info">
              <div class="sub-tab d-flex flex-column w-100">
                <TemplateBasicInfo :id="id" />
              </div>
            </v-tabs-window-item>
            <v-tabs-window-item value="rotation">
              <div class="sub-tab d-flex flex-column w-100">
                <TemplateRotation :id="id" />
              </div>
            </v-tabs-window-item>
          </v-tabs-window>
        </v-tabs-window-item>
        <template v-for="(resonator, i) in template.data.resonators"
          :key="`${template.data.id}-${i}-${resonator.resonator_name}`">
          <v-tabs-window-item v-if="resonator.resonator_name" :value="resonator.resonator_name">
            <v-container class="base-nav d-flex flex-columnmx-auto pa-1">
              <div class="d-flex flex-row w-100">
                <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1"
                  v-model="resonator.subTab">
                  <v-tab value="resonator">{{ $t('general.resonator') }}</v-tab>
                  <v-tab value="echo">{{ $t('general.echo') }}</v-tab>
                </v-tabs>
              </div>
            </v-container>
            <v-tabs-window class="mx-auto" v-model="resonator.subTab">
              <v-tabs-window-item value="resonator">
                <div class="sub-tab d-flex flex-column w-100">
                  <TemplateResonator :id="id" :i="i" />
                </div>
              </v-tabs-window-item>
              <v-tabs-window-item value="echo">
                <div class="sub-tab d-flex flex-row w-100">
                  <div class="d-flex flex-column w-100 mr-6">
                    <div class="d-flex flex-row mb-4">
                      <h2>{{ $t('general.auto_fill') }}</h2>
                    </div>
                    <TemplateAutoFillEcho :i="i" :id="id" />
                  </div>
                  <div class="d-flex flex-column w-100 mr-6">
                    <div class="d-flex flex-row mb-4">
                      <h2>{{ $t('general.manual_input') }}</h2>
                    </div>
                    <div v-for="j in 5" class="d-flex flex-column w-100">
                      <div class="d-flex flex-row mb-4">
                        <h3>{{ $t('general.nth_echo', { n: j }) }}</h3>
                      </div>
                      <TemplateEcho :i="i" :j="j - 1" :id="id" />
                    </div>
                  </div>
                </div>
              </v-tabs-window-item>
            </v-tabs-window>
          </v-tabs-window-item>
        </template>
        <v-tabs-window-item value="damage_analysis" :key="`${template.data.id}-damage-analysis`">
          <div class="tab d-flex flex-column w-100">
            <TemplateDamageAnalysis :id="id" />
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

import { useTemplateStore } from '@/stores/calculation/template';

import { useResonatorStore } from '@/stores/resonator';
import { useMonsterStore } from '@/stores/monster';
import { useTemplatesStore } from '@/stores/template'

import { DamageAnalysis } from '@/ww/damage';

const route = useRoute();
let id: any = route.query.id
if (!id) {
  id = "template"
}
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames(spoiler)

const templatesStore = useTemplatesStore()
const template = useTemplateStore(id)

const monsterStore = useMonsterStore()
const monsterItems = monsterStore.getMonsterItems()

const tab = ref<string>("")
const templateTab = ref<string>("basic_info")
const resonatorTab = ref<any>([{ tab: "", subTab: "resonator" }, { tab: "", subTab: "resonator" }, { tab: "", subTab: "resonator" }])

async function calculate() {
  const damageAnalysis = new DamageAnalysis()
  damageAnalysis.calculateByTemplate(template.data)
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