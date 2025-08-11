<template>
  <Doc v-if="resonatorInfo !== undefined">
    <template v-slot:left>
      <DocHeaders>
        <v-list-item :title="$t(resonatorInfo.name)" v-on:click="jumpToSection(goTo, '#resonator')"></v-list-item>
        <v-list-item :title="$t('resonator.header.materials')" v-on:click="jumpToSection(goTo, '#materials')">
        </v-list-item>
        <v-list-item :title="$t('resonator.header.skill')" v-on:click="jumpToSection(goTo, '#skill')"></v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#normal_attack')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.normal_attack') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#resonance_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.resonance_skill') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#forte_circuit')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.forte_circuit') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#resonance_liberation')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.resonance_liberation') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#intro_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.intro_skill') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, '#outro_skill')">
          <span class="ml-4 text-truncate">{{ $t('resonator.header.outro_skill') }}</span>
        </v-list-item>
        <v-list-item :title="$t('resonator.header.inherent_skill')" v-on:click="jumpToSection(goTo, '#inherent_skill')">
        </v-list-item>
        <v-list-item :title="$t('resonator.header.chain')" v-on:click="jumpToSection(goTo, '#chain')">
        </v-list-item>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <div class="d-flex flex-column w-100">
        <div class="d-flex flex-row my-1">
          <h1 id="resonator">{{ $t(resonatorInfo.name) }}</h1>
        </div>
        <div class="d-flex flex-row">
          <div class="d-flex w-33 mr-1">
            <img class="background w-100" :src="resonatorInfo.background" />
          </div>
          <div class="d-flex flex-column w-33 mr-1">
            <v-data-table :headers="[]" disable-sort hide-default-footer :items-per-page="2">
              <template v-slot:body>
                <tr>
                  <td>{{ $t('general.rarity') }}</td>
                  <td>{{ "★".repeat(resonatorInfo.rarity as number) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.element') }}</td>
                  <td :class="`text-${resonatorInfo.element_en} font-weight-bold`">{{ $t(resonatorInfo.element_zh_tw) }}
                  </td>
                </tr>
                <tr>
                  <td>{{ $t('general.weapon') }}</td>
                  <td>{{ $t(resonatorInfo.weapon_zh_tw) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.birth') }}</td>
                  <td>{{ $t(resonatorInfo.chara_info.birth) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.sex') }}</td>
                  <td>{{ $t(resonatorInfo.chara_info.sex) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.country') }}</td>
                  <td>{{ $t(resonatorInfo.chara_info.country) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.influence') }}</td>
                  <td>{{ $t(resonatorInfo.chara_info.influence) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.cvnamecn') }}</td>
                  <td>{{ $t(cleanCV(resonatorInfo.chara_info.cvnamecn)) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.cvnamejp') }}</td>
                  <td>{{ $t(cleanCV(resonatorInfo.chara_info.cvnamejp)) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.cvnameko') }}</td>
                  <td>{{ $t(cleanCV(resonatorInfo.chara_info.cvnameko)) }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.cvnameen') }}</td>
                  <td>{{ $t(cleanCV(resonatorInfo.chara_info.cvnameen)) }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
          <div class="d-flex flex-column w-33">
            <v-data-table :headers="[]" disable-sort hide-default-footer :items-per-page="2">
              <template v-slot:body>
                <tr>
                  <td>{{ $t('general.level') }}</td>
                  <td>{{ $t('general.hp') }}</td>
                  <td>{{ $t('general.atk') }}</td>
                  <td>{{ $t('general.def') }}</td>
                </tr>
                <tr v-for="attr in resonatorInfo.attrs">
                  <td>{{ attr.lv }}</td>
                  <td>{{ attr.hp }}</td>
                  <td>{{ attr.atk }}</td>
                  <td>{{ attr.def }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
        <div class="d-flex flex-row mt-16 mb-4">
          <h2 id="materials">{{ $t('resonator.header.materials') }}</h2>
        </div>
        <div v-for="key in ['levels', 'ascensions', 'skills']" class="d-flex flex-column">
          <div class="d-flex flex-row my-1">
            <h3>{{ $t(`resonator.header.upgrade.${key}`) }}</h3>
          </div>
          <v-sheet class=" d-flex flex-wrap justify-start">
            <v-card v-for="itemKey in Object.keys(resonatorInfo.consume[key as 'levels' | 'ascensions' | 'skills'])"
              class="ma-2 pa-2">
              <v-img width="100"
                :src="resonatorInfo.consume[key as 'levels' | 'ascensions' | 'skills'][itemKey].icon"></v-img>
              <v-row no-gutters align="center" justify="center">
                <div class="d-flex flex-column">
                  <span class="mr-2 text-truncate text-center">
                    {{ $t(resonatorInfo.consume[key as 'levels' | 'ascensions' | 'skills'][itemKey].name) }}
                  </span>
                  <span class="mr-2 text-truncate text-center">
                    {{ toNumberString(resonatorInfo.consume[key as 'levels' | 'ascensions' | 'skills'][itemKey].value,
                      0)
                    }}
                  </span>
                </div>
              </v-row>
            </v-card>
          </v-sheet>
        </div>
        <div class="d-flex flex-row mt-16 mb-4">
          <h2 id="skill">{{ $t('resonator.header.skill') }}</h2>
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="normal_attack">
            {{ $t('resonator.header.normal_attack') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="normal_attack" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="resonance_skill">
            {{ $t('resonator.header.resonance_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="resonance_skill" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="forte_circuit">
            {{ $t('resonator.header.forte_circuit') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="forte_circuit" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="resonance_liberation">
            {{ $t('resonator.header.resonance_liberation') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="resonance_liberation" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="intro_skill">
            {{ $t('resonator.header.intro_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="intro_skill" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="outro_skill">
            {{ $t('resonator.header.outro_skill') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="outro_skill" />
        </div>
        <!-- Inherent Skill -->
        <div class="d-flex flex-row mt-16 mb-4">
          <h2 id="inherent_skill">{{ $t('resonator.header.inherent_skill') }}</h2>
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="outro_skill">
            {{ $t('resonator.header.inherent_skill_1') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="inherent_skill_1" />
        </div>
        <div class="d-flex flex-column my-1">
          <h3 id="outro_skill">
            {{ $t('resonator.header.inherent_skill_2') }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" type="inherent_skill_2" />
        </div>
        <!-- Chain -->
        <div class="d-flex flex-row mt-16 mb-4">
          <h2 id="chain">{{ $t('resonator.header.chain') }}</h2>
        </div>
        <div v-for="i in 6" class="d-flex flex-column my-1">
          <h3 id="outro_skill">
            {{ $t('resonator.header.chain_nth', { n: i }) }}
          </h3>
          <ResonatorSkillData class="my-1" :info="resonatorInfo" :type="`chain${i}`" />
        </div>
      </div>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useGoTo } from 'vuetify'
import { useRoute } from 'vue-router'

import { useResonatorStore } from '@/stores/resonator'

import { ResonatorInfo } from "@/ww/resonator";
import { toNumberString, jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const resonatorStore = useResonatorStore()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
// const resonatorName = resonatorStore.getNameByNo(resonatorNo)
const resonatorInfo = ref<undefined | ResonatorInfo>(undefined)

function cleanCV(cv: string): string {
  return cv.replace("CV：", "")
}

onMounted(async () => {
  resonatorInfo.value = await resonatorStore.getInfoByNo(resonatorNo)
})
</script>

<style scoped lang="sass">
.name
  max-width: 60px
.background
  object-fit: cover
</style>
