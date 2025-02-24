<template>
  <div class="d-flex flex-column mx-1 w-100">
    <v-btn class="ml-auto mb-2" v-on:click="saveImage">{{ $t('general.download_image')
      }}</v-btn>
    <div ref="rotationDom" class="d-flex flex-column bg-grey-darken-4 w-100">
      <div v-for="resonatorRotation in rotation" class="d-flex flex-row justify-start py-2 w-100">
        <div class="d-flex flex-row px-4 my-2">
          <img class="resonator" :src="resonatorRotation.resonatorSrc" />
        </div>
        <div class="d-flex flex-column w-100">
          <div class="d-flex flex-wrap w-100">
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
                  <span :class="action.supIndex ? '' : 'mr-3'">
                    {{ action.name }}
                  </span>
                  <sup v-if="action.supIndex" :class="action.src ? 'ml-1 mr-3' : ''">
                    {{ action.supIndex }}
                  </sup>
                  <img v-if="action.src" class="action" :src="action.src" />
                  <v-icon icon="mdi-menu-right" size="x-large"></v-icon>
                </div>
              </template>
            </v-tooltip>
          </div>
          <div class="d-flex flex-column w-100">
            <div v-for="comment in resonatorRotation.comments"
              class="comment d-flex flex-row align-center my-2 text-grey-lighten-1 w-100">
              <span class="w-100">
                <sup>{{ comment.i }}</sup>
                {{ comment.text }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useGoTo } from 'vuetify'
import { useI18n } from 'vue-i18n'

import { jumpToSection, saveDomToImage } from "@/ww/utils"

const goTo = useGoTo()
const { t } = useI18n()

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

const rotationDom = ref<HTMLElement | null>(null);
const imageFname = t('general.rotation')

async function saveImage() {
  await saveDomToImage(rotationDom, imageFname)
}
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