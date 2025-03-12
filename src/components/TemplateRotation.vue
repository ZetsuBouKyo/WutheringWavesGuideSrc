<template>
  <div class="d-flex flex-column w-100">
    <v-dialog v-if="currentIndex !== undefined" v-model="insertAboveDialog" width="auto">
      <v-card min-width="400" :title="$t('general.insert_above_at_n', { n: currentIndex + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <v-text-field class="mb-4" v-model="insertAboveRow" :label="$t('general.row')" placeholder="0"
              variant="outlined" density="compact" hide-details>
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertAboveDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn
                v-on:click="insertAbove(templateRows, currentIndex, insertAboveRow); insertAboveDialog = false; insertAboveRow = undefined">
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
            <v-text-field class="mb-4" v-model="insertBelowRow" :label="$t('general.row')" placeholder="0"
              variant="outlined" density="compact" hide-details>
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertBelowDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn
                v-on:click="insertBelow(templateRows, currentIndex, insertBelowRow); insertBelowDialog = false; insertBelowRow = undefined">
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
            <v-text-field class="mb-4" v-model="insertBottomRow" :label="$t('general.row')" placeholder="0"
              variant="outlined" density="compact" hide-details>
            </v-text-field>
            <div class="d-flex flex-row ml-auto">
              <v-btn class="mr-2" v-on:click="insertBottomDialog = false">
                {{ $t('general.cancel') }}
              </v-btn>
              <v-btn
                v-on:click="insertBottom(templateRows, insertBottomRow); insertBottomDialog = false; insertBottomRow = undefined">
                {{ $t('general.confirm') }}
              </v-btn>
            </div>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-if="buffId !== undefined" v-model="buffDialog" width="auto">
      <v-card min-width="1280" :title="$t('general.nth_buff', { n: buffId + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <div class="d-flex flex-row mb-2">

            </div>
            <v-data-table class="table mb-2" :headers="buffsHeaders" :items="templateRows[buffId].buffs"
              items-per-page="10" show-select v-model:selected="selectedItems" disable-sort>
              <template v-slot:header.data-table-select>
                <!-- <v-checkbox-btn v-model="allSelected" color="primary" @update:model-value="selectAll()"
                  variant="outlined" density="compact" hide-details>
                </v-checkbox-btn> -->
              </template>
              <template v-slot:item.data-table-select="{ item }">
                <v-checkbox-btn v-model="item.selected" @update:model-value="selectRow(item)" variant="outlined"
                  density="compact" hide-details>
                </v-checkbox-btn>
              </template>
              <template v-slot:item.id="{ item }">
                <span>
                  {{ $t('general.nth_row', { n: item.id + 1 }) }}
                </span>
              </template>
              <template v-slot:item.name="{ item }">
                <v-tooltip location="bottom" :text="item.name">
                  <template v-slot:activator="{ props }">
                    <v-autocomplete v-bind="props" v-model="item.name" :items="buffs" item-value="title"
                      variant="outlined" width="300px" density="compact" hide-details>
                      <template v-slot:item="{ props, item }">
                        <v-tooltip location="end">
                          <div>comment</div>
                          <template v-slot:activator="{ props: tooltipProps }">
                            <v-list-item v-bind="{ ...props, ...tooltipProps }"></v-list-item>
                          </template>
                        </v-tooltip>
                      </template>
                    </v-autocomplete>
                  </template>
                </v-tooltip>
              </template>
              <template v-slot:item.type="{ item }">
                <v-combobox v-model="item.type" :items="getBuffTypes()" variant="outlined" width="180px"
                  density="compact" hide-details>
                </v-combobox>
              </template>
              <template v-slot:item.value="{ item }">
                <v-text-field v-model="item.value" :label="$t('general.value')" variant="outlined" width="180px"
                  density="compact" hide-details>
                </v-text-field>
              </template>
              <template v-slot:item.stack="{ item }">
                <v-text-field v-model="item.stack" :label="$t('general.stack')" variant="outlined" width="180px"
                  density="compact" hide-details>
                </v-text-field>
              </template>
              <template v-slot:item.duration="{ item }">
                <v-text-field v-model="item.duration" :label="$t('general.buff_duration')" variant="outlined"
                  width="180px" density="compact" hide-details>
                </v-text-field>
              </template>
            </v-data-table>
          </div>
        </v-container>
      </v-card>
    </v-dialog>
    <v-dialog v-if="commentId !== undefined" v-model="commentDialog" width="auto">
      <v-card min-width="1280" :title="$t('general.nth_row_comment', { n: commentId + 1 })">
        <v-container>
          <div class="d-flex flex-column">
            <v-textarea class="mb-4" v-model="templateRows[commentId].comment" variant="outlined" density="compact"
              hide-details />
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
      <div class="d-flex flex-column">
        <div class="d-flex flex-column w-100">
          <div id="table" class="d-flex flex-row ml-auto mb-2">
            <div v-if="countSelectedRows(templateRows) > 0" class="d-flex flex-row w-100">
              <v-btn color="red" class="mr-2" v-on:click="deleteRows(templateRows); currentIndex = undefined">
                {{ $t('general.delete') }}
              </v-btn>
              <v-btn class="mr-2" v-on:click="cancelSelection(templateRows); currentIndex = undefined">
                {{ $t('general.cancel_selection') }}
              </v-btn>
            </div>
            <v-btn v-if="currentIndex !== undefined" class="mr-2" v-on:click="insertAboveDialog = true">
              {{ $t('general.insert_above') }}
            </v-btn>
            <v-btn v-if="currentIndex !== undefined" class="mr-2" v-on:click="insertBelowDialog = true">
              {{ $t('general.insert_below') }}
            </v-btn>
            <v-btn class="mr-2" v-on:click="insertBottomDialog = true">
              {{ $t('general.insert_bottom') }}
            </v-btn>
            <v-btn v-on:click="calculate">
              {{ $t('general.calculate') }}
            </v-btn>
          </div>
          <v-data-table id="table" class="table mb-4" :headers="headers" :items="templateRows" items-per-page="10"
            @update:current-items="updatePage" show-select v-model:selected="selectedItems" disable-sort>
            <template v-slot:header.data-table-select>
              <!-- <v-checkbox-btn v-model="allSelected" color="primary" @update:model-value="selectAll()" variant="outlined"
              density="compact" hide-details>
            </v-checkbox-btn> -->
            </template>
            <template v-slot:item.data-table-select="{ item }">
              <v-checkbox-btn v-model="item.selected" @update:model-value="selectRow(item)" variant="outlined"
                density="compact" hide-details>
              </v-checkbox-btn>
            </template>
            <template v-slot:item.tools="{ item }">
              <v-tooltip location="end" :text="$t('general.buff')">
                <template v-slot:activator="{ props }">
                  <v-icon class="mr-2" :color="item.areBuffs() ? 'blue' : ''" size="small"
                    v-on:click="buffDialog = true; buffId = item.id" v-bind="props">
                    mdi-shield-sword
                  </v-icon>
                </template>
              </v-tooltip>
              <v-tooltip location="end" :text="item.comment ? item.comment : $t('general.comment')">
                <template v-slot:activator="{ props }">
                  <v-icon class="mr-2" :color="item.comment ? 'blue' : ''" size="small"
                    v-on:click="commentDialog = true; commentId = item.id" v-bind="props">
                    mdi-pencil
                  </v-icon>
                </template>
              </v-tooltip>
              <v-tooltip location="end" :text="$t('general.calculate')">
                <template v-slot:activator="{ props }">
                  <v-icon size="small" v-on:click="template.calculateRow(item.id)" v-bind="props">
                    mdi-calculator
                  </v-icon>
                </template>
              </v-tooltip>
            </template>
            <template v-slot:item.id="{ item }">
              <v-btn v-on:click="jumpToSection(goTo, `#detailed-${item.id}`)" variant="plain" density="compact">
                {{ $t('general.nth_row', { n: item.id + 1 }) }}
              </v-btn>
            </template>
            <template v-slot:item.resonator_name="{ item }">
              <v-combobox v-model="item.resonator_name" :items="resonatorNames"
                @update:model-value="updateSkillIdsByName(item)" variant="outlined" width="180px" density="compact"
                hide-details>
              </v-combobox>
            </template>
            <template v-slot:item.action="{ item }">
              <v-combobox v-model="item.action" :items="getActions()" variant="outlined" width="180px" density="compact"
                hide-details>
              </v-combobox>
            </template>
            <template v-slot:item.skill_id="{ item }">
              <v-tooltip location="end" :text="item.skill_id" :disabled="!item.skill_id">
                <template v-slot:activator="{ props }">
                  <v-autocomplete v-bind="props" v-model="item.skill_id" :items="item.skill_ids" item-value="title"
                    @update:menu="updateSkillIdsByName(item)" width="180px" variant="outlined" density="compact"
                    hide-details>
                    <template v-slot:item="{ props, item }">
                      <v-tooltip location="end" :disabled="(() => { return !item.raw.value.tooltip })()">
                        <div v-html="item.raw.value.tooltip"></div>
                        <template v-slot:activator="{ props: tooltipProps }">
                          <v-list-item v-bind="{ ...props, ...tooltipProps }"></v-list-item>
                        </template>
                      </v-tooltip>
                    </template>
                  </v-autocomplete>
                </template>
              </v-tooltip>
            </template>
            <template v-slot:item.hit="{ item }">
              <v-text-field v-model="item.hit" :label="$t('general.hits')" variant="outlined" width="68px"
                density="compact" hide-details>
              </v-text-field>
            </template>
            <template v-slot:item.time_start="{ item }">
              <v-text-field v-model="item.time_start" :label="$t('general.time_start')" placeholder="00:00:00"
                variant="outlined" width="180px" density="compact" hide-details>
              </v-text-field>
            </template>
            <template v-slot:item.time_end="{ item }">
              <v-text-field v-model="item.time_end" :label="$t('general.time_end')" placeholder="00:00:00"
                variant="outlined" width="180px" density="compact" hide-details>
              </v-text-field>
            </template>
            <template v-slot:item.real_dmg_no_crit="{ item }">
              <v-text-field v-model="item.real_dmg_no_crit" :label="$t('general.real_dmg_no_crit')" variant="outlined"
                width="180px" density="compact" hide-details>
              </v-text-field>
            </template>
            <template v-slot:item.real_dmg_crit="{ item }">
              <v-text-field v-model="item.real_dmg_crit" :label="$t('general.real_dmg_crit')" variant="outlined"
                width="180px" density="compact" hide-details>
              </v-text-field>
            </template>
            <template v-slot:item.calculation.result.damage_no_crit_str="{ item }">
              <v-text-field class="result" v-model="item.calculation.result.damage_no_crit_str"
                :label="$t('general.calculated_damage')" variant="outlined" width="180px" density="compact" hide-details
                readonly>
              </v-text-field>
            </template>
            <template v-slot:item.calculation.result.damage_crit_str="{ item }">
              <v-text-field class="result" v-model="item.calculation.result.damage_crit_str"
                :label="$t('general.calculated_crit_damage')" variant="outlined" width="180px" density="compact"
                hide-details readonly>
              </v-text-field>
            </template>
            <template v-slot:item.calculation.result.damage_str="{ item }">
              <v-text-field class="result" v-model="item.calculation.result.damage_str"
                :label="$t('general.calculate_expected_damage')" variant="outlined" width="180px" density="compact"
                hide-details readonly>
              </v-text-field>
            </template>
          </v-data-table>
        </div>
        <div v-if="r.length > 0" class="d-flex flex-column w-100">
          <div class="d-flex flex-row mb-4">
            <h2>{{ t('general.rotation') }}</h2>
          </div>
          <Rotation class="mb-4" :rotation="r" :key="JSON.stringify(templateRows)" />
        </div>
        <div v-if="templateRows.length > 0" class="d-flex flex-column w-100">
          <div class="d-flex flex-row mb-4">
            <h2>{{ t('general.damage_analysis') }}</h2>
          </div>
          <div class="d-flex flex-column w-100">
            <div v-for="row in currentRows" class="d-flex flex-column w-100">
              <div class="d-flex flex-row mb-4">
                <h3 :id="`detailed-${row.id}`">{{ t('general.nth_row', { n: row.id + 1 }) }}</h3>
              </div>
              <div class="d-flex flex-row mb-4">
                <v-btn class="ml-auto" v-on:click="jumpToSection(goTo, '#table')">
                  {{ $t('general.back_to', { to: $t('general.table') }) }}
                </v-btn>
              </div>
              <RowDetailedDamage class="mb-4" :calculation="row.calculation" :key="row.calculation.id" />
            </div>
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<route lang="yaml">
meta:
  layout: plain
