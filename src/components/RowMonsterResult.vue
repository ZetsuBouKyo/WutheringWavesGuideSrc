<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="monster.data.name" :label="$t('general.name')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="monster.data.level" :label="$t('general.level')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div class="d-flex flex-row mb-4">
      <v-text-field v-model="monster.data.def" :label="$t('general.def')" variant="outlined" density="compact"
        hide-details readonly>
      </v-text-field>
    </div>
    <div v-for="key in ResEnum" class="d-flex flex-row" :key="key">
      <div v-if="monster[key]" class="d-flex flex-column w-100 mb-4">
        <v-text-field v-model="monster[key]" :label="$t(`general.${key}`)" variant="outlined" density="compact"
          hide-details readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowMonsterStore } from '@/stores/calculation/monster';

import { ResEnum } from '@/types/res';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const monster = useRowMonsterStore(id)
</script>