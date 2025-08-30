<template>
  <Doc :no-headers="true">
    <template v-if="weapon" v-slot:right>
      <div class="d-flex flex-column w-100">
        <div class="d-flex flex-row my-1">
          <h1>{{ $t(weapon.name) }}</h1>
        </div>
        <div class="d-flex flex-row my-1">
          <div class="mr-8">
            <img class="" :src="weapon.icon" />
          </div>
          <div class="d-flex flex-column w-33 mr-1">
            <v-data-table class="mb-8" disable-sort hide-default-footer>
              <template v-slot:body>
                <tr>
                  <td>{{ $t('general.id') }}</td>
                  <td>{{ weapon.id }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.name') }}</td>
                  <td>{{ weapon.name }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.rarity') }}</td>
                  <td>{{ weapon.rarity }}</td>
                </tr>
                <tr>
                  <td>{{ $t('general.type') }}</td>
                  <td>{{ weapon.type_zh_tw }}</td>
                </tr>
              </template>
            </v-data-table>
            <div class="d-flex flex-row my-1">
              <span>{{ $t(weapon.description) }}</span>
            </div>
            <div class="d-flex flex-row mt-8 mb-2">
              <h2>{{ $t(weapon.passive.name) }}</h2>
            </div>
            <div class="d-flex flex-row my-1">
              <span>{{ $t(weapon.passive.description) }}</span>
            </div>
          </div>
          <div class="w-33 mr-1">
            <v-data-table :headers="[]" disable-sort hide-default-footer :items-per-page="2">
              <template v-slot:body>
                <tr>
                  <td>{{ $t('general.level') }}</td>
                  <td>{{ $t('general.atk') }}</td>
                  <td>{{ $t(`general.${weapon.getThirdAttrKey()}`) }}</td>
                </tr>
                <tr v-for="attr in weapon.attrs">
                  <td>{{ attr.lv }}</td>
                  <td>{{ attr.atk }}</td>
                  <td>{{ attr[weapon.getThirdAttrKey()] }}</td>
                </tr>
              </template>
            </v-data-table>
          </div>
        </div>
      </div>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router'
import { useWeaponStore } from '@/stores/weapon';

const weaponStore = useWeaponStore()

const route = useRoute()
const weaponID = (route.params as { weapon_id: number }).weapon_id
const weapon = weaponStore.getInfoByNo(weaponID.toString())
</script>
