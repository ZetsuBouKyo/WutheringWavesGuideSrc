<template>
  <v-container class="h-100">
    <v-row class="mb-2 text-truncate">
      <h1 v-if="title">{{ title }}</h1>
    </v-row>
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
                <a class="value text-decoration-none text-truncate w-100"
                  :href="`/template/${teamDistribution.getHashedTemplateID()}`">
                  {{ $t(teamDistribution.template_id) }}
                </a>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row w-100">
                <span class="header text-truncater">{{ $t('general.monster_id') }}: </span>
                <span class="value text-truncate">{{ $t(teamDistribution.monster_id) }}</span>
              </div>
            </v-row>
            <v-row class="text-grey-darken-1">
              <div class="d-flex flex-row w-100">
                <span class="header text-truncate">{{ $t('general.team_dps') }}: </span>
                <span class="value text-truncate">{{ teamDistribution.getTeamDPSString() }} </span>
              </div>
            </v-row>
          </v-col>
        </div>
        <div class="d-flex flex-row align-center w-100">
          <div class="d-flex flex-row align-start w-100 bg-grey-darken-4" :key="baseDPS">
            <div class="d-flex flex-row align-start"
              :style="`width: ${teamDistribution.getTeamDPSPercentageString(baseDPS)};`">
              <v-tooltip :text="`${$t(resonatorName)} DPS: ${teamDistribution.getResonatorDPSString(resonatorName)}
            (${teamDistribution.getResonatorMaxDPSPercentageString(resonatorName)})`"
                v-for="(resonatorName, i) in Object.keys(teamDistribution.resonators)" location="bottom">
                <template v-slot:activator="{ props }">
                  <div class="d-flex" v-bind="props"
                    :style="`width: ${teamDistribution.getResonatorMaxDPSPercentageString(resonatorName)};`">
                    <div
                      :class="`barh w-100 d-flex flex-row-reverse align-center bg-${resonatorNameToElementEn[resonatorName]} ${isDivide(i)}`">
                      <span v-if="teamDistribution.getResonatorMaxDPSPercentage(resonatorName) > 0.1"
                        class="mr-4 text-truncate text-end w-100">
                        {{ teamDistribution.getResonatorMaxDPSPercentageString(resonatorName) }}</span>
                    </div>
                  </div>
                </template>
              </v-tooltip>
            </div>
          </div>
          <div class="team d-flex flex-row justify-end h-100">
            {{ teamDistribution.getTeamDPSPercentageString(baseDPS) }}
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { reactive, ref, watch } from 'vue';

import { useResonatorStore } from '@/stores/resonator';
import { useDamageAnalysisStore } from '@/stores/damageAnalysis';

const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  affixPolicy: {
    type: String,
    required: true,
  },
  templateIds: {
    type: Object as PropType<Array<string>>,
    required: true,
  },
});

const title = props.title
const affixPolicy = props.affixPolicy
const templateIds = props.templateIds

const resonatorStore = useResonatorStore()
const damageAnalysisStore = useDamageAnalysisStore()

const resonatorNameToElementEn = reactive<any>({})
const teamDamageDistributions = reactive<Array<any>>([])
const baseDPS = ref<number>(0)

async function init(templateIds: Array<string>) {
  if (templateIds.length === 0) {
    return
  }
  templateIds.forEach(async (templateId: string) => {
    const damageAnalysis = await damageAnalysisStore.getDamageAnalysisByTemplateId(templateId, affixPolicy)
    if (damageAnalysis) {
      const teamDamageDistribution = damageAnalysis.getTeamDamageDistribution()
      teamDamageDistributions.push(teamDamageDistribution)
      const resonatorNames = teamDamageDistribution.getResonatorNames()
      resonatorNames.forEach(async (resonatorName: string) => {
        if (!resonatorNameToElementEn[resonatorName]) {
          const element = await resonatorStore.getElementEnByName(resonatorName)
          resonatorNameToElementEn[resonatorName] = element
        }
      })
    }
  });
}

function initBaseDps() {
  if (teamDamageDistributions.length > 0) {
    teamDamageDistributions.sort((distributionA: any, distributionB: any) => {
      const dpsA = parseFloat(distributionA.getMaxTeamDPS())
      const dpsB = parseFloat(distributionB.getMaxTeamDPS())
      if (!dpsA || !dpsB) {
        return 0
      }
      return dpsB - dpsA
    })
    baseDPS.value = parseFloat(teamDamageDistributions[0].getMaxTeamDPS())
  }
}

function isDivide(i: number): string {
  if (i < 2) {
    return "divide"
  }
  return ""
}

onMounted(async () => {
  await init(templateIds)
})

watch(() => { return templateIds.length }, async () => {
  await init(templateIds)
})
watch(() => { return teamDamageDistributions.length }, () => {
  initBaseDps()
})
</script>

<style scoped lang="sass">
.resonator
  height: 60px
  width: 60px
.header
  width: 80px
.value
  width: calc(100% - 80px)
.barh
  height: 40px
.divide
  border-right: solid 1px rgb(240, 240, 240)
.team
  width: 72px
</style>