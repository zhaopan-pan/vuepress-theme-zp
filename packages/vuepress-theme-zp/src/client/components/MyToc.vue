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
const { frontmatter, headers } = page?.value

// 没有配置 toc 默认展示 toc
const hasHeader = computed(
  () => (frontmatter.toc || frontmatter.toc === undefined) && headers?.length
)
</script>

<style scoped></style>
