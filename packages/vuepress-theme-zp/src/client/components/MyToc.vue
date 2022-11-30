<template>
  <div class="zp-toc" v-if="hasHeader">
    <div class="zp-toc-container">
      <div class="toc-title">目录</div>
      <Toc :options="options" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePageData } from '@vuepress/client'
import { computed } from 'vue'

const options = {
  containerClass: 'table-of-contents',
  linkActiveClass: 'zp-link-active-class',
  listClass: 'zp-toc-list',
  linkClass: 'zp-toc-link',
}

const page = usePageData()
const hasHeader = computed(() => page?.value?.headers?.length)
</script>

<style scoped></style>
