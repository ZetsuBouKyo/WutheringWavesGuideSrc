<template>
  <div v-if="info.name" class="d-flex flex-column w-100">
    <div :id="`sonata${info.id}`" class="d-flex flex-row my-2 align-center">
      <img :src="info.icon" class="mr-2" height="24px" />
      <span class="font-weight-bold">{{ $t(info.name) }}</span>
    </div>
    <v-data-table class="table" disable-sort hide-default-footer>
      <template v-slot:body>
        <tr v-for="setKey in Object.keys(info.set)">
          <td class="title">{{ setKey }}</td>
          <td>{{ info.set[setKey].description }}</td>
        </tr>
      </template>
    </v-data-table>
  </div>
</template>

<script lang="ts" setup>
import { SonataInfo } from '@/stores/sonata';

const props = defineProps({
  info: {
    type: Object as PropType<SonataInfo>,
    default: {}
  },
});
console.log(props.info)
</script>

<style scoped lang="sass">
.title
  width: 100px
.table
  display: block
  overflow-x: auto
  white-space: nowrap
</style>