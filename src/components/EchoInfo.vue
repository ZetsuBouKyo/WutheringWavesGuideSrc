<template>
  <div class="d-flex flex-column w-100">
    <div class="d-flex flex-row my-1">
      <h1>{{ $t(info.name) }}</h1>
    </div>
    <div class="d-flex flex-row my-1">
      <img class="mr-8" :src="info.icon" />
      <v-data-table class="table w-33" disable-sort hide-default-footer>
        <template v-slot:body>
          <tr>
            <td>{{ $t('general.id') }}</td>
            <td>{{ info.id }}</td>
          </tr>
          <tr>
            <td>{{ $t('general.name') }}</td>
            <td>{{ info.name }}</td>
          </tr>
          <tr>
            <td>{{ $t('general.cost') }}</td>
            <td>{{ info.cost }}</td>
          </tr>
          <tr>
            <td>{{ $t('general.rarity') }}</td>
            <td>{{ info.intensity_zh_tw }}</td>
          </tr>
          <tr>
            <td>{{ $t('general.type') }}</td>
            <td>{{ info.type }}</td>
          </tr>
          <tr>
            <td>{{ $t('general.country') }}</td>
            <td>{{ info.place }}</td>
          </tr>
        </template>
      </v-data-table>
    </div>
    <div class="d-flex flex-row mt-16 mb-4">
      <h2>{{ $t('general.echo_skill') }}</h2>
    </div>
    <div class="d-flex flex-row my-1">
      <span>{{ $t(info.skill.description) }}</span>
    </div>
    <v-expansion-panels v-if="info.damage.length > 0">
      <v-expansion-panel>
        <v-expansion-panel-title>
          <span class="text-highlight font-weight-bold">
            {{ $t('general.detailed_skill_info') }}
          </span>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <v-data-table class="table w-33" disable-sort hide-default-footer>
            <template v-slot:body>
              <tr>
                <td>{{ $t('general.id') }}</td>
                <td>{{ $t('general.element') }}</td>
                <td>{{ $t('general.base_attr') }}</td>
                <td>{{ $t('general.skill_bonus_type') }}</td>
                <td>{{ $t('general.resonance_energy_regen') }}</td>
                <td>{{ $t('general.concerto_regen') }}</td>
              </tr>
              <tr v-for="damage in info.damage">
                <td>{{ damage.id }}</td>
                <td>{{ damage.element_zh_tw }}</td>
                <td>{{ damage.related_property_zh_tw }}</td>
                <td>{{ damage.type_zh_tw }}</td>
                <td>{{ damage.energy / 100 }}</td>
                <td>{{ damage.element_power / 100 }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
    <!-- Sonatas -->
    <div class="d-flex flex-row mt-16 mb-4">
      <h2>{{ $t('general.sonata') }}</h2>
    </div>
    <SonataInfo v-for="group in info.groups" :info="group" />
  </div>
</template>

<script lang="ts" setup>
import { EchoInfo } from '@/ww/echo';

const props = defineProps({
  info: {
    type: Object as PropType<EchoInfo>,
    default: new EchoInfo()
  },
});
console.log(props.info)
</script>

<style scoped lang="sass">
.table
  display: block
  overflow-x: auto
  white-space: nowrap
</style>