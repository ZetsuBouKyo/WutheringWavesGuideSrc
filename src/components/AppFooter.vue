<template>
  <div class="d-flex flex-column">
    <div class="ad d-flex justify-center">
      <ins class="adsbygoogle" style="display: inline-block; width: 728px; height: 90px"
        data-ad-client="ca-pub-4447988057129505" data-ad-slot="7073650511"></ins>
    </div>
    <v-footer class="footer" app>
      <a v-for="item in items" :key="item.title" :href="item.href" :title="item.title"
        class="d-inline-block mx-2 social-link" rel="noopener noreferrer" target="_blank">
        <v-icon :icon="item.icon" size="16" />
      </a>

      <div class="text-caption text-disabled" style="position: absolute; right: 16px;">
        &copy; 2025-{{ (new Date()).getFullYear() }} <span class="d-none d-sm-inline-block">ZetsuBouKyo</span>
        —
        <a class="text-decoration-none on-surface" href="https://en.wikipedia.org/wiki/MIT_License"
          rel="noopener noreferrer" target="_blank">
          MIT License
        </a>
      </div>
    </v-footer>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

const items = [
  {
    title: 'Twitter',
    icon: ['M2.04875 3.00002L9.77052 13.3248L1.99998 21.7192H3.74882L10.5519 14.3697L16.0486 21.7192H22L13.8437 10.8137L21.0765 3.00002H19.3277L13.0624 9.76874L8.0001 3.00002H2.04875ZM4.62054 4.28821H7.35461L19.4278 20.4308H16.6937L4.62054 4.28821Z'],
    href: 'https://x.com/zetsuboukyo',
  },
  {
    title: 'Twitch',
    icon: `mdi-twitch`,
    href: 'https://www.twitch.tv/zetsuboukyo',
  },
  {
    title: 'GitHub',
    icon: `mdi-github`,
    href: 'https://github.com/ZetsuBouKyo/WutheringWavesGuide',
  },
]

onMounted(() => {
  try {
    // @ts-ignore
    (adsbygoogle = window.adsbygoogle || []).push({});
  } catch (e) {
  }
});
</script>

<style scoped lang="sass">
.ad
  margin-bottom: 48px
.social-link :deep(.v-icon)
  color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
  text-decoration: none
  transition: .2s ease-in-out

  &:hover
    color: rgba(25, 118, 210, 1)
.footer
  height: var(--ww-footer-height)
</style>
