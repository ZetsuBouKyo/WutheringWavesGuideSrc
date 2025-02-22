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
            :rotation="damageAnalysis.resonator_template.getRotation()" :jump="'calculated_row'" />
        </div>
        <v-row class=" my-1">
          <h3 id="rotation_damage">
            {{ $t('template.damage_analysis.rotation_damage') }}
          </h3>
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
                      <span>
                        {{ $t('general.nth_row', { n: i + 1 }) }}
                      </span>
                    </div>
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
                    <div :id="`rotation_damage${i}`"
                      class="d-flex flex-column align-start bg-grey-darken-4 w-100 cursor-pointer" v-bind="props"
                      :key="`${i}${bar.data.skill_id}`" v-on:click="jumpToSection(goTo, `#calculated_row${i}`)">
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
        <div v-if="damageAnalysis.calculated_rows.length > 0" :key="damageAnalysis.calculated_rows.length"
          class="d-flex flex-column">
          <v-row class="my-1">
            <h3 id="detailed_damage" class="mb-2">
              {{ $t('template.damage_analysis.detailed_damage') }}
            </h3>
          </v-row>
          <div v-for="(calculatedRow, i) in damageAnalysis.calculated_rows" :id="`calculated_row${i}`"
            class="d-flex flex-column my-1">
            <v-row class="my-1 align-center">
              <img class="resonator-icon mr-4" :src="resonatorStore.getIconSrcByName(calculatedRow.resonator_name)" />
              <span class="mr-4">{{ $t(calculatedRow.resonator_name) }}</span>
              <span>{{ $t("general.nth_row", { n: i + 1 }) }}</span>
              <div class="d-flex flex-row ml-auto mr-2">
                <v-btn v-if="rotationIndices.includes(i.toString())" class="mr-2"
                  v-on:click="jumpToSection(goTo, `#rotation${i}`)">
                  {{ $t('general.back_to', { to: $t('general.rotation') }) }}
                </v-btn>
                <v-btn v-on:click="jumpToSection(goTo, `#rotation_damage${i}`)">
                  {{ $t('general.back_to', { to: $t('template.damage_analysis.rotation_damage') }) }}
                </v-btn>
              </div>
            </v-row>
            <v-row class="my-1">
              <h4>{{ $t("general.skill") }}</h4>
            </v-row>
            <v-data-table class="table ma-1" :items="calculatedRowToSkillTable(calculatedRow)" disable-sort
              hide-default-footer :items-per-page="2">
            </v-data-table>
            <div v-if="calculatedRow.damage" class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.damage") }}</h4>
              </v-row>
              <v-data-table class="table ma-1" :items="calculatedRowToDamageTable(calculatedRow)" disable-sort
                hide-default-footer :items-per-page="2">
              </v-data-table>
            </div>
            <div v-if="calculatedRow.buffs.length > 0" class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.buff") }}</h4>
              </v-row>
              <v-data-table class="table ma-1" :items="calculatedRowToBuffTable(calculatedRow)" disable-sort
                hide-default-footer :items-per-page="22">
              </v-data-table>
            </div>
            <div v-if="calculatedRow.damage" class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.calculation") }}</h4>
              </v-row>
              <v-data-table class="table ma-1" disable-sort hide-default-footer :items-per-page="8">
                <tbody>
                  <tr>
                    <td>{{ $t("calculation.region.attr") }}</td>
                    <td>{{ getAttrRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.skill_dmg") }}</td>
                    <td>{{ getSkillDmgRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.magnifier") }}</td>
                    <td>{{ getMagnifierRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.amplifier") }}</td>
                    <td>{{ getAmplifierRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.bonus") }}</td>
                    <td>{{ getBonusRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.crit") }}</td>
                    <td>{{ getCritRegion(calculatedRow) }}</td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.def") }}</td>
                    <td> ×
                      <div class="frac">
                        <span>
                          (800 + 8 × {{ calculatedRow.resonator_level }})
                        </span>
                        <span class="symbol">/</span>
                        <span class="bottom">
                          (<span>
                            800 + 8 × {{ calculatedRow.resonator_level }} +
                          </span>
                          <span v-if="getIgnoreDefRegion(calculatedRow)">
                            (792 + (8 × {{ calculatedRow.monster_level }})) {{ getIgnoreDefRegion(calculatedRow) }}
                          </span>
                          <span v-else>
                            (792 + (8 × {{ calculatedRow.monster_level }}))
                          </span>)
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>{{ $t("calculation.region.res") }}</td>
                    <td>{{ getResRegion(calculatedRow) }}</td>
                  </tr>
                </tbody>
              </v-data-table>
            </div>
          </div>
        </div>
      </v-container>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useGoTo } from 'vuetify'
import { useI18n } from 'vue-i18n'

import { BuffTypeEnum } from '@/interfaces/buff'
import { SkillAttrEnum } from '@/interfaces/skill'

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
const rotationIndices = ref<any>([])

async function init() {
  if (!hashedTemplateId || !affixPolicy) {
    return
  }
  await calculatedTemplateStore.init()

  templateId.value = calculatedTemplateStore.getTemplateIdByHashedTemplateId(hashedTemplateId)

  damageAnalysis.value = await damageAnalysisStore.getDamageAnalysisByHashedTemplateId(hashedTemplateId, affixPolicy)
  rotationIndices.value = damageAnalysis.value.resonator_template.getRotationIndices()
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

function calculatedRowToSkillTable(calculatedRow: any): Array<any> {
  return [
    {
      [t('general.action')]: calculatedRow.action,
      [t('general.resonator_skill_id')]: calculatedRow.skill_id,
      [t('general.skill_base_attr')]: calculatedRow.result_skill_base_attribute,
      [t('general.skill_bonus_type')]: calculatedRow.resonator_skill_type_bonus,
      [t('general.hits')]: t('general.n_hits', { n: calculatedRow.hits })
    }
  ]
}

function calculatedRowToDamageTable(calculatedRow: any): Array<any> {
  return [
    {
      [t('general.real_damage')]: toNumberString(parseFloat(calculatedRow.real_dmg_no_crit)),
      [t('general.calculated_damage')]: toNumberString(parseFloat(calculatedRow.damage_no_crit)),
      [t('general.real_crit_damage')]: toNumberString(parseFloat(calculatedRow.real_dmg_crit)),
      [t('general.calculated_crit_damage')]: toNumberString(parseFloat(calculatedRow.damage_crit)),
    }
  ]
}

function calculatedRowToBuffTable(calculatedRow: any): Array<any> {
  const buffs = calculatedRow.buffs
  const table: Array<any> = []
  buffs.forEach((buff: any) => {
    const b: any = {
      [t('general.name')]: buff.name,
      [t('general.buff_type')]: buff.type,
      [t('general.stack')]: buff.stack,
      [t('general.value')]: buff.value,
    }
    table.push(b)
  })
  return table
}

function getAttrRegion(calculatedRow: any): string {
  const skillBaseAttribute = calculatedRow.result_skill_base_attribute
  let s: string = ""
  let baseAttrP: string = ""
  let baseAttrA: string = ""
  switch (skillBaseAttribute) {
    case SkillAttrEnum.HP:
      s = calculatedRow.result_hp
      baseAttrP = calculatedRow.result_hp_p
      baseAttrA = calculatedRow.result_hp_addition
      break;
    case SkillAttrEnum.DEF:
      s = calculatedRow.result_def
      baseAttrP = calculatedRow.result_def_p
      baseAttrA = calculatedRow.result_def_addition
      break;
    case SkillAttrEnum.ATK:
    default:
      s = calculatedRow.result_atk
      baseAttrP = calculatedRow.result_atk_p
      baseAttrA = calculatedRow.result_atk_addition
  }

  const p = parseFloat(baseAttrP)
  const a = parseFloat(baseAttrA)

  if (baseAttrP) {
    if (p !== 0) {
      const pString = p.toString()
      s = `${s} × (1 + ${pString})`
    }
  }
  if (baseAttrA) {
    if (a !== 0) {
      const aString = a.toString()
      s = `${s} + ${aString}`
    }
  }
  if (!baseAttrP && !baseAttrA) {
    return s
  }
  return `(${s})`
}

function getSkillDmgRegion(calculatedRow: any): string {
  let s = parseFloat(calculatedRow.resonator_skill_dmg).toString()
  const buffs = calculatedRow.buffs
  let isBuffs = false
  buffs.forEach((buff: any) => {
    if (buff.type === BuffTypeEnum.SKILL_DMG_ADDITION) {
      isBuffs = true
      const a = parseFloat(buff.value)
      const stack = parseFloat(buff.stack)
      s = `${s} + ${a} × ${stack}`
    }
  })
  if (isBuffs) {
    s = `(${s})`
  }
  s = `× ${s}`
  return s
}

function getMagnifierRegion(calculatedRow: any): string {
  const resultMagnifier = parseFloat(calculatedRow.result_magnifier)
  let s = "1"
  if (resultMagnifier) {
    const m = resultMagnifier.toString()
    s = `(${s} + ${m})`
  }
  s = `× ${s}`
  return s
}

function getAmplifierRegion(calculatedRow: any): string {
  const resultAmplifier = parseFloat(calculatedRow.result_amplifier)
  let s = "1"
  if (resultAmplifier) {
    const a = resultAmplifier.toString()
    s = `(${s} + ${a})`
  }
  s = `× ${s}`
  return s
}

function getBonusRegion(calculatedRow: any): string {
  const resultBonus = parseFloat(calculatedRow.result_bonus)
  let s = "1"
  if (resultBonus) {
    const b = resultBonus.toString()
    s = `(${s} + ${b})`
  }
  s = `× ${s}`
  return s
}

function getCritRegion(calculatedRow: any): string {
  const critDmg = parseFloat(calculatedRow.result_crit_dmg)
  let s = "1.5" // TODO:
  if (critDmg) {
    const a = critDmg.toString()
    s = a
  }
  s = `× ${s}`
  return s
}

function getIgnoreDefRegion(calculatedRow: any): string {
  const ignoreDef = parseFloat(calculatedRow.result_ignore_def)
  let s = "" // TODO:
  if (ignoreDef) {
    const i = ignoreDef.toString()
    s = `× (1 - ${i})`
  }
  return s
}

function getResRegion(calculatedRow: any): string {
  const resultRes = parseFloat(calculatedRow.result_reduce_res)
  const monsterRes = parseFloat(calculatedRow.monster_res).toString()
  let s = `1 - ${monsterRes}`
  if (resultRes) {
    const r = resultRes.toString()
    s = `(${s} + ${r})`
  }
  s = `× (${s})`
  return s
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
.table
  display: block
  overflow-x: auto
  white-space: nowrap
.frac
  display: inline-block
  position: relative
  vertical-align: middle
  letter-spacing: 0.001em
  text-align: center
.frac > span
  display: block
  padding: 0.1em
.frac span.bottom
  border-top: thin solid rgb(240, 240, 240)
.frac span.symbol
  display: none
</style>
