<template>
  <Doc>
    <template v-slot:left>
      <DocHeaders>
        <v-list-item :title="$t('template.damage_analysis.team_damage_distribution')"
          v-on:click="jumpToSection(goTo, '#team_damage_distribution')"></v-list-item>
        <v-list-item :title="$t('template.damage_analysis.buff_damage_distribution')"
          v-on:click="jumpToSection(goTo, '#buff_damage_distribution')"></v-list-item>
        <v-list-item :title="$t('general.resonator')" v-on:click="jumpToSection(goTo, '#resonator')"></v-list-item>
        <!-- Resonators -->
        <div v-for="(resonatorName, i) in resonatorNames" class="d-flex flex-column">
          <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}`)">
            <span class="ml-4 text-truncate">{{ $t(resonatorName) }}</span>
          </v-list-item>
          <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_damage_distribution`)">
            <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_damage_distribution') }}</span>
          </v-list-item>
          <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_type_damage_distribution`)">
            <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_type_damage_distribution') }}</span>
          </v-list-item>
          <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_bonus_damage_distribution`)">
            <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_bonus_damage_distribution') }}</span>
          </v-list-item>
        </div>
        <v-list-item :title="$t('general.rotation')" v-on:click="jumpToSection(goTo, '#rotation')"></v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, `#rotation_damage`)">
          <span class="ml-4 text-truncate">{{ $t('template.damage_analysis.rotation_damage') }}</span>
        </v-list-item>
        <v-list-item v-on:click="jumpToSection(goTo, `#detailed_damage`)">
          <span class="ml-4 text-truncate">{{ $t('template.damage_analysis.detailed_damage') }}</span>
        </v-list-item>
      </DocHeaders>
    </template>
    <template v-slot:right>
      <v-container v-if="damageAnalysis">
        <v-row class="mt-1 mb-2">
          <h1>{{ title }}</h1>
        </v-row>
        <!-- Team damage distribution -->
        <v-row class="my-1">
          <h2 id="team_damage_distribution">{{ $t('template.damage_analysis.team_damage_distribution') }}</h2>
        </v-row>
        <div class="d-flex flex-column my-1 mb-4">
          <v-container class="bg-blue-grey-darken-4 mx-1">
            <div class="d-flex flex-column bg-blue-grey-darken-4">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ $t(damageAnalysis.resonator_template.monster_id) }}
                </span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.team_dps') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ damageAnalysis.damage_distribution.getTeamDPSString() }}
                </span>
              </v-row>
              <div class="d-flex flex-row align-center ma-1" v-for=" resonatorName in resonatorNames">
                <img class="resonator-icon mr-2" :src="resonatorStore.getIconSrcByName(resonatorName)" />
                <v-tooltip location="bottom">
                  <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                      <span>{{ $t(resonatorName) }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">{{ $t('general.damage') }}: </span>
                      <span>{{ damageAnalysis.damage_distribution.getResonatorDamageString(resonatorName) }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">{{ $t('general.dps') }}: </span>
                      <span>{{ damageAnalysis.damage_distribution.getResonatorDPSString(resonatorName) }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}: </span>
                      <span>{{ $t('general.team_dps') }})</span>
                    </div>
                  </div>
                  <template v-slot:activator="{ props }">
                    <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props">
                      <div v-if="damageAnalysis.damage_distribution.getResonatorMaxDPSPercentage(resonatorName) > 0.5"
                        :class="`barh d-flex flex-row-reverse align-center bg-${resonatorNameToElementEn[resonatorName]}`"
                        :style="`width: ${damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName)};`">
                        <span class="mr-4 text-truncate">
                          DPS: {{ damageAnalysis.damage_distribution.getResonatorDPSString(resonatorName) }}
                          ({{ damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName) }})
                        </span>
                      </div>
                      <div v-else class="d-flex flex-row align-center w-100">
                        <div :class="`barh d-flex bg-${resonatorNameToElementEn[resonatorName]}`"
                          :style="`width: ${damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName)};`">
                        </div>
                        <span class="ml-4 text-truncate">
                          DPS: {{ damageAnalysis.damage_distribution.getResonatorDPSString(resonatorName) }}
                          ({{ damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName) }})
                        </span>
                      </div>
                    </div>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-container>
        </div>
        <!-- Buff damage distribution -->
        <v-row class="my-1">
          <h2 id="buff_damage_distribution">{{ $t('template.damage_analysis.buff_damage_distribution') }}</h2>
        </v-row>
        <div class="d-flex flex-column my-1 mb-4">
          <v-container class="bg-blue-grey-darken-4 mx-1">
            <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ $t(damageAnalysis.resonator_template.monster_id) }}
                </span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.team_dps') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ damageAnalysis.damage_distribution.getTeamDPSString() }}
                </span>
              </v-row>
              <div class="d-flex flex-row align-center ma-1" v-for="bar in bars">
                <v-tooltip location="bottom">
                  <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">{{ $t('general.damage') }}: </span>
                      <span>{{ bar.damageString }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">{{ $t('general.dps') }}: </span>
                      <span>{{ bar.dpsString }}</span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}: </span>
                      <span>{{ $t('general.team_dps') }})</span>
                    </div>
                  </div>
                  <template v-slot:activator="{ props }">
                    <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props">
                      <div v-if="bar.percentage > 0.5" :class="`barh d-flex flex-row-reverse align-center bg-white`"
                        :style="`width: ${bar.percentageString};`">
                        <span class="mr-4 text-truncate">
                          {{ bar.text }}
                          ({{ bar.percentageString }})
                        </span>
                      </div>
                      <div v-else class="d-flex flex-row align-center w-100">
                        <div :class="`barh d-flex bg-white`" :style="`width: ${bar.percentageString};`">
                        </div>
                        <span class="ml-4 text-truncate">
                          {{ bar.text }}
                          ({{ bar.percentageString }})
                        </span>
                      </div>
                    </div>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-container>
        </div>
        <!-- Resonators -->
        <v-row class="my-1">
          <h2 id="resonator">{{ $t('general.resonator') }}</h2>
        </v-row>
        <div v-for="(resonatorName, i) in resonatorNames" class="d-flex flex-column">
          <v-row class="my-1">
            <h3 :id="`resonator${i}`">{{ $t(resonatorName) }}</h3>
          </v-row>
          <ResonatorInfo class="my-1" :resonator="resonatorInfos[i]" />
          <!-- Skill -->
          <v-row class=" my-1">
            <h4 :id="`resonator${i}_skill_damage_distribution`">{{
              $t('template.damage_analysis.skill_damage_distribution') }}</h4>
          </v-row>
          <div class="d-flex flex-column my-1 mb-4 w-100">
            <v-container class="bg-blue-grey-darken-4 mx-1">
              <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ $t(damageAnalysis.resonator_template.monster_id) }}
                  </span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.resonator_dps') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ damageAnalysis.damage_distribution.getResonatorDPSString(resonatorName) }}
                  </span>
                </v-row>
                <div class="d-flex flex-row align-center ma-1"
                  v-for="bar in damageAnalysis.damage_distribution.getResonatorSkillBars(resonatorName)">
                  <v-tooltip location="bottom">
                    <div class="d-flex flex-column">
                      <div class="d-flex flex-row">
                        <span>{{ bar.data.type }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">{{ $t('general.damage') }}: </span>
                        <span>{{ bar.damageString }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">{{ $t('general.dps') }}: </span>
                        <span>{{ bar.dpsString }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}: </span>
                        <span>{{ $t(resonatorName) }} {{ $t('general.dps') }})</span>
                      </div>
                    </div>
                    <template v-slot:activator="{ props }">
                      <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props">
                        <div v-if="bar.percentage > 0.5" :class="`barh d-flex flex-row-reverse align-center bg-white`"
                          :style="`width: ${bar.percentageString};`">
                          <span class="mr-4 text-truncate">
                            {{ bar.text }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                        <div v-else class="d-flex flex-row align-center w-100">
                          <div :class="`barh d-flex bg-white`" :style="`width: ${bar.percentageString};`">
                          </div>
                          <span class="ml-4 text-truncate">
                            {{ bar.text }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                      </div>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-container>
          </div>
          <!-- Skill type -->
          <v-row class="my-1">
            <h4 :id="`resonator${i}_skill_type_damage_distribution`">{{
              $t('template.damage_analysis.skill_type_damage_distribution') }}</h4>
          </v-row>
          <div class="d-flex flex-column my-1 mb-4 w-100">
            <v-container class="bg-blue-grey-darken-4 mx-1">
              <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ $t(damageAnalysis.resonator_template.monster_id) }}
                  </span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.resonator_damage') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ damageAnalysis.damage_distribution.getResonatorDamageString(resonatorName) }}
                  </span>
                </v-row>
                <div class="d-flex flex-row align-center ma-1"
                  v-for="bar in damageAnalysis.damage_distribution.getResonatorSkillTypeBars(resonatorName)">
                  <v-tooltip location="bottom">
                    <div class="d-flex flex-column">
                      <div class="d-flex flex-row">
                        <span>{{ $t(`general.resonator_skills.${bar.text}`) }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">{{ $t('general.damage') }}: </span>
                        <span>{{ bar.damageString }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}: </span>
                        <span>{{ $t(resonatorName) }} {{ $t('general.damage') }})</span>
                      </div>
                    </div>
                    <template v-slot:activator="{ props }">
                      <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props">
                        <div v-if="bar.percentage > 0.5" :class="`barh d-flex flex-row-reverse align-center bg-white`"
                          :style="`width: ${bar.percentageString};`">
                          <span class="mr-4 text-truncate">
                            {{ $t(`general.resonator_skills.${bar.text}`) }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                        <div v-else class="d-flex flex-row align-center w-100">
                          <div :class="`barh d-flex bg-white`" :style="`width: ${bar.percentageString};`">
                          </div>
                          <span class="ml-4 text-truncate">
                            {{ $t(`general.resonator_skills.${bar.text}`) }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                      </div>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-container>
          </div>
          <!-- Skill Bonus -->
          <v-row class="my-1">
            <h4 :id="`resonator${i}_skill_bonus_damage_distribution`">{{
              $t('template.damage_analysis.skill_bonus_damage_distribution') }}</h4>
          </v-row>
          <div class="d-flex flex-column my-1 mb-4 w-100">
            <v-container class="bg-blue-grey-darken-4 mx-1">
              <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ $t(damageAnalysis.resonator_template.monster_id) }}
                  </span>
                </v-row>
                <v-row class="ma-1 text-truncate">
                  <span class="team-damage-distribution-header">{{ $t('general.resonator_damage') }}: </span>
                  <span class="team-damage-distribution-header-value text-truncate">
                    {{ damageAnalysis.damage_distribution.getResonatorDamageString(resonatorName) }}
                  </span>
                </v-row>
                <div class="d-flex flex-row align-center ma-1"
                  v-for="bar in damageAnalysis.damage_distribution.getResonatorSkillBonusBars(resonatorName)">
                  <v-tooltip location="bottom">
                    <div class="d-flex flex-column">
                      <div class="d-flex flex-row">
                        <span>{{ $t(`general.resonator_bonus.${bar.text}`) }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">{{ $t('general.damage') }}: </span>
                        <span>{{ bar.damageString }}</span>
                      </div>
                      <div class="d-flex flex-row">
                        <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}: </span>
                        <span>{{ $t(resonatorName) }} {{ $t('general.damage') }})</span>
                      </div>
                    </div>
                    <template v-slot:activator="{ props }">
                      <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props">
                        <div v-if="bar.percentage > 0.5" :class="`barh d-flex flex-row-reverse align-center bg-white`"
                          :style="`width: ${bar.percentageString};`">
                          <span class="mr-4 text-truncate">
                            {{ $t(`general.resonator_bonus.${bar.text}`) }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                        <div v-else class="d-flex flex-row align-center w-100">
                          <div :class="`barh d-flex bg-white`" :style="`width: ${bar.percentageString};`">
                          </div>
                          <span class="ml-4 text-truncate">
                            {{ $t(`general.resonator_bonus.${bar.text}`) }}
                            ({{ bar.percentageString }})
                          </span>
                        </div>
                      </div>
                    </template>
                  </v-tooltip>
                </div>
              </div>
            </v-container>
          </div>
        </div>
        <v-row class="my-1">
          <h2 id="rotation">{{ $t('general.rotation') }}</h2>
        </v-row>
        <div class="d-flex flex-column my-1 mb-4 w-100">
          <Rotation v-if="damageAnalysis.resonator_template" class="my-1"
            :rotation="damageAnalysis.resonator_template.getRotation()" />
        </div>
        <v-row class=" my-1">
          <h3 id="rotation_damage">{{
            $t('template.damage_analysis.rotation_damage') }}</h3>
        </v-row>
        <div v-if="damageAnalysis.calculated_rows.length > 0" class="d-flex flex-column my-1 mb-4 w-100"
          :key="damageAnalysis.calculated_rows.length">
          <v-container class="bg-blue-grey-darken-4 mx-1">
            <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{ $t(templateId) }}</span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.monster_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ $t(damageAnalysis.resonator_template.monster_id) }}
                </span>
              </v-row>
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.team_dps') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">
                  {{ damageAnalysis.damage_distribution.getMaxTeamDPSString() }}
                </span>
              </v-row>
              <div class="d-flex flex-row align-center ma-1" v-for="(bar, i) in damageAnalysis.getCalculatedRowBars()"
                :key="`${i}${bar.data.skill_id}`">
                <img class="resonator-icon mr-2" :src="resonatorStore.getIconSrcByName(bar.data.resonator_name)" />
                <v-tooltip width="400" location="bottom">
                  <div class="d-flex flex-column">
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">{{ $t('general.resonator') }}: </span>
                      <span>
                        {{ $t(bar.data.resonator_name) }}
                      </span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">{{ $t('general.resonator_skill_id') }}:
                      </span>
                      <span class="text-truncate">
                        {{ $t(bar.data.skill_id) }}
                      </span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">{{ $t('general.damage') }}:
                      </span>
                      <span>
                        {{ toNumberString(bar.damage) }}
                      </span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">{{ $t('general.time_start') }}:
                      </span>
                      <span>
                        {{ $t(bar.data.time_start) }}
                      </span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">{{ $t('general.time_end') }}:
                      </span>
                      <span>
                        {{ $t(bar.data.time_end) }}
                      </span>
                    </div>
                    <div class="d-flex flex-row">
                      <span class="tooltip-header">({{ $t('general.denominator') }}: </span>
                      <span>{{ $t('general.damage') }} {{ toNumberString(bar.data.baseDamage) }})</span>
                    </div>
                  </div>
                  <template v-slot:activator="{ props }">
                    <div class="d-flex flex-column align-start bg-grey-darken-4 w-100" v-bind="props"
                      :key="`${i}${bar.data.skill_id}`">
                      <div v-if="bar.percentage > 0.5"
                        :class="`barh d-flex flex-row-reverse align-center bg-${bar.data.color}`"
                        :style="`width: ${bar.percentageString};`">
                        <span class="mr-4 text-truncate">
                          {{ $t(bar.text) }}
                          ({{ bar.percentageString }})
                        </span>
                      </div>
                      <div v-else class="d-flex flex-row align-center w-100">
                        <div :class="`barh d-flex bg-${bar.data.color}`" :style="`width: ${bar.percentageString};`">
                        </div>
                        <span class="ml-4 text-truncate">
                          {{ $t(bar.text) }}
                          ({{ bar.percentageString }})
                        </span>
                      </div>
                    </div>
                  </template>
                </v-tooltip>
              </div>
            </div>
          </v-container>
        </div>
        <v-row class=" my-1">
          <h3 id="detailed_damage">{{
            $t('template.damage_analysis.detailed_damage') }}</h3>
        </v-row>
      </v-container>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useGoTo } from 'vuetify'
