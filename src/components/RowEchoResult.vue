<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row">
      <v-text-field v-model="rowEchoesStore.name1" :label="$t('general.echo_name_1')" readonly>
      </v-text-field>
    </div>
    <div v-for="sonata in rowEchoesStore.sonatas" class="d-flex flex-row">
      <v-text-field :title="sonata" :label="$t('general.echo_name_1')" readonly>
      </v-text-field>
    </div>
    <!-- Main affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div v-for="key in StatBuffEnum" class="d-flex flex-row" :key="key">
      <div v-if="Number(rowEchoesStore.main_affix[key]) > 0" class="d-flex flex-column w-100">
        <v-text-field v-model="rowEchoesStore.main_affix[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
    <!-- Sub affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in StatBuffEnum" class="d-flex flex-row" :key="key">
      <div v-if="Number(rowEchoesStore.sub_affix[key]) > 0" class="d-flex flex-column w-100">
        <v-text-field v-model="rowEchoesStore.sub_affix[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { StatBuffEnum } from '@/types/buff';

import { useRowEchoesStore } from '@/stores/calculation/echoes';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const rowEchoesStore = useRowEchoesStore(id)
</script>