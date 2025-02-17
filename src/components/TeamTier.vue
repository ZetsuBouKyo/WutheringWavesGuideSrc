<template>
  <v-container class="h-100">
    <div class="d-flex flex-column align-start">
      <div class="d-flex flex-column w-100 my-2" v-for="(teamDistribution, i) in teamDamageDistributions" :key="i">
        <div class="d-flex flex-row mb-1">
          <div class=" d-flex flex-row justify-center mr-2">
            <img v-for="source in teamDistribution.getResonatorIconSources()" class="resonator mr-2" :src="source" />
          </div>
          <v-col>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row w-100">
                <span class="header">{{ $t('general.template_id') }}: </span>
                <a class="text-decoration-none text-truncate"
                  :href="`/template/${teamDistribution.getHashedTemplateID()}`">{{
                    teamDistribution.template_id }}</a>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row w-100">
                <span class="header text-truncater">{{ $t('general.monster_id') }}: </span>
                <span class="text-truncate">{{ teamDistribution.monster_id }}</span>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row w-100">
                <span class="header text-truncate">{{ $t('general.team_dps') }}: </span>
                <span class="text-truncate">{{ teamDistribution.getTeamDPS() }} </span>
              </div>
            </v-row>
          </v-col>
        </div>
        <div class="d-flex flex-row align-center w-100">
          <div class="d-flex flex-row align-start bg-grey-darken-4 w-100">
            <v-tooltip
              :text="`DPS: ${teamDistribution.getResonatorDPSString(resonatorName)} (${teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage)})`"
              v-for="(resonatorName, i) in Object.keys(teamDistribution.resonators)" location="bottom">
              <template v-slot:activator="{ props }">
                <div class="d-flex" v-bind="props"
                  :style="`width: ${teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage)};`">
                  <div
                    :class="`barh w-100 d-flex flex-row-reverse align-center bg-${resonators.getElementEnByName(resonatorName)} ${isDivide(i)}`">
                    <span v-if="teamDistribution.getResonatorDamagePercentage(resonatorName, baseDamage) > 0.1"
                      class="mr-4 text-truncate">
                      {{ teamDistribution.getResonatorDamagePercentageString(resonatorName, baseDamage) }}</span>
                  </div>
                </div>
              </template>
            </v-tooltip>
          </div>
          <div class="team d-flex flex-row justify-end h-100">{{
            teamDistribution.getTeamDamagePercentageString(baseDamage) }}
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { resonators } from '@/ww/resonator'
import { calculatedDamageAnalyses } from '@/ww/damage';

const props = defineProps({
  affixPolicy: {
    type: Object as PropType<string>,
    required: true,
  },
  templateIDs: {
    type: Object as PropType<Array<string>>,
    required: true,
  },
});

const affixPolicy = props.affixPolicy
const templateIDs = props.templateIDs

const teamDamageDistributions: Array<any> = []

templateIDs.forEach((templateID: string) => {
  const damageAnalysis = calculatedDamageAnalyses.getDamageAnalysis(templateID, affixPolicy)
  if (damageAnalysis) {
    teamDamageDistributions.push(damageAnalysis.getTeamDamageDistribution())
  }
});

teamDamageDistributions.sort((distributionA: any, distributionB: any) => {
  const damageA = parseFloat(distributionA.damage)
  const damageB = parseFloat(distributionB.damage)
  if (!damageA || !damageB) {
    return 0
  }
  return damageB - damageA
})

const baseDamage = parseFloat(teamDamageDistributions[0].damage)

function isDivide(i: number): string {
  if (i < 2) {
    return "divide"
  }
  return ""
}

</script>

<style scoped lang="sass">
.resonator
  height: 60px
  width: 60px
.header
  width: 80px
.barh
  height: 40px
.divide
  border-right: solid 1px rgb(240, 240, 240)
.team
  width: 72px
</style>