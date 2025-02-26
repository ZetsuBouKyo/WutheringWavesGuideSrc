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
      <v-combobox v-bind="props" v-model="resonator._skill_item" :items="resonatorSkillItems"
        :label="$t('general.resonator_skill_id')" :rules="[checkResonatorSkill]"
        :disabled="resonatorSkillItems.length === 0" @update:modelValue="updateResonatorSkill">
      </v-combobox>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.skill.dmg" :label="$t('general.skill_damage_ratio')"></v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.base_attr" :items="getResonatorBaseAttrs()"
        :label="$t('general.base_attr')"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.main_skill_bonus" :items="getResonatorMainSkillBonus()"
        :label="$t('general.main_skill_bonus')"></v-select>
    </div>
    <!-- Skill -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.skill') }}</span>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.normal_attack_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.normal_attack')" @update:modelValue="updateResonatorSkill"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.resonance_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_skill')" @update:modelValue="updateResonatorSkill"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.forte_circuit_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.forte_circuit')" @update:modelValue="updateResonatorSkill"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.resonance_liberation_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_liberation')"
        @update:modelValue="updateResonatorSkill"></v-select>
    </div>
    <div class="d-flex flex-row">
      <v-select v-model="resonator.intro_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.intro_skill')" @update:modelValue="updateResonatorSkill"></v-select>
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
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_skill" :label="$t('general.bonus_resonance_skill')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_basic_attack" :label="$t('general.bonus_basic_attack')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_heavy_attack" :label="$t('general.bonus_heavy_attack')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_resonance_liberation"
        :label="$t('general.bonus_resonance_liberation')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_healing" :label="$t('general.bonus_healing')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_physics" :label="$t('general.bonus_physics')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_glacio" :label="$t('general.bonus_glacio')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_fusion" :label="$t('general.bonus_fusion')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_electro" :label="$t('general.bonus_electro')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_aero" :label="$t('general.bonus_aero')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_spectro" :label="$t('general.bonus_spectro')">
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.stat_bonus.bonus_havoc" :label="$t('general.bonus_havoc')">
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useResonatorStore } from '@/stores/resonator';

import { getResonatorBaseAttrs, getResonatorMainSkillBonus } from '@/ww/resonator';

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

async function updateResonatorSkill() {
  await resonator.updateSkill()
}

function checkResonatorSkill(new_item: any) {
  if (!new_item || !new_item.title) {
    return true
  }
  for (const old_item of resonatorSkillItems.value) {
    if (new_item.title === old_item.title) {
      return true
    }
  }
  return t('general.error')
}
</script>

<style scoped lang="sass">
.skill
  white-space: pre-line
</style>