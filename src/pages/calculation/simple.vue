<template>
  <Explorer>
    <v-container class="nav d-flex flex-columnmx-auto pl-8">
      <div class="d-flex flex-row w-100">
        <v-tabs class="d-flex flex-row align-center" align-tabs="start" color="blue-accent-1" v-model="tab">
          <v-tab value="resonator">{{ $t('general.resonator') }}</v-tab>
          <v-tab value="echo">{{ $t('general.echo') }}</v-tab>
          <v-tab value="monster">{{ $t('general.monster') }}</v-tab>
          <v-tab value="result">{{ $t('calculation.result') }}</v-tab>
        </v-tabs>
        <div class="d-flex flex-row align-center ml-auto">
          <v-btn v-on:click="calculate">
            {{ $t('general.calculate') }}
          </v-btn>
        </div>
      </div>
    </v-container>
    <v-container>
      <v-tabs-window class="window mx-auto" v-model="tab">
        <v-tabs-window-item value="resonator">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-8">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <div class="d-flex flex-row">
                <v-combobox v-model="resonator.name" :items="resonatorNames" :label="$t('general.name')"
                  :rules="[checkResonatorName]" @update:modelValue="updateResonator"></v-combobox>
              </div>
              <div class="d-flex flex-row">
                <v-select v-model="resonator.level" :items="resonatorLevels" :label="$t('general.level')">
                </v-select>
              </div>
              <div class="d-flex flex-row">
                <v-select v-model="resonator.chain" :items="resonatorChains"
                  :label="$t('general.resonator_chain')"></v-select>
              </div>
              <div class="d-flex flex-row">
                <v-combobox v-model="resonatorSkill" :items="resonatorSkillItems"
                  :label="$t('general.resonator_skill_id')" :rules="[checkResonatorSkill]"></v-combobox>
              </div>
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.skill') }}</h3>
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
                <v-checkbox v-model="resonator.inherent_skill_1"
                  :label="$t('general.resonator_skills.inherent_skill_1')">
                </v-checkbox>
              </div>
              <div class="d-flex flex-row">
                <v-checkbox v-model="resonator.inherent_skill_2"
                  :label="$t('general.resonator_skills.inherent_skill_2')">
                </v-checkbox>
              </div>
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.stat_bonus') }}</h3>
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
                <v-text-field v-model="resonator.stat_bonus.bonus_resonance_liberation"
                  :label="$t('general.bonus.liberation')">
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
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.weapon_name') }}</h2>
              </div>
              <div class="d-flex flex-row">
                <v-select v-model="weapon.name" :items="weaponNames" :label="$t('general.name')"
                  @update:modelValue="weapon.updateRowWeaponByName()"></v-select>
              </div>
              <div class="d-flex flex-row">
                <v-select v-model="weapon.level" :items="weaponLevels" :label="$t('general.level')"></v-select>
              </div>
              <div class="d-flex flex-row">
                <v-select v-model="weapon.tune" :items="weaponTunes" :label="$t('general.tune')"></v-select>
              </div>
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="echo">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-8">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.echo') }}</h2>
              </div>
              <div class="d-flex flex-row">
                <v-combobox v-model="resonator.name" :items="resonatorNames" :label="$t('general.name')"
                  :rules="[checkResonatorName]" @update:modelValue="updateResonator"></v-combobox>
              </div>
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.sonata') }}</h2>
              </div>
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="monster">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-8">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.echo') }}</h2>
              </div>
              <div class="d-flex flex-row">
                <v-combobox v-model="resonator.name" :items="resonatorNames" :label="$t('general.name')"
                  :rules="[checkResonatorName]" @update:modelValue="updateResonator"></v-combobox>
              </div>
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.sonata') }}</h2>
              </div>
            </div>
          </div>
        </v-tabs-window-item>
        <v-tabs-window-item value="result">
          <div class="d-flex flex-row w-100">
            <div class="d-flex flex-column w-100 mr-8">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.resonator') }}</h2>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.name" :label="$t('general.name')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.level" :label="$t('general.level')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.chain" :label="$t('general.resonator_chain')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.skill.id" :label="$t('general.resonator_skill_id')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.skill.dmg" :label="$t('general.skill_damage_ratio')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row mb-2">
                <h3>{{ $t('general.stat_bonus') }}</h3>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.hp_p" :label="$t('general.hp_p')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.atk_p" :label="$t('general.atk_p')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.def_p" :label="$t('general.def_p')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.crit_rate" :label="$t('general.crit_rate')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.crit_dmg" :label="$t('general.crit_dmg')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_resonance_skill" :label="$t('general.bonus.skill')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_basic_attack" :label="$t('general.bonus.basic')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_heavy_attack" :label="$t('general.bonus.heavy')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_resonance_liberation"
                  :label="$t('general.bonus.liberation')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_healing" :label="$t('general.bonus.healing')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_physics" :label="$t('general.bonus.physics')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_glacio" :label="$t('general.bonus.glacio')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_fusion" :label="$t('general.bonus.fusion')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_electro" :label="$t('general.bonus.electro')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_aero" :label="$t('general.bonus.aero')" readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_spectro" :label="$t('general.bonus.spectro')"
                  readonly>
                </v-text-field>
              </div>
              <div class="d-flex flex-row">
                <v-text-field v-model="resonator.stat_bonus.bonus_havoc" :label="$t('general.bonus.havoc')" readonly>
                </v-text-field>
              </div>
            </div>
            <div class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-2">
                <h2>{{ $t('general.result') }}</h2>
              </div>
            </div>
          </div>
        </v-tabs-window-item>
      </v-tabs-window>
    </v-container>
  </Explorer>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useResonatorStore } from '@/stores/resonator';
import { useWeaponStore } from '@/stores/weapon';

import { RowResonator } from '@/ww/resonator';
import { RowWeapon } from '@/ww/weapon';

const { t } = useI18n()

const tab = ref<string>("")
const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames()
const resonatorLevels = resonatorStore.getLevels()
const resonatorChains = resonatorStore.getChains()
const resonatorSkillLevels = resonatorStore.getSkillLevels()

const weaponStore = useWeaponStore()
const weaponNames = weaponStore.getNames()
const weaponLevels = weaponStore.getLevels()
const weaponTunes = weaponStore.getTunes()

const resonator = reactive<RowResonator>(new RowResonator())
const resonatorSkill = ref<any>({ title: "", value: undefined })
const resonatorSkillItems = ref<any>([])

const weapon = reactive<RowWeapon>(
  new RowWeapon()
)

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

async function calculate() {
  const skill = resonatorSkill.value.value
  if (!skill) {
    return
  }
  resonator.updateSkill(skill)
  console.log(resonator)
  console.log(weapon)
}
</script>

<style scoped lang="sass">
.nav
  z-index: 999
  margin-top: 60px
  background: rgb(var(--v-theme-background))
  position: fixed
  left: 50%
  transform: translateX(-50%)
.window
  margin-top: 140px
  margin-bottom: 60px
</style>