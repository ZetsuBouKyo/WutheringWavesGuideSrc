<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.name" :label="$t('general.name')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.level" :label="$t('general.level')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.chain" :label="$t('general.resonator_chain')" variant="outlined"
        density="compact" hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <span>{{ $t('general.skill') }}</span>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.skill.id" :label="$t('general.resonator_skill_id')" variant="outlined"
        density="compact" hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.skill.dmg" :label="$t('general.skill_damage_ratio')" variant="outlined"
        density="compact" hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="resonator.data.skill.base_attr" :label="$t('general.base_attr')" variant="outlined"
        density="compact" hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-select v-model="resonator.data.skill.bonus_types" :label="$t('general.skill_bonus_type')" variant="outlined"
        density="compact" hide-details readonly chips multiple>
      </v-select>
    </div>
    <div v-if="resonator.data.stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="resonator.data.stat_bonus.getKeys().length">
      <div class="d-flex flex-row mb-4">
        <span>{{ $t('general.stat_bonus') }}</span>
      </div>
      <div v-for="key in resonator.data.stat_bonus.getKeys()" class="d-flex flex-row mb-4" :key="key">
        <v-text-field v-model="resonator.data.stat_bonus[key]" :label="$t(`general.${key}`)" variant="outlined"
          density="compact" hide-details readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
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