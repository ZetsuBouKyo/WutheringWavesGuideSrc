<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.name" :label="$t('general.name')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.level" :label="$t('general.level')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.chain" :label="$t('general.resonator_chain')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.skill.id" :label="$t('general.resonator_skill_id')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.skill.dmg" :label="$t('general.skill_damage_ratio')" readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.base_attr" :label="$t('general.base_attr')" readonly></v-text-field>
    </div>
    <div class="d-flex flex-row">
      <v-text-field v-model="resonator.data.main_skill_bonus" :label="$t('general.main_skill_bonus')"
        readonly></v-text-field>
    </div>
    <div v-if="resonator.data.stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="resonator.data.stat_bonus.getKeys().length">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('general.stat_bonus') }}</span>
      </div>
      <div v-for="key in resonator.data.stat_bonus.getKeys()" class="d-flex flex-row" :key="key">
        <v-text-field v-model="resonator.data.stat_bonus[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StatBuffEnum } from '@/types/buff';

import { useRowResonatorStore } from '@/stores/calculation/resonator';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const resonator = useRowResonatorStore(id)
</script>