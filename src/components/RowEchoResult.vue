<template>
  <div class="d-flex flex-column w-100 mr-8">
    <div class="d-flex flex-row">
      <v-text-field v-model="echoesSummary.name1" :label="$t('general.echo_name_1')" readonly>
      </v-text-field>
    </div>
    <div v-for="(sonata, i) in echoesSummary.sonatas" class="d-flex flex-row" :key="echoesSummary.sonatas.length">
      <v-text-field :model-value="sonata" :label="$t('general.nth_sonata', { n: i + 1 })" readonly>
      </v-text-field>
    </div>
    <!-- Main affixes -->
    <div v-if="echoesSummary.main_affix.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="echoesSummary.main_affix.getKeys().length">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('general.main_affix') }}</span>
      </div>
      <div v-for="key in echoesSummary.main_affix.getKeys()" class="d-flex flex-column w-100" :key="key">
        <v-text-field v-model="echoesSummary.main_affix[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
    <!-- Sub affixes -->
    <div v-if="echoesSummary.sub_affix.getKeys().length > 0" class="d-flex flex-column w-100"
      :key="echoesSummary.sub_affix.getKeys().length">
      <div class="d-flex flex-row mb-2">
        <span>{{ $t('general.sub_affix') }}</span>
      </div>
      <div v-for="key in echoesSummary.sub_affix.getKeys()" class="d-flex flex-column w-100" :key="key">
        <v-text-field v-model="echoesSummary.sub_affix[key]" :label="$t(`general.${key}`)" readonly>
        </v-text-field>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRowEchoesStore } from '@/stores/calculation/echoes';

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});

const id = props.id

const echoes = useRowEchoesStore(id)
const echoesSummary = echoes.getSummary()
</script>