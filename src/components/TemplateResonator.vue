<template>
  <div class="d-flex flex-row w-100">
    <div class="d-flex flex-column w-100 mr-6">
      <div class="d-flex flex-row mb-2">
        <h2>{{ $t('general.input') }}</h2>
      </div>
      <div class=" d-flex flex-row mb-2">
        <span>{{ $t('general.resonator') }}</span>
      </div>
      <div class="d-flex flex-row">
        <v-select v-model="resonator.level" :items="resonatorLevels" :label="$t('general.level')">
        </v-select>
      </div>
      <div class="d-flex flex-row">
        <v-text-field v-model="resonator.energy_regen" :label="$t('general.energy_regen')"></v-text-field>
      </div>
      <!-- Weapon -->
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('general.weapon') }}</span>
      </div>
      <div class="d-flex flex-row">
        <v-combobox v-model="weapon.name" :items="weaponNames" :label="$t('general.name')" :rules="[checkWeaponName]"
          @update:modelValue="updateWeapon"></v-combobox>
      </div>
      <div class="d-flex flex-row">
        <v-select v-model="weapon.level" :items="weapon.getLevels()" :label="$t('general.level')"
          @update:modelValue="updateWeapon"></v-select>
      </div>
      <div class="d-flex flex-row">
        <v-select v-model="weapon.tune" :items="weaponTunes" :label="$t('general.tune')"
          @update:modelValue="updateWeapon"></v-select>
      </div>
      <!-- Skill level -->
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('general.skill_level') }}</span>
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
    <div class="d-flex flex-column w-100">
      <div class="d-flex flex-row mb-2">
        <h2>{{ $t('general.result') }}</h2>
      </div>
      <div class="d-flex flex-column text-grey-lighten-1">
        <div class=" d-flex flex-row mb-2">
          <span>{{ $t('general.resonator') }}</span>
        </div>
        <div class="d-flex flex-row">
          <v-text-field v-model="resonator.hp" :label="$t('general.hp')" readonly>
          </v-text-field>
        </div>
        <div class="d-flex flex-row">
          <v-text-field v-model="resonator.atk" :label="$t('general.atk')" readonly>
          </v-text-field>
        </div>
        <div class="d-flex flex-row">
          <v-text-field v-model="resonator.def" :label="$t('general.def')" readonly>
          </v-text-field>
        </div>
        <!-- Weapon -->
        <div class=" d-flex flex-row mb-2">
          <span>{{ $t('general.weapon') }}</span>
        </div>
        <div class="d-flex flex-row">
          <v-text-field v-model="weapon.atk" :label="$t('general.atk')" readonly>
          </v-text-field>
        </div>
        <div v-if="weapon.stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
          :key="weapon.stat_bonus.getKeys().length">
          <div v-for="key in weapon.stat_bonus.getKeys()" class="d-flex flex-row" :key="key">
            <v-text-field v-model="weapon.stat_bonus[key]" :label="$t(`general.${key}`)" readonly>
            </v-text-field>
          </div>
        </div>
        <div v-if="weapon.passive_stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
          :key="weapon.passive_stat_bonus.getKeys().length">
          <div v-for="key in weapon.passive_stat_bonus.getKeys()" class="d-flex flex-row" :key="key">
            <v-text-field v-model="weapon.passive_stat_bonus[key]" :label="$t(`general.${key}`)" readonly>
            </v-text-field>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useTemplateStore } from '@/stores/calculation/template';
import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useRowEchoesStore } from '@/stores/calculation/echoes';

import { useResonatorStore } from '@/stores/resonator';
import { useWeaponStore } from '@/stores/weapon';

import { getResonatorBaseAttrs } from '@/ww/resonator';
import { RowAutoFillEchoes } from "@/ww/echoes"
import { getSkillBonusType } from '@/ww/buff';

const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  i: {
    type: Number,
    required: true
  }
});
const id = props.id
const i = props.i

const template = useTemplateStore(id)

const { t } = useI18n()

const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames(spoiler)
const resonatorLevels = resonatorStore.getLevels()
const resonatorChains = resonatorStore.getChains()
const resonatorSkillLevels = resonatorStore.getSkillLevels()

const weaponStore = useWeaponStore()
const weaponNames = weaponStore.getNames(spoiler)
const weaponTunes = weaponStore.getTunes()

const resonator = template.data.calculation.resonators[i].resonator

function checkResonatorName(name: string) {
  if (resonatorNames.includes(name)) {
    return true
  }
  return t('general.error')
}

const weapon = template.data.calculation.resonators[i].weapon
const echoes = template.data.calculation.resonators[i].echoes

function checkWeaponName(name: string) {
  if (weaponNames.includes(name)) {
    return true
  }
  return t('general.error')
}

function updateWeapon() {
  weapon.updateRowWeaponByName()
}
</script>

<style scoped lang="sass">
.skill
  white-space: pre-line
</style>