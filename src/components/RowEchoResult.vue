<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row">
      <v-text-field v-model="echoes.data.name1" :label="$t('general.echo_name_1')" readonly>
      </v-text-field>
    </div>
    <div v-for="(sonata, i) in echoes.data.sonatas" class="d-flex flex-row" :key="echoes.data.sonatas.length">
      <v-text-field :model-value="sonata" :label="$t('general.nth_sonata', { n: i + 1 })" readonly>
      </v-text-field>
    </div>
    <!-- Main affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.main_affix') }}</span>
    </div>
    <div v-for="key in StatBuffEnum" class="d-flex flex-row" :key="key">
      <div v-if="Number(echoes.data.main_affix[key]) > 0" class="d-flex flex-column w-100">
        <v-text-field v-model="echoes.data.main_affix[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
    <!-- Sub affixes -->
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.sub_affix') }}</span>
    </div>
    <div v-for="key in StatBuffEnum" class="d-flex flex-row" :key="key">
      <div v-if="Number(echoes.data.sub_affix[key]) > 0" class="d-flex flex-column w-100">
        <v-text-field v-model="echoes.data.sub_affix[key]" :label="$t(`general.${key}`)" readonly>
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

const echoes = useRowEchoesStore(id)
</script>