<script setup lang="ts">
import type {
  DefaultThemeNormalPageFrontmatter,
  NavLink,
  ResolvedSidebarItem,
} from '@theme-zp-src/shared/index.js'
import { usePageFrontmatter } from '@vuepress/client'
import { isPlainObject, isString } from '@vuepress/shared'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useNavLink, useSidebarItems } from '../composables/index.js'

/**
 * Resolve `prev` or `next` config from frontmatter
 */
const resolveFromFrontmatterConfig = (
  conf: unknown
): null | false | NavLink => {
  if (conf === false) {
    return null
  }

  if (isString(conf)) {
    return useNavLink(conf)
  }

  if (isPlainObject<NavLink>(conf)) {
    return conf
  }

  return false
}

/**
 * Resolve `prev` or `next` config from sidebar items
 */
const resolveFromSidebarItems = (
  sidebarItems: ResolvedSidebarItem[],
  currentPath: string,
  offset: number
): null | NavLink => {
  const index = sidebarItems.findIndex((item) => item.link === currentPath)
  if (index !== -1) {
    const targetItem = sidebarItems[index + offset]
    if (!targetItem?.link) {
      return null
    }
    return targetItem as NavLink
  }

  for (const item of sidebarItems) {
    if (item.children) {
      const childResult = resolveFromSidebarItems(
        item.children,
        currentPath,
        offset
      )
      if (childResult) {
        return childResult
      }
    }
  }

  return null
}

const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()
const sidebarItems = useSidebarItems()
const route = useRoute()

const prevNavLink = computed(() => {
  const prevConfig = resolveFromFrontmatterConfig(frontmatter.value.prev)
  if (prevConfig !== false) {
    return prevConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, -1)
})

const nextNavLink = computed(() => {
  const nextConfig = resolveFromFrontmatterConfig(frontmatter.value.next)
  if (nextConfig !== false) {
    return nextConfig
  }

  return resolveFromSidebarItems(sidebarItems.value, route.path, 1)
})
</script>

<template>
  <nav v-if="prevNavLink || nextNavLink" class="page-nav">
    <div class="inner">
      <RouterLink
        :to="prevNavLink?.link || ''"
        :class="{ 'pager': true, 'pager-show': prevNavLink }"
      >
        <span class="pre-page">Previous page</span>
        <span class="pre-page-target">{{ prevNavLink?.text }}</span>
      </RouterLink>

      <RouterLink
        :to="nextNavLink?.link || ''"
        :class="{ 'pager': true, 'hasNext': true, 'pager-show': nextNavLink }"
      >
        <span class="pre-page">Next page</span>
        <span class="pre-page-target">{{ nextNavLink?.text }}</span>
      </RouterLink>
    </div>
  </nav>
</template>
