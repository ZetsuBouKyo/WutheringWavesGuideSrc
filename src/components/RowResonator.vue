<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-combobox v-model="resonator.name" :items="resonatorNames" :label="$t('general.name')"
        :rules="[checkResonatorName]" @update:modelValue="updateResonator"></v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.level" :items="resonatorLevels" :label="$t('general.level')">
      </v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.chain" :items="resonatorChains" :label="$t('general.resonator_chain')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-combobox v-model="resonator._skill_item" :items="resonatorSkillItems" :label="$t('general.resonator_skill_id')"
        :rules="[checkResonatorSkill]" :disabled="resonatorSkillItems.length === 0"></v-combobox>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.skill') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.normal_attack_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.normal_attack')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.resonance_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_skill')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.forte_circuit_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.forte_circuit')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.resonance_liberation_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_liberation')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.intro_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.intro_skill')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-checkbox v-model="resonator.inherent_skill_1" :label="$t('general.resonator_skills.inherent_skill_1')">
      </v-checkbox>
    </div>
    <div class="d-flex flex-row">
      <v-checkbox v-model="resonator.inherent_skill_2" :label="$t('general.resonator_skills.inherent_skill_2')">
      </v-checkbox>
    </div>
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.stat_bonus') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.hp_p" :label="$t('general.hp_p')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.atk_p" :label="$t('general.atk_p')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.def_p" :label="$t('general.def_p')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.crit_rate" :label="$t('general.crit_rate')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.crit_dmg" :label="$t('general.crit_dmg')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_skill" :label="$t('general.bonus.skill')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_basic_attack" :label="$t('general.bonus.basic')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_heavy_attack" :label="$t('general.bonus.heavy')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_liberation" :label="$t('general.bonus.liberation')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_healing" :label="$t('general.bonus.healing')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_physics" :label="$t('general.bonus.physics')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_glacio" :label="$t('general.bonus.glacio')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_fusion" :label="$t('general.bonus.fusion')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_electro" :label="$t('general.bonus.electro')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_aero" :label="$t('general.bonus.aero')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_spectro" :label="$t('general.bonus.spectro')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_havoc" :label="$t('general.bonus.havoc')">
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import useRowResonatorStore from '@/stores/calculation/resonator';
import { useResonatorStore } from '@/stores/resonator';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const { t } = useI18n()

const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames()
const resonatorLevels = resonatorStore.getLevels()
const resonatorChains = resonatorStore.getChains()
const resonatorSkillLevels = resonatorStore.getSkillLevels()

const resonator = useRowResonatorStore(id)
const resonatorSkillItems = ref<any>([])

function checkResonatorName(name: string) {
  if (resonatorNames.includes(name)) {
    return true
  }
  return t('general.error')
}

async function updateResonator() {
  await resonator.updateRowResonatorByName()
  const name = resonator.name
  const check = checkResonatorName(name)
  if (check !== true) {
    resonatorSkillItems.value = []
    return
  }
  resonatorSkillItems.value = await resonatorStore.getSkillItems(name)
}

function checkResonatorSkill(new_item: any) {
  for (const old_item of resonatorSkillItems.value) {
    if (new_item.title === old_item.title) {
      return true
    }
  }
  return t('general.error')
}
</script>