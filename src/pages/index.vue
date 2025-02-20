<template>
  <v-container>
    <Markdown :path="'welcome.md'" :noHeaders="true" />
    <v-expansion-panels class="mt-10">
      <v-expansion-panel :title="$t('general.disclaimer')">
        <v-expansion-panel-text>
          <Markdown :path="'disclaimer.md'" :noHeaders="true" />
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-container>
</template>

<script lang="ts" setup>
</script>
