<template>
  <div class="d-flex flex-column w-100">
    <ElementFilter class="d-flex mb-2" v-model="selectedElement" @update:modelValue="filter" />
    <RarityFilter class="d-flex mb-2" v-model="selectedRarity" @update:modelValue="filter" :rarities='["4", "5"]' />
    <WeaponFilter class="d-flex mb-4" v-model="selectedWeapon" @update:modelValue="filter" />
    <div class="d-flex flex-row mb-4">
      <v-combobox v-model="resonator.data.name" :items="resonatorNames" :label="$t('general.name')"
        :rules="[checkResonatorName]" @update:modelValue="updateResonator" variant="outlined" density="compact"
        hide-details>
      </v-combobox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.level" :items="resonatorLevels" :label="$t('general.level')"
        @update:modelValue="resonator.updateByLevel" variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.chain" :items="resonatorChains" :label="$t('general.resonator_chain')"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.weapon_zh_tw" :label="$t('general.weapon')" variant="outlined" density="compact"
        hide-details disabled>
      </v-select>
    </div>
    <!-- Skill -->
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.skill') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-combobox v-bind="props" v-model="resonator.data._skill_item" :items="resonatorSkillItems"
        :label="$t('general.resonator_skill_id')" :rules="[checkResonatorSkill]"
        :disabled="resonatorSkillItems.length === 0" @update:modelValue="updateResonatorSkill" variant="outlined"
        density="compact" hide-details>
        <template v-slot:item="{ props, item }">
          <v-tooltip location="end" max-width="400" :disabled="!item.value.tooltip">
            <div v-html="getPlainText(item.value.tooltip)"></div>
            <template v-slot:activator="{ props: tooltipProps }">
              <v-list-item v-bind="{ ...props, ...tooltipProps }"></v-list-item>
            </template>
          </v-tooltip>
        </template>
      </v-combobox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.skill.dmg" :label="$t('general.skill_damage_ratio')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.skill.base_attr" :items="getResonatorBaseAttrs()"
        :label="$t('general.base_attr')" variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.skill.bonus_types" :items="getSkillBonusType()"
        :label="$t('general.skill_bonus_type')" chips multiple variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <!-- Skill level -->
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.skill_level') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.normal_attack_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.normal_attack')" @update:modelValue="updateResonatorSkill"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.resonance_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_skill')" @update:modelValue="updateResonatorSkill"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.forte_circuit_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.forte_circuit')" @update:modelValue="updateResonatorSkill"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.resonance_liberation_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.resonance_liberation')" @update:modelValue="updateResonatorSkill"
        variant="outlined" density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.intro_skill_lv" :items="resonatorSkillLevels"
        :label="$t('general.resonator_skills.intro_skill')" @update:modelValue="updateResonatorSkill" variant="outlined"
        density="compact" hide-details>
      </v-select>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-checkbox v-model="resonator.data.inherent_skill_1" :label="$t('general.resonator_skills.inherent_skill_1')"
        variant="outlined" density="compact" hide-details>
      </v-checkbox>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-checkbox v-model="resonator.data.inherent_skill_2" :label="$t('general.resonator_skills.inherent_skill_2')"
        variant="outlined" density="compact" hide-details>
      </v-checkbox>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.stat_bonus') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.hp_p" :label="$t('general.hp_p')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.atk_p" :label="$t('general.atk_p')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.def_p" :label="$t('general.def_p')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.crit_rate" :label="$t('general.crit_rate')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.crit_dmg" :label="$t('general.crit_dmg')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_resonance_skill"
        :label="$t('general.bonus_resonance_skill')" variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_basic_attack" :label="$t('general.bonus_basic_attack')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_heavy_attack" :label="$t('general.bonus_heavy_attack')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_resonance_liberation"
        :label="$t('general.bonus_resonance_liberation')" variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_healing" :label="$t('general.bonus_healing')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_physics" :label="$t('general.bonus_physics')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_glacio" :label="$t('general.bonus_glacio')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_fusion" :label="$t('general.bonus_fusion')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_electro" :label="$t('general.bonus_electro')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_aero" :label="$t('general.bonus_aero')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_spectro" :label="$t('general.bonus_spectro')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.stat_bonus.bonus_havoc" :label="$t('general.bonus_havoc')"
        variant="outlined" density="compact" hide-details>
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useRowResonatorStore } from '@/stores/calculation/resonator';
import { useRowWeaponStore } from '@/stores/calculation/weapon';
import { useRowEchoesStore } from '@/stores/calculation/echoes';
import { useResonatorStore, getBasicResonatorInfos } from '@/stores/resonator';

import { getResonatorBaseAttrs } from '@/ww/resonator';
import { RowAutoFillEchoes } from "@/ww/echoes"
import { getSkillBonusType } from '@/ww/buff';
import { getPlainText } from '@/ww/utils';

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
});
const id = props.id

const { t } = useI18n()

const basicResonatorInfos = getBasicResonatorInfos()

const resonatorStore = useResonatorStore()
const resonatorNames = ref(basicResonatorInfos.getNames())
const resonatorLevels = resonatorStore.getLevels()
const resonatorChains = resonatorStore.getChains()
const resonatorSkillLevels = resonatorStore.getSkillLevels()

const selectedElement = ref(undefined)
const selectedRarity = ref(undefined)
const selectedWeapon = ref(undefined)
const resonator = useRowResonatorStore(id)
const resonatorSkillItems = ref<any>([])

function checkResonatorName(name: string) {
  if (resonatorNames.value.includes(name)) {
    return true
  }
  return t('general.error')
}

const echoes = useRowEchoesStore(id)
const weapon = useRowWeaponStore(id)
async function updateResonator() {
  await resonator.updateByName()
  const name = resonator.data.name
  const check = checkResonatorName(name)
  if (check !== true) {
    resonatorSkillItems.value = []
    return
  }
  resonatorSkillItems.value = await resonatorStore.getDamageSkillItems(name)

  const auto = new RowAutoFillEchoes(resonator.data, weapon.data, echoes.data)
  auto.update43311()
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

function filter() {
  basicResonatorInfos.filter(selectedElement.value, selectedRarity.value, selectedWeapon.value)
  resonatorNames.value = basicResonatorInfos.getNames()
}

</script>

<style scoped lang="sass">
.skill
  white-space: pre-line
</style>