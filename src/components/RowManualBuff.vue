<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.attr') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.hp" :label="$t('general.hp')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.hp_p" :label="$t('general.hp_p')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.atk" :label="$t('general.atk')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.atk_p" :label="$t('general.atk_p')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.def" :label="$t('general.def')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.def_p" :label="$t('general.def_p')" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class=" d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.skill_dmg') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.skill_dmg_addition"
        :label="`${$t('general.skill_damage_ratio')} (${$t('general.percentage')})`" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.magnifier') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.magnifier" :label="$t('general.percentage')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.amplifier') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.amplifier" :label="$t('general.percentage')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.bonus') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.bonus" :label="$t('general.percentage')" variant="outlined"
        density="compact" hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.crit') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.crit_rate"
        :label="`${$t('general.crit_rate')} (${$t('general.percentage')})`" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.crit_dmg"
        :label="`${$t('general.crit_dmg')} (${$t('general.percentage')})`" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.def') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.ignore_def"
        :label="`${$t('general.ignore_def')} (${$t('general.percentage')})`" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('calculation.region.res') }}</span>
    </div>
    <div class=" d-flex flex-row mb-4">
      <v-text-field v-model="buffs.data.manual.reduce_res"
        :label="`${$t('general.reduce_res')} (${$t('general.percentage')})`" variant="outlined" density="compact"
        hide-details>
      </v-text-field>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowBuffsStore } from '@/stores/calculation/buffs';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const buffs = useRowBuffsStore(id)
</script>