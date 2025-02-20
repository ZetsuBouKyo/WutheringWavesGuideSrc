<template>
  <v-container>
    <v-row no-gutters>
      <v-col v-if="!noHeaders" :class="noHeaders ? '' : 'left position-fixed'">
        <slot name="left"></slot>
      </v-col>
      <v-col :class="noHeaders ? '' : 'right'">
        <slot name="right"></slot>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const props = defineProps({
  noHeaders: {
    type: Boolean,
    default: false
  },
});
const noHeaders = props.noHeaders
</script>

<style scoped lang="sass">
  .left
    width: 20%
  .right
    width: 70%
    margin-left: 33%
</style>