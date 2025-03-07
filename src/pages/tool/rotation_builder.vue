<template>
  <Explorer>
    <v-dialog v-if="currentIndex !== undefined" v-model="insertAboveDialog" width="auto">
      <v-card min-width="400" :title="$t('general.insert_above_at_n', { n: currentIndex + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <v-text-field v-model="insertAboveRow" :label="$t('general.row')" placeholder="0">
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertAboveDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn v-on:click="insertAbove">
                {{ $t('general.confirm') }}
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-if="currentIndex !== undefined" v-model="insertBelowDialog" width="auto">
      <v-card min-width="400" :title="$t('general.insert_below_at_n', { n: currentIndex + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <v-text-field v-model="insertBelowRow" :label="$t('general.row')" placeholder="0">
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertBelowDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn v-on:click="insertBelow">
                {{ $t('general.confirm') }}
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-model="insertBottomDialog" width="auto">
      <v-card min-width="400" :title="$t('general.insert_bottom')">
        <v-container>
          <div class="d-flex flex-column">
            <v-text-field v-model="insertBottomRow" :label="$t('general.row')" placeholder="0">
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertBottomDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn v-on:click="insertBottom">
                {{ $t('general.confirm') }}
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-if="commentId !== undefined" v-model="commentDialog" width="auto">
      <v-card min-width="400" :title="$t('general.nth_row_comment', { n: commentId + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <v-textarea v-model="comment" />
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="commentDialog = false;">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn v-on:click="editComment">
                {{ $t('general.confirm') }}
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-container class="mb-12">
      <div class="container d-flex flex-column">
        <div class="d-flex flex-row ml-auto mb-2">
          <v-file-input max-width="200" min-width="200" :label="$t('general.load_file')" class="mr-2" accept=".json"
            variant="outlined" density="compact" @change="loadData">
          </v-file-input>
          <v-btn v-if="countSelectedRows() > 0" class="mr-2" v-on:click="deleteRows">
            {{ $t('general.delete') }}
          </v-btn>
          <v-btn v-if="currentIndex !== undefined" class="mr-2" v-on:click="insertAboveDialog = true">
            {{ $t('general.insert_above') }}
          </v-btn>
          <v-btn v-if="currentIndex !== undefined" class="mr-2" v-on:click="insertBelowDialog = true">
            {{ $t('general.insert_below') }}
          </v-btn>
          <v-btn class="mr-2" v-on:click="insertBottomDialog = true">
            {{ $t('general.insert_bottom') }}
          </v-btn>
          <v-btn v-on:click="saveActionsToJson">
            {{ $t('general.download_json') }}
          </v-btn>
        </div>
        <v-data-table class="table mb-2" :headers="headers" :items="actions" :items-per-page="actions.length"
          show-select v-model:selected="selectedItems" disable-sort hide-default-footer>
          <template v-slot:item.id="{ item }">
            {{ $t('general.nth_row', { n: item.id + 1 }) }}
          </template>
          <template v-slot:header.data-table-select>
            <v-checkbox-btn v-model="allSelected" color="primary" @update:model-value="selectAll()"></v-checkbox-btn>
          </template>
          <template v-slot:item.data-table-select="{ item }">
            <v-checkbox-btn v-model="item.selected" @update:model-value="selectRow(item)"></v-checkbox-btn>
          </template>
          <template v-slot:item.resonator_name="{ item }">
            <v-combobox v-model="item.resonator_name" :items="resonatorNames" variant="outlined" width="180px"
              density="compact" hide-details></v-combobox>
          </template>
          <template v-slot:item.action="{ item }">
            <v-combobox v-model="item.action" :items="getActions()" variant="outlined" width="180px" density="compact"
              hide-details></v-combobox>
          </template>
          <template v-slot:item.tools="{ item }">
            <v-icon class="me-2" size="small" v-on:click="commentDialog = true; commentId = item.id">
              mdi-pencil
            </v-icon>
          </template>
        </v-data-table>
        <WRotation :rotation="r" :key="JSON.stringify(actions)" />
      </div>
    </v-container>
  </Explorer>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import WRotation from '@/components/Rotation.vue';

import { useResonatorStore } from '@/stores/resonator';

import { getActions, getRotation } from "@/ww/rotation"
import { saveJson } from '@/ww/utils';

const { t } = useI18n()

const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const resonatorStore = useResonatorStore()
const resonatorNames = resonatorStore.getNames(spoiler)

const currentIndex = ref<number | undefined>(undefined)
const selectedItems = ref([]);
const allSelected = ref<boolean>(false)
const r = ref<Array<any>>([])

