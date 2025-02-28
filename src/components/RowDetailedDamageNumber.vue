<template>
  <div v-if="getNumber(row.stack) > 0">
    <div v-if="getNumber(row.stack) === 1">
      <v-tooltip location="bottom" :text="row.id">
        <template v-slot:activator="{ props }">
          <span class="text-white" v-bind="props">{{ row.value }}</span>
        </template>
      </v-tooltip>
    </div>
    <div v-else>
      <v-tooltip location="bottom" :text="row.id">
        <template v-slot:activator="{ props }">
          <div class="d-flex flex-row text-white" v-bind="props">
            <span>({{ row.value }}</span>
            <span>×</span>
            <span>{{ row.stack }})</span>
          </div>
        </template>
      </v-tooltip>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RowBuff } from '@/ww/row/buff';
import { getNumber } from '@/ww/utils';

const props = defineProps({
  row: {
    type: Object as PropType<RowBuff>,
    required: true
  },
});
const row = props.row
</script>