</route>

<script lang="ts" setup>
import { ref } from 'vue'
import { useGoTo } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import { useTemplateStore } from '@/stores/calculation/template';
import { useResonatorStore } from '@/stores/resonator';

import { getBuffTypes } from '@/ww/buff';
import { TemplateRow, TemplateRowBuff } from '@/ww/template';
import { getActions, getRotation } from "@/ww/rotation"
import { jumpToSection, saveJson } from '@/ww/utils';

const goTo = useGoTo()
const { t } = useI18n()

const route = useRoute();
let spoiler: any = route.query.spoiler
if (spoiler === "true" || spoiler === true) {
  spoiler = true
} else {
  spoiler = false
}

const props = defineProps({
  id: {
    type: String,
    required: true
  },
});
const id = props.id

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

const buffDialog = ref<boolean>(false)
const buffId = ref<number | undefined>(undefined)
const buffs = ref<Array<any>>(["123"])
const buffsHeaders = [
  { title: t('general.row'), key: 'id' },
  { title: t('general.name'), key: 'name' },
  { title: t('general.buff_type'), key: 'type' },
  { title: t('general.value'), key: 'value' },
  { title: t('general.stack'), key: 'stack' },
  { title: t('general.buff_duration'), key: 'duration', width: "100%" },
]

