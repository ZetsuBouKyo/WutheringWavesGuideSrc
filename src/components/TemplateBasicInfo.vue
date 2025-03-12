<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row w-100 align-center mb-4">
      <v-autocomplete class="mr-6" v-model="template.data.id" max-width="1080px"
        :items="templatesStore.getTemplateItems()" :label="$t('general.template_id')"
        @update:modelValue="updateTemplateByTemplateIdItem" variant="outlined" density="compact" hide-details focused>
      </v-autocomplete>
      <v-btn class="ml-auto" v-on:click="template.initTemplateByHashedId()">
        {{ $t('general.load_built_in_template') }}
      </v-btn>
    </div>
    <div class=" d-flex flex-row mb-4">
      <h2>{{ $t('general.basic_info') }}</h2>
    </div>
    <v-select class="mb-4" max-width="400px" v-model="template.data.monster_id" :items="monsterItems"
      :label="$t('general.monster_id')" variant="outlined" density="compact" hide-details>
    </v-select>
    <v-text-field class="mb-4" max-width="400px" v-model="template.data.duration_1" :label="$t('general.duration_1')"
      variant="outlined" density="compact" hide-details>
    </v-text-field>
    <v-text-field class="mb-4" max-width="400px" v-model="template.data.duration_2" :label="$t('general.duration_2')"
      variant="outlined" density="compact" hide-details>
    </v-text-field>
    <v-textarea v-model="template.data.description" :label="$t('general.description')" variant="outlined"
      density="compact"></v-textarea>
    <div class="d-flex flex-row">
      <div v-for="(resonator, i) in template.data.resonators" class="d-flex flex-column w-100 mr-6">
        <div class="d-flex flex-row mb-4">
          <h2>{{ $t('general.resonator_nth', { n: i + 1 }) }}</h2>
        </div>
        <v-combobox class="mb-4" max-width="400px" v-model="resonator.resonator_name" :items="resonatorNames"
          :label="$t('general.resonator_1')" @update:modelValue="template.updateByResonatorName(0)" variant="outlined"
          density="compact" hide-details>
        </v-combobox>
        <v-select class="mb-4" v-model="resonator.resonator_chain" :items="resonatorChains"
          :label="$t('general.resonator_chain')" @update:modelValue="template.updateResonatorByCalculation(i)"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-text-field class="mb-4" v-model="resonator.resonator_energy_regen" :label="$t('general.energy_regen')"
          @update:modelValue="template.updateResonatorByCalculation(i)" variant="outlined" density="compact"
          hide-details>
        </v-text-field>
        <v-select class="mb-4" v-model="resonator.resonator_base_attr" :items="getResonatorBaseAttrs()"
          :label="$t('general.base_attr')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_skill_bonus" :items="getResonatorMainSkillBonus()"
          :label="$t('general.main_skill_bonus')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-checkbox class="mb-4" v-model="resonator.resonator_inherent_skill_1"
          :label="$t('general.resonator_skills.inherent_skill_1')" variant="outlined" density="compact" hide-details>
        </v-checkbox>
        <v-checkbox class="mb-8" v-model="resonator.resonator_inherent_skill_2"
          :label="$t('general.resonator_skills.inherent_skill_2')" variant="outlined" density="compact" hide-details>
        </v-checkbox>
        <div class="d-flex flex-row mb-4">
          <h3>{{ $t('general.weapon') }}</h3>
        </div>
        <v-combobox class="mb-4" v-model="resonator.resonator_weapon_name" :items="weaponNames"
          :label="$t('general.name')" :rules="[checkWeaponName]" @update:modelValue="updateWeapon(i)" variant="outlined"
          density="compact" hide-details>
        </v-combobox>
        <v-select class="mb-8" v-model="resonator.resonator_weapon_rank" :items="weaponTunes"
          :label="$t('general.tune')" @update:modelValue="updateWeapon(i)" variant="outlined" density="compact"
          hide-details>
        </v-select>
        <div class="d-flex flex-row mb-4">
          <h3>{{ $t('general.echo') }}</h3>
        </div>
        <div class="d-flex flex-row mb-4">
          <span>{{ $t('general.nth_echo', { n: 1 }) }}</span>
        </div>
        <v-autocomplete class="mb-4" v-model="resonator.resonator_echo_1" :items="echoNames" :label="$t('general.name')"
          variant="outlined" density="compact" hide-details>
        </v-autocomplete>
        <v-select class="mb-4" v-model="resonator.resonator_echo_sonata_1" :items="sonataNames"
          :label="$t('general.sonata')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_cost_1" :items="costs" :label="$t('general.echo_cost')"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_affix_1" :items="abbrs"
          :label="$t('general.main_affix')" variant="outlined" density="compact" hide-details>
        </v-select>
        <div class="d-flex flex-row mb-4">
          <span>{{ $t('general.nth_echo', { n: 2 }) }}</span>
        </div>
        <v-select class="mb-4" v-model="resonator.resonator_echo_sonata_2" :items="sonataNames"
          :label="$t('general.sonata')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_cost_2" :items="costs" :label="$t('general.echo_cost')"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_affix_2" :items="abbrs"
          :label="$t('general.main_affix')" variant="outlined" density="compact" hide-details>
        </v-select>
        <div class="d-flex flex-row mb-4">
          <span>{{ $t('general.nth_echo', { n: 3 }) }}</span>
        </div>
        <v-select class="mb-4" v-model="resonator.resonator_echo_sonata_3" :items="sonataNames"
          :label="$t('general.sonata')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_cost_3" :items="costs" :label="$t('general.echo_cost')"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_affix_3" :items="abbrs"
          :label="$t('general.main_affix')" variant="outlined" density="compact" hide-details>
        </v-select>
        <div class="d-flex flex-row mb-4">
          <span>{{ $t('general.nth_echo', { n: 4 }) }}</span>
        </div>
        <v-select class="mb-4" v-model="resonator.resonator_echo_sonata_4" :items="sonataNames"
          :label="$t('general.sonata')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_cost_4" :items="costs" :label="$t('general.echo_cost')"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_affix_4" :items="abbrs"
          :label="$t('general.main_affix')" variant="outlined" density="compact" hide-details>
        </v-select>
        <div class="d-flex flex-row mb-4">
          <span>{{ $t('general.nth_echo', { n: 5 }) }}</span>
        </div>
        <v-select class="mb-4" v-model="resonator.resonator_echo_sonata_5" :items="sonataNames"
          :label="$t('general.sonata')" variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_cost_5" :items="costs" :label="$t('general.echo_cost')"
          variant="outlined" density="compact" hide-details>
        </v-select>
        <v-select class="mb-4" v-model="resonator.resonator_echo_affix_5" :items="abbrs"
          :label="$t('general.main_affix')" variant="outlined" density="compact" hide-details>
        </v-select>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useTemplateStore } from '@/stores/calculation/template';

