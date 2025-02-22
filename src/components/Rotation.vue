<template>
  <v-container class="mx-1 bg-grey-darken-4">
    <div class="d-flex flex-column">
      <div v-for="resonatorRotation in rotation" class="d-flex flex-row justify-start py-2">
        <div class="d-flex flex-row px-4 my-2">
          <img class="resonator" :src="resonatorRotation.resonatorSrc" />
        </div>
        <div class="d-flex flex-column">
          <div class="d-flex flex-wrap">
            <v-tooltip location="bottom" v-for=" (action, i) in resonatorRotation.actions"
              :disabled="!action.skillID && !action.timeStart && !action.timeEnd">
              <v-col>
                <v-row>{{ $t('general.nth_row', { n: parseFloat(action.index0Based) + 1 }) }}</v-row>
                <v-row v-if="action.skillID">{{ $t('general.resonator_skill_id') }}: {{ action.skillID }}</v-row>
                <v-row v-if="action.timeStart">{{ $t('general.time_start') }}: {{ action.timeStart }}</v-row>
                <v-row v-if="action.timeEnd">{{ $t('general.time_end') }}: {{ action.timeEnd }}</v-row>
              </v-col>
              <template v-slot:activator="{ props }">
                <div :id="`rotation${action.index0Based}`" class="row d-flex flex-row align-center my-2"
                  :class="jump ? 'cursor-pointer' : ''" v-bind="props"
                  v-on:click="jumpToSection(goTo, `#${jump}${action.index0Based}`)">
                  <span :class="action.src ? 'mr-3' : ''">
                    {{ action.name }}
                    <sup v-if="action.supIndex">
                      {{ action.supIndex }}
                    </sup>
                  </span>
                  <img v-if="action.src" class="action" :src="action.src" />
                  <v-icon icon="mdi-menu-right" size="x-large"></v-icon>
                </div>
              </template>
            </v-tooltip>
          </div>
          <div class="d-flex flex-column">
            <div v-for="comment in resonatorRotation.comments"
              class="comment d-flex flex-row align-center my-2 text-grey-lighten-1">
              <span>
                <sup>{{ comment.i }}</sup>
                {{ comment.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { useGoTo } from 'vuetify'

import { jumpToSection } from "@/ww/utils"

const goTo = useGoTo()

const props = defineProps({
  rotation: {
    type: Object as PropType<Array<any>>,
    default: []
  },
  jump: {
    type: String,
    default: ""
  }
});
const rotation = props.rotation
const jump = props.jump
</script>

<style scoped lang="sass">
.resonator
  height: 48px
  width: 48px
.row
  height: 48px
.action
  height: 36px
.comment
  height: 24px
  font-size: 0.75rem
</style>