<script setup lang="ts">
import MyToc from '@theme-zp-client/components/MyToc.vue'
import { usePageFrontmatter } from '@vuepress/client'
import { computed, ref } from 'vue'
import {
  DeviceType,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../composables/index.js'
import { IArticleInfo } from '../index.js'
import { showSideBar } from '../utils/index.js'

defineEmits(['toggle-sidebar'])

const isMobile = ref(false)
const showToc = ref(false)
const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number): void => {
  isMobile.value = window.innerWidth < width
})

const sidebarVisible = computed(() => showSideBar())

const showPageToc = (): void => {
  showToc.value = !showToc.value
}

// toc
const shouldShowToc = computed(
  () => frontmatter.value.toc !== false && themeLocale.value.toc !== false
)
</script>

<template>
  <nav v-if="isMobile" class="mobile-nav">
    <div
      v-if="sidebarVisible"
      class="page-menu"
      @click="$emit('toggle-sidebar')"
    >
      <button class="page-nav-btn">
        <div class="mobile-menu-icon" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <span>菜单</span>
      </button>
    </div>
    <div v-if="shouldShowToc" class="page-toc" @click="showPageToc">
      <button class="page-nav-btn">
        <span>本页目录</span>
        <ZpIcons
          icon="KeyboardArrowDownRound"
          iconSize="1"
          :class="showToc ? 'toc-arrow-open' : 'toc-arrow'"
        />
      </button>
    </div>
    <div v-show="showToc" class="nav-toc">
      <MyToc />
    </div>
  </nav>
</template>

<style lang="scss" scoped></style>