const comment = ref<string>("")
const commentDialog = ref<boolean>(false)
const commentId = ref<number | undefined>(undefined)

const headers = [
  { title: '', key: 'tools' },
  { title: t('general.row'), key: 'id' },
  { title: t('general.resonator'), key: 'resonator_name' },
  { title: t('general.action'), key: 'action' },
  { title: t('general.resonator_skill_id'), key: 'skill_id' },
  { title: t('general.hits'), key: 'hit' },
  { title: t('general.time_start'), key: 'time_start' },
  { title: t('general.time_end'), key: 'time_end' },
  { title: t('general.real_dmg_no_crit'), key: 'real_dmg_no_crit' },
  { title: t('general.real_dmg_crit'), key: 'real_dmg_crit' },
  { title: t('general.calculated_damage'), key: 'calculation.result.damage_no_crit_str' },
  { title: t('general.calculated_crit_damage'), key: 'calculation.result.damage_crit_str' },
  { title: t('general.calculate_expected_damage'), key: 'calculation.result.damage_str' },
]

const template = useTemplateStore(id)
const templateRows = ref<Array<TemplateRow>>([new TemplateRow()])
if (template.data.rows.length > 0) {
  templateRows.value = template.data.rows
  rearrange(templateRows.value)
  initRotation(templateRows.value)
}
const currentRows = ref<Array<TemplateRow>>([])

