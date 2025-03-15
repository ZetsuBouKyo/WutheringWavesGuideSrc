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
        <div v-for="(resonatorName, i) in damageAnalysis.resonator_template.getResonatorNames()"
          class="d-flex flex-column">
          <template v-if="resonatorName">
            <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}`)">
              <span class="ml-4 text-truncate">{{ $t(resonatorName) }}</span>
            </v-list-item>
            <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_damage_distribution`)">
              <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_damage_distribution') }}</span>
            </v-list-item>
            <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_type_damage_distribution`)">
              <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_type_damage_distribution')
                }}</span>
            </v-list-item>
            <v-list-item v-on:click="jumpToSection(goTo, `#resonator${i}_skill_bonus_damage_distribution`)">
              <span class="ml-8 text-truncate">{{ $t('template.damage_analysis.skill_bonus_damage_distribution')
                }}</span>
            </v-list-item>
          </template>
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
          <v-container class="bg-blue-grey-darken-4">
            <div class="d-flex flex-column bg-blue-grey-darken-4">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{
                  $t(damageAnalysis.resonator_template.id) }}</span>
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
              <template v-for=" resonatorName in damageAnalysis.resonator_template.getResonatorNames()">
                <div v-if="resonatorName" class="d-flex flex-row align-center ma-1">
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
                          :class="`barh d-flex flex-row-reverse align-center bg-${damageAnalysis.resonator_template.getResonatorElementEn(resonatorName)}`"
                          :style="`width: ${damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName)};`">
                          <span class="mr-4 text-truncate">
                            DPS: {{ damageAnalysis.damage_distribution.getResonatorDPSString(resonatorName) }}
                            ({{ damageAnalysis.damage_distribution.getResonatorMaxDPSPercentageString(resonatorName) }})
                          </span>
                        </div>
                        <div v-else class="d-flex flex-row align-center w-100">
                          <div
                            :class="`barh d-flex bg-${damageAnalysis.resonator_template.getResonatorElementEn(resonatorName)}`"
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
              </template>
            </div>
          </v-container>
        </div>
        <!-- Buff damage distribution -->
        <v-row class="my-1">
          <h2 id="buff_damage_distribution">{{ $t('template.damage_analysis.buff_damage_distribution') }}</h2>
        </v-row>
        <div class="d-flex flex-column my-1 mb-4">
          <v-container class="bg-blue-grey-darken-4">
            <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{
                  $t(damageAnalysis.resonator_template.id)
                }}</span>
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
              <div class="d-flex flex-row align-center ma-1"
                v-for="bar in damageAnalysis.getDamageDistributionsWithBuffsBars()">
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
        <div v-for="(resonatorName, i) in damageAnalysis.resonator_template.getResonatorNames()"
          class="d-flex flex-column">
          <template v-if="resonatorName">
            <v-row class="my-1">
              <h3 :id="`resonator${i}`">{{ $t(resonatorName) }}</h3>
            </v-row>
            <ResonatorInfo class="my-1" :resonator="damageAnalysis.getResonatorModelByName(resonatorName)" />
            <!-- Skill -->
            <v-row class=" my-1">
              <h4 :id="`resonator${i}_skill_damage_distribution`">{{
                $t('template.damage_analysis.skill_damage_distribution') }}</h4>
            </v-row>
            <div class="d-flex flex-column my-1 mb-4 w-100">
              <v-container class="bg-blue-grey-darken-4">
                <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                  <v-row class="ma-1 text-truncate">
                    <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                    <span class="team-damage-distribution-header-value text-truncate">{{
                      $t(damageAnalysis.resonator_template.id) }}</span>
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
                          <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}:
                          </span>
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
              <v-container class="bg-blue-grey-darken-4">
                <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                  <v-row class="ma-1 text-truncate">
                    <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                    <span class="team-damage-distribution-header-value text-truncate">{{
                      $t(damageAnalysis.resonator_template.id)
                    }}</span>
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
                          <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}:
                          </span>
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
              <v-container class="bg-blue-grey-darken-4">
                <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
                  <v-row class="ma-1 text-truncate">
                    <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                    <span class="team-damage-distribution-header-value text-truncate">{{
                      $t(damageAnalysis.resonator_template.id)
                    }}</span>
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
                          <span class="team-damage-distribution-tooltip-header">({{ $t('general.denominator') }}:
                          </span>
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
          </template>
        </div>
        <v-row class="my-1">
          <h2 id="rotation">{{ $t('general.rotation') }}</h2>
        </v-row>
        <div class="d-flex flex-column my-1 mb-4 w-100">
          <Rotation v-if="damageAnalysis.resonator_template.id" class="my-1"
            :rotation="damageAnalysis.resonator_template.getRotation()" :jump="'calculated_row'" />
        </div>
        <v-row class=" my-1">
          <h3 id="rotation_damage">
            {{ $t('template.damage_analysis.rotation_damage') }}
          </h3>
        </v-row>
        <div v-if="damageAnalysis.damage_distribution.rows.length > 0" class="d-flex flex-column my-1 mb-4 w-100">
          <v-container class="bg-blue-grey-darken-4">
            <div class="d-flex flex-column bg-blue-grey-darken-4 text-truncate">
              <v-row class="ma-1 text-truncate">
                <span class="team-damage-distribution-header">{{ $t('general.template_id') }}: </span>
                <span class="team-damage-distribution-header-value text-truncate">{{
                  $t(damageAnalysis.resonator_template.id)
                }}</span>
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
              <div class="d-flex flex-row align-center ma-1" v-for="(bar, i) in damageAnalysis.getCalculatedRowBars()">
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
                      v-on:click="jumpToSection(goTo, `#calculated_row${i}`)">
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
        <div v-if="damageAnalysis.damage_distribution.rows.length > 0" class="d-flex flex-column">
          <v-row class="my-1">
            <h3 id="detailed_damage" class="mb-2">
              {{ $t('template.damage_analysis.detailed_damage') }}
            </h3>
          </v-row>
          <div v-for="(row, i) in damageAnalysis.damage_distribution.rows" :id="`calculated_row${i}`"
            class="d-flex flex-column my-1">
            <div class="d-flex flex-row my-1 align-center">
              <img class="resonator-icon mr-4" :src="resonatorStore.getIconSrcByName(row.resonator_name)" />
              <span class="mr-4">{{ $t(row.resonator_name) }}</span>
              <span>{{ $t("general.nth_row", { n: i + 1 }) }}</span>
              <div class="d-flex flex-row ml-auto">
                <v-btn v-if="damageAnalysis.resonator_template.getRotationIndices().includes(i.toString())" class="mr-2"
                  v-on:click="jumpToSection(goTo, `#rotation${i}`)">
                  {{ $t('general.back_to', { to: $t('general.rotation') }) }}
                </v-btn>
                <v-btn v-on:click="jumpToSection(goTo, `#rotation_damage${i}`)">
                  {{ $t('general.back_to', { to: $t('template.damage_analysis.rotation_damage') }) }}
                </v-btn>
              </div>
            </div>
            <v-row class="my-1">
              <h4>{{ $t("general.skill") }}</h4>
            </v-row>
            <v-data-table class="table my-1" :items="calculatedRowToSkillTable(row)" disable-sort hide-default-footer
              :items-per-page="2">
            </v-data-table>
            <div class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.damage") }}</h4>
              </v-row>
              <v-data-table class="table my-1" :items="calculatedRowToDamageTable(row)" disable-sort hide-default-footer
                :items-per-page="2">
              </v-data-table>
            </div>
            <div class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.buff") }}</h4>
              </v-row>
              <v-data-table class="table my-1" :items="calculatedRowToBuffTable(row)" disable-sort hide-default-footer
                :items-per-page="-1">
              </v-data-table>
            </div>
            <div class="d-flex flex-column">
              <v-row class="my-1">
                <h4>{{ $t("general.calculation") }}</h4>
              </v-row>
              <RowDetailedDamage :calculation="row.calculation" />
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

import { BuffTypeEnum } from '@/types/buff'
import { SkillAttrEnum } from '@/types/skill'

import { useResonatorStore } from '@/stores/resonator'

import { DamageAnalysis } from '@/ww/damage'
import { TemplateRow } from '@/ww/template'
import { getDecimal, jumpToSection, toNumberString } from "@/ww/utils"

const goTo = useGoTo()
const { t } = useI18n()

const props = defineProps({
  damageAnalysis: {
    type: Object as PropType<DamageAnalysis | any>,
    required: true
  },
  affixPolicy: {
    type: String,
    default: ""
  },
});
const affixPolicy = props.affixPolicy
const damageAnalysis = props.damageAnalysis

const resonatorStore = useResonatorStore()

const title = ref<string>("")
const resonatorNames = reactive<Array<string>>([])
const resonatorInfos = reactive<Array<any>>([])
const rotationIndices = ref<any>([])

async function init() {
  rotationIndices.value = damageAnalysis.resonator_template.getRotationIndices()

  const resonatorNamesForTitle: Array<string> = []
  Object.keys(damageAnalysis.resonator_models).forEach((resonatorID) => {
    const resonatorInfo = damageAnalysis.resonator_models[resonatorID]
    const resonatorName = resonatorInfo.name
    resonatorInfos.push(resonatorInfo)

    resonatorNames.push(resonatorName)
    resonatorNamesForTitle.push(t(resonatorName))
  })

  const titlePrefix = resonatorNamesForTitle.join(" | ")

  if (affixPolicy) {
    const affixPolicyForTitle = t(`general.${affixPolicy}`)
    title.value = `${titlePrefix} — ${affixPolicyForTitle}`
  } else {
    title.value = titlePrefix
  }
}

function calculatedRowToSkillTable(row: TemplateRow): Array<any> {
  return [
    {
      [t('general.action')]: row.action,
      [t('general.resonator_skill_id')]: row.skill_id,
      [t('general.skill_base_attr')]: row.calculation.data.resonator.skill.base_attr,
      [t('general.skill_bonus_type')]: row.calculation.data.resonator.skill.getBonusTypesString(),
      [t('general.hits')]: t('general.n_hits', { n: row.calculation.data.resonator.skill.hit })
    }
  ]
}

function calculatedRowToDamageTable(row: TemplateRow): Array<any> {
  return [
    {
      [t('general.real_damage')]: row.calculation.result.real_dmg_no_crit,
      [t('general.calculated_damage')]: row.calculation.result.damage_no_crit,
      [t('general.real_crit_damage')]: row.calculation.result.real_dmg_crit,
      [t('general.calculated_crit_damage')]: row.calculation.result.damage_crit,
    }
  ]
}

function calculatedRowToBuffTable(row: TemplateRow): Array<any> {
  const buffs = row.buffs
  const table: Array<any> = []
  for (const buff of buffs) {
    const b: any = {
      [t('general.name')]: buff.name,
      [t('general.buff_type')]: buff.type,
      [t('general.stack')]: buff.stack,
      [t('general.value')]: buff.value,
    }
    table.push(b)
  }
  return table
}

onMounted(async () => {
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
