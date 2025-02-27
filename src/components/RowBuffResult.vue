<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-column">
      <div class=" d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.attr') }}</span>
      </div>
      <div class="d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.hp" :label="$t('general.hp')"></v-text-field>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.hp_p" :label="$t('general.hp_p')"></v-text-field>
      </div>
      <div class="d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.atk" :label="$t('general.atk')"></v-text-field>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.atk_p" :label="$t('general.atk_p')"></v-text-field>
      </div>
      <div class="d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.def" :label="$t('general.def')"></v-text-field>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.def_p" :label="$t('general.def_p')"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class=" d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.skill_dmg') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.skill_dmg_addition"
          :label="`${$t('general.skill_damage_ratio')} (${$t('general.percentage')})`"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.magnifier') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.magnifier" :label="$t('general.percentage')"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.amplifier') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.amplifier" :label="$t('general.percentage')"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.bonus') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.bonus" :label="$t('general.percentage')"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.crit') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.crit_rate"
          :label="`${$t('general.crit_rate')} (${$t('general.percentage')})`"></v-text-field>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.crit_dmg"
          :label="`${$t('general.crit_dmg')} (${$t('general.percentage')})`"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.def') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.ignore_def"
          :label="`${$t('general.ignore_def')} (${$t('general.percentage')})`"></v-text-field>
      </div>
    </div>
    <div class="d-flex flex-column">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('calculation.region.res') }}</span>
      </div>
      <div class=" d-flex flex-row">
        <v-text-field v-model="buffs.data.summary.reduce_res"
          :label="`${$t('general.reduce_res')} (${$t('general.percentage')})`"></v-text-field>
      </div>
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