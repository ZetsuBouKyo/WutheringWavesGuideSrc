<template>
  <div class="d-flex flex-column ">
    <div class="d-flex flex-row mb-2">
      <v-tooltip location="bottom" :text="$t('rotation.width')">
        <template v-slot:activator="{ props }">
          <div class="d-flex flex-row ml-auto mr-2" v-bind="props">
            <v-text-field v-model="width" width="200px" :label="$t('general.output_image_width')" variant="outlined"
              density="compact" hide-details />
          </div>
        </template>
      </v-tooltip>
      <div class="d-flex flex-row">
        <v-btn class="ml-auto" v-on:click="saveImage">
          {{ $t('general.download_image') }}
        </v-btn>
      </div>
    </div>
    <div ref="image" :style="`width: ${width};`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { saveDomToImage } from "@/ww/utils"

const props = defineProps({
  fname: {
    type: String,
    default: "download"
  },
  defaultWidth: {
    type: String,
    default: "100%",
  }
});

const image = ref<HTMLElement | null>(null);
const width = ref<string>(props.defaultWidth)

async function saveImage() {
  if (image) {
    image.value?.classList.add("bg-background")
    await saveDomToImage(image, props.fname)
  }
}
</script>

<style scoped lang="sass">
</style>