function initRotation(rows: Array<TemplateRow | any>) {
  if (rows.length > 0) {
    r.value = getRotation(rows as any)
  } else {
    r.value = []
  }
}

function rearrange(rows: Array<{ id: number, [key: string]: any }>) {
  rows.forEach((action: any, i: number) => {
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
  templateRows.value.forEach((action: any) => {
    action.selected = s
  })
  currentIndex.value = undefined
}

function countSelectedRows(rows: Array<{ selected: boolean, [key: string]: any }>) {
  let i = 0
  rows.forEach((row) => {
    if (row.selected) {
      i += 1
    }
  })
  return i
}

function selectRow(row: { id: number, selected: boolean, [key: string]: any }) {
  const selected: boolean = row.selected
  if (selected) {
    currentIndex.value = row.id
  }
  if (!selected && row.id === currentIndex.value) {
    currentIndex.value = undefined
  }
  allSelected.value = false
}

function editComment() {
  const row = templateRows.value[commentId.value as number]
  if (row.id !== commentId.value) {
    return
  }
  row.comment = comment.value.toString()
  commentDialog.value = false
  comment.value = ""
}

function cancelSelection(rows: Array<{ selected: boolean, [key: string]: any }>) {
  rows.forEach((row) => {
    row.selected = false
  })
}

function _insert(rows: Array<{ id: number, [key: string]: any }>, i: number, n: number | undefined) {
  i = Number(i)
  if (isNaN(i)) {
    return
  }
  n = Number(n)
  if (isNaN(n)) {
    return
  }

  for (let j = 0; j < n; j++) {
    const row = new TemplateRow()
    rows.splice(i + j, 0, row)

  }
  rearrange(rows)
}

function insertAbove(rows: Array<{ id: number, [key: string]: any }>, i: number, n: number | undefined) {
  _insert(rows, i, n)
}

function insertBelow(rows: Array<{ id: number, [key: string]: any }>, i: number, n: number | undefined) {
  i += 1
  _insert(rows, i, n)
}

function insertBottom(rows: Array<{ id: number, [key: string]: any }>, n: number | undefined) {
  const i = rows.length
  _insert(rows, i, n)
}

function deleteRows(rows: any) {
  const indices: Array<number> = []
  rows.forEach((row: any, i: number) => {
    if (row.selected) {
      indices.push(i)
    }
  })
  while (indices.length > 0) {
    const i = indices.pop()
    rows.splice(i, 1)
  }
  rows.forEach((row: any, i: number) => {
    row.id = i
  })
}

async function updateSkillIdsByName(item: any) {
  const name = item.resonator_name
  if (!name) {
    return
  }
  const skillItems = await resonatorStore.getDamageSkillItems(name)
  item.skill_ids = skillItems
}

function updatePage(items: any) {
  if (items.length === 0) {
    return
  }
  currentRows.value = []
  items.forEach((item: any) => {
    const row = item.raw
    currentRows.value.push(row)
  })
}

function calculate() {
  for (let i = 0; i < templateRows.value.length; i++) {
    template.calculateRow(i)
  }
}

watch(() => { return JSON.stringify(templateRows.value) }, () => {
  initRotation(templateRows.value)
})
</script>

<style scoped lang="sass">
.table
  display: block
  overflow-x: auto
  white-space: nowrap
::v-deep(.result input)
  color: yellow
::v-deep(.table th)
  padding: 0px 4px !important
::v-deep(.table td)
  padding: 0px 4px !important
::v-deep(.table .v-label)
  color: rgb(110,110,110)
</style>