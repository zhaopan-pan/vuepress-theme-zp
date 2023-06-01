<script setup lang="ts">
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  DeviceType,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../composables/index.js'
import { IArticleInfo } from '../index.js'
import { isArticleContent, showSideBar } from '../utils/index.js'

defineEmits(['toggle-sidebar'])
const route = useRoute()
const page = usePageData()
const isMobile = ref(false)
const showTocModal = ref(false)
const shouldShowTocBtn = ref(false)

const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number): void => {
  isMobile.value = window.innerWidth < width
})

const sidebarVisible = computed(() => showSideBar())

const showPageToc = (): void => {
  showTocModal.value = !showTocModal.value
}

// mobile - nav
const showMobileNav = computed(
  () =>
    isMobile.value &&
    isArticleContent() &&
    (sidebarVisible.value || shouldShowTocBtn.value)
)

// toc
const refreshTocStatus = (): void => {
  shouldShowTocBtn.value =
    frontmatter.value.toc !== false &&
    themeLocale.value.toc !== false &&
    !!page.value.headers.length
}

onMounted(refreshTocStatus)

watch(
  () => route.path,
  () => {
    showTocModal.value = false
    refreshTocStatus()
  }
)
</script>

<template>
  <div v-if="showMobileNav" class="block" />
  <nav v-if="showMobileNav" class="mobile-nav">
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
    <div v-else class="page-menu" />

    <div v-if="shouldShowTocBtn" class="page-toc" @click="showPageToc">
      <button class="page-nav-btn">
        <span>本页目录</span>
        <ZpIcons
          icon="KeyboardArrowDownRound"
          iconSize="1"
          :class="showTocModal ? 'toc-arrow-open' : 'toc-arrow'"
        />
      </button>
    </div>
    <div v-else class="page-toc" />

    <DropTransition v-show="showTocModal" :duration="0.2">
      <div class="nav-toc" @click="showPageToc">
        <Toc
          :options="{
            containerClass: 'table-of-contents',
            listClass: 'zp-toc-list',
            linkClass: 'zp-toc-link',
            linkActiveClass: 'zp-link-active-class',
          }"
        />
      </div>
    </DropTransition>
  </nav>
</template>

<style lang="scss" scoped></style>
