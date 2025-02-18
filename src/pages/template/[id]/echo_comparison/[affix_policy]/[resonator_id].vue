<template>
  <v-container>
    <v-row>
      Template Hashed ID: {{ hashedTemplateID }}
    </v-row>
    <v-row>
      Affix Policy: {{ affixPolicy }}
    </v-row>
    <v-row>
      Resonator ID: {{ resonatorID }}
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
const route = useRoute()
const hashedTemplateID = (route.params as { id: string }).id
const affixPolicy = (route.params as { affix_policy: string }).affix_policy
const resonatorID = (route.params as { resonator_id: string }).resonator_id
</script>