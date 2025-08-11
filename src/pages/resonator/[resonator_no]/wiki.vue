<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
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
      </DocHeaders>
    </template>
    <template v-slot:right>
      <div class="d-flex flex-column w-100" v-if="resonatorInfo !== undefined">
        <div class="d-flex flex-row my-1">
          <h1>{{ $t(resonatorInfo.name) }}</h1>
        </div>
        <div class="d-flex flex-row my-1">
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
import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const resonatorStore = useResonatorStore()

const route = useRoute()
const resonatorNo = (route.params as { resonator_no: string }).resonator_no
// const resonatorName = resonatorStore.getNameByNo(resonatorNo)
const resonatorInfo = ref<undefined | ResonatorInfo>(undefined)

onMounted(async () => {
  resonatorInfo.value = await resonatorStore.getInfoByNo(resonatorNo)
})
</script>

<style scoped lang="sass">
.name
  max-width: 60px
</style>