import { useI18n } from 'vue-i18n'

import { useCalculatedTemplateStore } from '@/stores/calculateTemplate'
import { useDamageAnalysisStore } from '@/stores/damageAnalysis'
import { useResonatorStore } from '@/stores/resonator'

import { jumpToSection, toNumberString } from "@/ww/utils"

const goTo = useGoTo()

const { t } = useI18n()

const route = useRoute()
const hashedTemplateId = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy

const calculatedTemplateStore = useCalculatedTemplateStore()
const damageAnalysisStore = useDamageAnalysisStore()
const resonatorStore = useResonatorStore()

const templateId = ref<string>("")
const title = ref<string>("")
const resonatorNames = reactive<Array<string>>([])
const resonatorNameToElementEn = reactive<{ [name: string]: string }>({})
const resonatorInfos = reactive<Array<any>>([])
const damageAnalysis = ref<any>(undefined)
const bars = ref<Array<any>>([])

async function init() {
  if (!hashedTemplateId || !affixPolicy) {
    return
  }
  await calculatedTemplateStore.init()

  templateId.value = calculatedTemplateStore.getTemplateIdByHashedTemplateId(hashedTemplateId)

  damageAnalysis.value = await damageAnalysisStore.getDamageAnalysisByHashedTemplateId(hashedTemplateId, affixPolicy)
  const baseTeamDamage = parseFloat(damageAnalysis.value.damage_distribution.damage)
  const baseTeamDPS = parseFloat(damageAnalysis.value.damage_distribution.getMaxTeamDPS())
  bars.value = damageAnalysis.value.damage_distributions_with_buffs.getBars(baseTeamDamage, baseTeamDPS)

  const resonatorNamesForTitle: Array<string> = []
  Object.keys(damageAnalysis.value.resonator_models).forEach((resonatorID) => {
    const resonatorInfo = damageAnalysis.value.resonator_models[resonatorID]
    const resonatorName = resonatorInfo.name
    const resonatorEcho1 = damageAnalysis.value.resonator_template.getResonatorEcho1(resonatorName)
    resonatorInfo.echo1 = resonatorEcho1
    resonatorInfos.push(resonatorInfo)

    resonatorNames.push(resonatorName)
    resonatorNamesForTitle.push(t(resonatorName))
  })
  resonatorNames.forEach(async (name: string) => {
    const elementEn = await resonatorStore.getElementEnByName(name)
    resonatorNameToElementEn[name] = elementEn
  })

  const titlePrefix = resonatorNamesForTitle.join(" | ")
  const affixPolicyForTitle = t(`general.${affixPolicy}`)
  title.value = `${titlePrefix} — ${affixPolicyForTitle}`
}

onMounted(async () => {
  await init()
})

watch(() => { return hashedTemplateId }, async () => {
  await init()
})
</script>

<style scoped lang="sass">
.team-damage-distribution-header
  width: 100px
.team-damage-distribution-header-value
  width: calc(100% - 100px)
.team-damage-distribution-tooltip-header
  width: 40px
.resonator-icon
  height: 40px
  width: 40px
.tooltip-header
  width: 60px
.barh
  height: 40px
</style>
