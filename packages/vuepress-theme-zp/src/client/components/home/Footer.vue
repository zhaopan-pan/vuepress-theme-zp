<script setup lang="ts">
import { computed } from 'vue'
import { useThemeData } from '../../composables/index.js'

const themeData = useThemeData()
const { startYear, nameLink = '' } = themeData.value?.footer || {}
const userName = themeData.value?.blog.name || {}
const endYear = new Date().getFullYear()
const timeText = computed(() =>
  startYear && endYear > startYear ? `${startYear}-${endYear}` : endYear
)
</script>

<template>
  <div class="footer">
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
      Copyright
      <ZpIcons icon="CopyrightFilled" iconSize="0.9" class="" />
      <span v-if="timeText">
        {{ timeText }}
      </span>
      <RouterLink :to="nameLink" class="ml5">{{ userName }}</RouterLink>
    </div>
  </div>
</template>