import { useTemplatesStore } from '@/stores/template'
import { useResonatorStore } from '@/stores/resonator';
import { useWeaponStore } from '@/stores/weapon';
import { useEchoStore } from '@/stores/echo';
import { useMonsterStore } from '@/stores/monster';

import { getResonatorBaseAttrs, getResonatorMainSkillBonus } from '@/ww/resonator';

const { t } = useI18n()

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

const templatesStore = useTemplatesStore()
const template = useTemplateStore(id)

const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames(spoiler)
const resonatorChains = resonatorStore.getChains()

const weaponStore = useWeaponStore()
const weaponNames = weaponStore.getNames(spoiler)
const weaponTunes = weaponStore.getTunes()

const echoStore = useEchoStore()
const echoNames = echoStore.getEchoNames()
const sonataNames = echoStore.getSonataNames()
const costs = echoStore.getCosts()
const abbrs = echoStore.getAbbrs()

const monsterStore = useMonsterStore()
const monsterItems = monsterStore.getMonsterItems()

function updateTemplateByTemplateIdItem(item: { hashed_id: string, id: string }) {
  if (!item) {
    return
  }
  const id = item.id
  if (id) {
    template.data.id = id
  }

  const hashedId = item.hashed_id
  if (hashedId) {
    template.data.hashed_id = hashedId
  }
}

function checkWeaponName(name: string) {
  if (weaponNames.includes(name)) {
    return true
  }
  return t('general.error')
}

function updateWeapon(i: number) {
  const weapon = template.data.calculation.resonators[i].weapon
  template.updateResonatorByCalculation(i)
  weapon.updateRowWeaponByName()
}
</script>

<style scoped lang="sass">
</style>