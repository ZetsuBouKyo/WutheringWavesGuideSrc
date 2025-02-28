<template>
  <div class="d-flex flex-row" :keys="rows.length">
    <div v-if="rows.length === 1" class="d-flex flex-row">
      <div v-if="is1" class="d-flex flex-row">
        <span>(</span>
        <span>1</span>
        <span>{{ operator }}</span>
      </div>
      <RowDetailedDamageNumber :row="rows[0]" />
      <span v-if="is1">)</span>
    </div>
    <div v-else class="d-flex flex-row">
      <div v-for="(row, i) in rows" class="d-flex flex-row">
        <div class="d-flex flex-row" :key="row.id">
          <div v-if="i === 0" class="d-flex flex-row">
            <span>(</span>
            <div v-if="is1" class="d-flex flex-row">
              <span>1</span>
              <span>{{ operator }}</span>
            </div>
          </div>
          <RowDetailedDamageNumber :row="row" />
          <span v-if="i >= 0 && i < (rows.length - 1)">{{ operator }}</span>
          <span v-if="i === (rows.length - 1)">)</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RowBuff } from '@/ww/row/buff';

const props = defineProps({
  rows: {
    type: Object as PropType<Array<RowBuff>>,
    required: true
  },
  is1: {
    type: Boolean,
    default: false
  },
  operator: {
    type: String,
    default: "+"
  }
});
const rows = props.rows
const is1 = props.is1
const operator = props.operator
</script>