const insertAboveDialog = ref<boolean>(false)
const insertAboveRow = ref<number | undefined>(undefined)

const insertBelowDialog = ref<boolean>(false)
const insertBelowRow = ref<number | undefined>(undefined)

const insertBottomDialog = ref<boolean>(false)
const insertBottomRow = ref<number | undefined>(undefined)

const comment = ref<string>("")
const commentDialog = ref<boolean>(false)
const commentId = ref<number | undefined>(undefined)

const headers = [
  { title: t('general.row'), key: 'id', width: "100px" },
  { title: t('general.resonator'), key: 'resonator_name', width: "200px" },
  { title: t('general.action'), key: 'action', width: "200px" },
  { title: '', key: 'tools' },
]

const actions = ref([
  {
    id: 0,
    resonator_name: "",
    action: "",
    selected: false,
    comment: "",
  },
])

function rearrange() {
  actions.value.forEach((action: any, i: number) => {
    action.id = i
  })
}

function selectAll() {
  let s: boolean
  if (!allSelected.value) {
    s = false
  } else {
    s = true
  }
  actions.value.forEach((action: any) => {
    action.selected = s
  })
  currentIndex.value = undefined
}

function countSelectedRows() {
  let i = 0
  actions.value.forEach((action: any) => {
    if (action.selected) {
      i += 1
    }
  })
  return i
}

function selectRow(item: any) {
  const selected: boolean = item.selected
  if (selected) {
    currentIndex.value = item.id
  }
  if (!selected && item.id === currentIndex.value) {
    currentIndex.value = undefined
  }
  allSelected.value = false
}

function editComment() {
  const action = actions.value[commentId.value as number]
  if (action.id !== commentId.value) {
    return
  }
  action.comment = comment.value.toString()
  commentDialog.value = false
  comment.value = ""
}

function _insert(i: number, n: number) {
  const newRows: Array<any> = []
  for (let j = 0; j < n; j++) {
    newRows.push({
      id: 0,
      resonator_name: "",
      action: "",
      selected: false,
      comment: "",
    })
  }

  const rows = [...actions.value.slice(0, i), ...newRows, ...actions.value.slice(i)]
  actions.value = rows
  rearrange()
}

function insertAbove() {
  const i: number = Number(currentIndex.value)
  if (isNaN(i)) {
    return
  }
  const n: number = Number(insertAboveRow.value)
  if (isNaN(n)) {
    return
  }
  _insert(i, n)
  insertAboveDialog.value = false
  insertAboveRow.value = undefined
}

function insertBelow() {
  let i: number = Number(currentIndex.value)
  if (isNaN(i)) {
    return
  }
  const n: number = Number(insertBelowRow.value)
  if (isNaN(n)) {
    return
  }
  i += 1
  _insert(i, n)
  insertBelowDialog.value = false
  insertBelowRow.value = undefined
}

function insertBottom() {
  rearrange()
  const i = actions.value.length
  const j = i + Number(insertBottomRow.value)
  if (typeof j !== "number") {
    return
  }
  for (let n = i; n < j; n++) {
    actions.value.push({
      id: n,
      resonator_name: "",
      action: "",
      selected: false,
      comment: "",
    })
  }
  insertBottomDialog.value = false
  insertBottomRow.value = undefined
}

function deleteRows() {
  const rows: Array<any> = []
  actions.value.forEach((action: any, i: number) => {
    if (!action.selected) {
      rows.push(action)
    }
  })
  actions.value = rows
  rearrange()
}

function saveActionsToJson() {
  saveJson(actions.value)
}

const fileName = ref<string>("");

function loadData(event: Event) {
  const input = event.target as HTMLInputElement;
  if (!input.files || input.files.length === 0) return;

  const file = input.files[0];
  fileName.value = file.name;

  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      actions.value = JSON.parse(e.target?.result as string);
    } catch (error) {
      console.error("Invalid JSON file", error);
    }
  };

  reader.readAsText(file);
};

watch(() => { return JSON.stringify(actions.value) }, () => {
  const rows: Array<any> = []
  actions.value.forEach((action: any) => {
    if (action.resonator_name && action.action) {
      rows.push(action)
    }
  })
  if (rows.length > 0) {
    r.value = getRotation(rows as any)
  } else if (rows.length === 0) {
    r.value = []
  }
})
</script>

<style scoped lang="sass">
.container
  margin-top: 118px
.table
  display: block
  overflow-x: auto
  white-space: nowrap
</style>