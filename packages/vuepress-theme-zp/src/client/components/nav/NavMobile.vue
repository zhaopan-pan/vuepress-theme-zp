<script setup lang="ts">
import { isFormPosts, showSideBar } from '@theme-zp-client/utils/index.js'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import {
  DeviceType,
  useSidebarItems,
  useThemeLocaleData,
  useUpdateDeviceStatus,
} from '../../composables/index.js'
import { IArticleInfo } from '../../index.js'
import cssVars from '../../styles/_variables.module.scss?module'

defineEmits(['toggle-sidebar'])
const route = useRoute()
const page = usePageData()
const isMobile = ref(false)
const showTocModal = ref(false)
const shouldShowTocBtn = ref(false)

const sidebarItems = useSidebarItems()
const frontmatter = usePageFrontmatter<IArticleInfo>()
const themeLocale = useThemeLocaleData()

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number): void => {
  isMobile.value = window.innerWidth < width
})

const sidebarVisible = computed(() => showSideBar(sidebarItems.value))

const showPageToc = (): void => {
  showTocModal.value = !showTocModal.value
}

// mobile - nav
const showMobileNav = computed(
  () =>
    isMobile.value &&
    isFormPosts() &&
    (sidebarVisible.value || shouldShowTocBtn.value)
)

// update toc status
const refreshTocStatus = (): void => {
  shouldShowTocBtn.value =
    frontmatter.value.toc !== false &&
    themeLocale.value.toc !== false &&
    !!page.value.headers.length
}

onMounted(() => {
  refreshTocStatus()
})

watch(
  () => [isMobile.value, route.path],
  () => {
    showTocModal.value = false
    refreshTocStatus()

    if (!isMobile.value) {
      // 没有导航栏的时候 高度重置为0，以免影响锚点定位
      document.documentElement.style.setProperty(
        '--mobile-navbar-height',
        '0rem'
      )
    } else {
      document.documentElement.style.removeProperty('--mobile-navbar-height')
    }
  }
)
</script>

<template>
  <div v-if="showMobileNav" class="mobile-nav-block" />
  <nav v-if="showMobileNav" class="mobile-nav">
    <div v-if="sidebarVisible" class="page-menu">
      <button class="page-nav-btn" @click="$emit('toggle-sidebar')">
        <div class="mobile-menu-icon" aria-hidden="true">
          <span></span><span></span><span></span><span></span>
        </div>
        <span>菜单</span>
      </button>
    </div>
    <div v-else class="page-menu" />

    <div v-if="shouldShowTocBtn" class="page-toc">
      <button class="page-nav-btn" @click="showPageToc">
        <span>本页目录</span>
        <ZpIcons
          icon="ChevronDownOutline"
          :iconSize="cssVars.navIconSize"
          :class="showTocModal ? 'toc-arrow-open' : 'toc-arrow'"
        />
      </button>
    </div>
    <div v-else class="page-toc" />

    <DropTransition v-show="showTocModal" :duration="0.15">
      <div class="nav-toc">
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
