<script setup lang="ts">
import { useThemeData } from '@theme-zp-client/composables/index.js'
import { showSideBar } from '@theme-zp-client/utils/index.js'
import { computed } from 'vue'

const themeData = useThemeData()
const { startYear, nameLink = '', beian } = themeData.value?.footer || {}
const userName = themeData.value?.blog.name || {}
const endYear = new Date().getFullYear()
const timeText = computed(() => (startYear ? `${startYear}-present` : endYear))
const hasSidebar = computed(() => showSideBar())
</script>

<template>
  <div class="footer" :class="{ 'footer-has-sidebar': hasSidebar }">
    <div>
      theme from
      <a
        target="_blank"
        href="https://github.com/zhaopan-pan/vuepress-theme-zp"
      >
        vuepress-theme-zp
      </a>
    </div>
    <div class="info">
      Copyright ©
      <span v-if="timeText">
        {{ `&nbsp;${timeText}` }}
      </span>
      <RouterLink :to="nameLink" class="ml5">{{ userName }}</RouterLink>
      <a v-if="beian" target="_blank" :href="beian?.link" class="beian ml10">
        {{ beian?.text }}
      </a>
    </div>
  </div>
</template>
