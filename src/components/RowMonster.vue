<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row">
      <v-select v-model="monster.name" :items="monsterItems" :label="$t('general.name')"
        @update:modelValue="updateRowMonsterByItem"></v-select>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowMonsterStore } from '@/stores/calculation/monster';

import { useMonsterStore } from '@/stores/monster';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const monsterStore = useMonsterStore()
const monsterItems = monsterStore.getMonsterItems()

const monster = useRowMonsterStore(id)

function updateRowMonsterByItem(item: any) {
  monster.updateByMonsterItem(item)
}
</script>