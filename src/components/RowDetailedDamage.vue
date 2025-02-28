<template>
  <div v-if="calculation" class="d-flex flex-column w-100">
    <div class="d-flex flex-row mb-2">
      <span>{{ $t('general.detailed_damage') }}</span>
    </div>
    <v-data-table class="table" disable-sort hide-default-footer :items-per-page="8" :key="calculation.id">
      <tbody>
        <tr>
          <td>{{ $t("calculation.region.attr") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span
                v-if="(calculation.result.regions.base_attr.length + calculation.result.regions.base_attr_p.length + calculation.result.regions.base_attr_a.length) > 1">
                (
              </span>
              <RowDetailedDamageNumbers :rows="calculation.result.regions.base_attr" />
              <div class="d-flex flex-row" v-if="calculation.result.regions.base_attr_p.length > 0">
                <span>×</span>
                <span>(</span>
                <span>1</span>
                <span>+</span>
                <RowDetailedDamageNumbers :rows="calculation.result.regions.base_attr_p" />
                <span>)</span>
              </div>
              <span v-if="calculation.result.regions.base_attr_a.length > 0">+</span>
              <RowDetailedDamageNumbers :rows="calculation.result.regions.base_attr_a" />
              <span
                v-if="(calculation.result.regions.base_attr.length + calculation.result.regions.base_attr_p.length + calculation.result.regions.base_attr_a.length) > 1">
                )
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.skill_dmg") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span>×</span>
              <RowDetailedDamageNumbers :rows="calculation.result.regions.skill_dmg_addition" />
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.magnifier") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span>×</span>
              <RowDetailedDamageNumbers v-if="calculation.result.regions.magnifier.length > 0"
                :rows="calculation.result.regions.magnifier" :is1="true" />
              <span v-else>1</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.amplifier") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span>×</span>
              <RowDetailedDamageNumbers v-if="calculation.result.regions.amplifier.length > 0"
                :rows="calculation.result.regions.amplifier" :is1="true" />
              <span v-else>1</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.bonus") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span>×</span>
              <RowDetailedDamageNumbers v-if="calculation.result.regions.bonus.length > 0"
                :rows="calculation.result.regions.bonus" :is1="true" />
              <span v-else>1</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.crit") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div class="w-100 d-flex flex-row">
              <span>×</span>
              <RowDetailedDamageNumbers v-if="calculation.result.regions.crit_dmg.length > 0"
                :rows="calculation.result.regions.crit_dmg" />
              <span v-else>1.5</span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.def") }}</td>
          <td class="w-100 text-grey-darken-1"> ×
            <div class="frac">
              <div class="d-flex flex-row justify-center">
                <span>(</span>
                <span>800</span>
                <span>+</span>
                <span>8 </span>
                <span>×</span>
                <v-tooltip location="bottom" :text="$t('general.resonator_level')">
                  <template v-slot:activator="{ props }">
                    <span class="text-white" v-bind="props"> {{ calculation.data.resonator.level }}</span>
                  </template>
                </v-tooltip>
                <span>)</span>
              </div>
              <span class="symbol">/</span>
              <span class="bottom">
                <div class="d-flex flex-row">
                  <span>(</span>
                  <span>800</span>
                  <span>+</span>
                  <span>8</span>
                  <span>×</span>
                  <v-tooltip location="bottom" :text="$t('general.resonator_level')">
                    <template v-slot:activator="{ props }">
                      <span class="text-white" v-bind="props"> {{ calculation.data.resonator.level }}</span>
                    </template>
                  </v-tooltip>
                  <span>+</span>
                  <span>(</span>
                  <span>792</span>
                  <span>+</span>
                  <span>(</span>
                  <span>8</span>
                  <span>×</span>
                  <v-tooltip location="bottom" :text="$t('general.monster_level')">
                    <template v-slot:activator="{ props }">
                      <span class="text-white" v-bind="props"> {{ calculation.data.monster.level }}</span>
                    </template>
                  </v-tooltip>
                  <span>)</span>
                  <span>)</span>
                  <div v-if="calculation.result.regions.reduce_res.length > 0" class="d-flex flex-row">
                    <span>×</span>
                    <RowDetailedDamageNumbers :rows="calculation.result.regions.reduce_res" :is1="true"
                      :operator="'–'" />
                  </div>
                  <span>)</span>
                </div>
              </span>
            </div>
          </td>
        </tr>
        <tr>
          <td>{{ $t("calculation.region.res") }}</td>
          <td class="w-100 text-grey-darken-1">
            <div v-if="calculation.getFinalMonsterRes() < 0.8 && calculation.getFinalMonsterRes() >= 0"
              class="d-flex flex-row">
              <span>1</span>
              <span>–</span>
              <RowDetailedDamageNumbers v-if="calculation.result.regions.reduce_res.length > 0"
                :rows="calculation.result.regions.reduce_res" :operator="'–'" />
            </div>
            <div v-else-if="calculation.getFinalMonsterRes() < 0" class="d-flex flex-row align-center">
              <span>1</span>
              <span>–</span>
              <div class="frac">
                <div class="d-flex flex-row justify-center">
                  <span>(</span>
                  <span>)</span>
                </div>
                <span class="symbol">/</span>
                <span class="bottom">
                  <div class="d-flex flex-row justify-center">
                    <span>2</span>
                  </div>
                </span>
              </div>
            </div>
          </td>
        </tr>
      </tbody>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { RowCalculation } from '@/ww/row';
import { Tooltip } from 'vuetify/directives';

const props = defineProps({
  calculation: {
    type: Object as PropType<RowCalculation | any>,
    required: true
  },
});

const calculation = props.calculation
</script>

<style scoped lang="sass">
::v-deep(table span)
  margin: 0px 1px
.table
  display: block
  overflow-x: auto
  white-space: nowrap
.frac
  display: inline-block
  position: relative
  vertical-align: middle
  letter-spacing: 0.001em
  text-align: center
.frac > span
  display: block
  padding: 0.1em
.frac span.bottom
  border-top: thin solid rgb(240, 240, 240)
.frac span.symbol
  display: none
</style>