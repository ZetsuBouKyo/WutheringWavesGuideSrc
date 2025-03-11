<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="weapon.data.name" :label="$t('general.name')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="weapon.data.level" :label="$t('general.level')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="weapon.data.tune" :label="$t('general.tune')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="weapon.data.atk" :label="$t('general.atk')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div v-if="weapon.data.stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="weapon.data.stat_bonus.getKeys().length">
      <div class="d-flex flex-row mb-4">
        <span>{{ $t('general.stat_bonus') }}</span>
      </div>
      <div v-for="key in weapon.data.stat_bonus.getKeys()" class="d-flex flex-row mb-4" :key="key">
        <v-text-field v-model="weapon.data.stat_bonus[key]" :label="$t(`general.${key}`)" variant="outlined"
          density="compact" hide-details readonly>
        </v-text-field>
      </div>
    </div>
    <div v-if="weapon.data.passive_stat_bonus.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="weapon.data.passive_stat_bonus.getKeys().length">
      <div class="d-flex flex-row mb-4">
        <span>{{ $t('general.passive_stat_bonus') }}</span>
      </div>
      <div v-for="key in weapon.data.passive_stat_bonus.getKeys()" class="d-flex flex-row mb-4" :key="key">
        <v-text-field v-model="weapon.data.passive_stat_bonus[key]" :label="$t(`general.${key}`)" variant="outlined"
          density="compact" hide-details readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowWeaponStore } from '@/stores/calculation/weapon';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const weapon = useRowWeaponStore(id)
</script>