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
        <div class="d-flex flex-row align-center ml-auto">
          <v-file-input class="mr-2" max-width="100%" min-width="200" :label="$t('general.load_file')" accept=".json"
            @change="loadData" variant="outlined" density="compact" hide-details>
          </v-file-input>
          <v-btn class="mr-2" v-on:click="saveToJson">
            {{ $t('general.download_json') }}
          </v-btn>
        </div>
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

import { Template } from '@/ww/template';
import { saveJson } from '@/ww/utils';

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

const template = useTemplateStore(id)

const tab = ref<string>("")
const templateTab = ref<string>("basic_info")


function saveToJson() {
  const data = {
    template: template.data.getJson()
  }
  let fname = template.data.id
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
      template.data = new Template(data.template)
    } catch (error) {
      console.error("Invalid JSON file", error);
    }
  };
  reader.readAsText(file);
};
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