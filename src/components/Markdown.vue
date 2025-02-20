<template>
  <Doc :noHeaders="noHeaders">
    <template v-slot:left v-if="!noHeaders"></template>
    <template v-slot:right>
      <v-conainer>
        <div class="markdown" v-html="m"></div>
      </v-conainer>
    </template>
  </Doc>
</template>

<script lang="ts" setup>
import { marked } from 'marked';
import { gfmHeadingId, getHeadingList } from "marked-gfm-heading-id";

import { markdown } from '@/ww/db';

const props = defineProps({
  path: {
    type: String,
    default: ""
  },
  noHeaders: {
    type: Boolean,
    default: false
  },
});
let path: any = props.path
const noHeaders = props.noHeaders

let m: any = ""
if (!path) {
  const route = useRoute();
  path = route.meta.path
}

if (path) {
  const options = {
    prefix: "wwg-",
  };

  const doc = markdown.getDoc(path)
  marked.use(gfmHeadingId(options));
  m = marked(doc);
  console.log(getHeadingList())
}
</script>

<style scoped lang="sass">
.markdown *
  padding: revert
  margin: revert
::v-deep(.markdown table)
  width: 100%
  display: block
  overflow-x: auto
  white-space: nowrap
  margin: 1px
  border-spacing: 0
  font-size: 0.875rem
::v-deep(.markdown table thead tr)
  height: 56px
  font-weight: 500
::v-deep(.markdown th)
  width: auto
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))
  padding: 0 16px
  text-align: start
  background: rgb(var(--v-theme-surface))
::v-deep(.markdown td)
  width: auto
  border-bottom: thin solid rgba(var(--v-border-color), var(--v-border-opacity))
  padding: 0 16px
  text-align: start
  background: rgb(var(--v-theme-surface))
::v-deep(.markdown tr)
  height: 52px
</style>
