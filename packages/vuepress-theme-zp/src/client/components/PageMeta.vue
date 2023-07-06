<script setup lang="ts">
import AutoLink from '@theme-zp-client/components/AutoLink.vue'
import { useThemeLocaleData } from '@theme-zp-client/composables/index.js'
import { resolveEditLink } from '@theme-zp-client/utils/index.js'
import type {
  DefaultThemeNormalPageFrontmatter,
  DefaultThemePageData,
  NavLink,
} from '@theme-zp-src/shared/index.js'
import { usePageData, usePageFrontmatter } from '@vuepress/client'
import { computed } from 'vue'
import type { ComputedRef } from 'vue'

const useEditNavLink = (): ComputedRef<null | NavLink> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showEditLink =
      frontmatter.value.editLink ?? themeLocale.value.editLink ?? true
    if (!showEditLink) {
      return null
    }

    const {
      repo,
      docsRepo = repo,
      docsBranch = 'main',
      docsDir = '',
      editLinkText,
    } = themeLocale.value

    if (!docsRepo) return null

    const editLink = resolveEditLink({
      docsRepo,
      docsBranch,
      docsDir,
      filePathRelative: page.value.filePathRelative,
      editLinkPattern:
        frontmatter.value.editLinkPattern ?? themeLocale.value.editLinkPattern,
    })

    if (!editLink) return null

    return {
      text: editLinkText ?? 'Edit this page',
      link: editLink,
    }
  })
}

const useLastUpdated = (): ComputedRef<null | string> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showLastUpdated =
      frontmatter.value.lastUpdated ?? themeLocale.value.lastUpdated ?? true

    if (!showLastUpdated) return null

    if (!page.value.git?.updatedTime) return null

    const updatedDate = new Date(page.value.git?.updatedTime)

    return updatedDate.toLocaleString()
  })
}

const useContributors = (): ComputedRef<
  null | Required<DefaultThemePageData['git']>['contributors']
> => {
  const themeLocale = useThemeLocaleData()
  const page = usePageData<DefaultThemePageData>()
  const frontmatter = usePageFrontmatter<DefaultThemeNormalPageFrontmatter>()

  return computed(() => {
    const showContributors =
      frontmatter.value.contributors ?? themeLocale.value.contributors ?? true

    if (!showContributors) return null

    return page.value.git?.contributors ?? null
  })
}

const themeLocale = useThemeLocaleData()
const editNavLink = useEditNavLink()
const lastUpdated = useLastUpdated()
const contributors = useContributors()
</script>

<template>
  <footer class="page-meta">
    <div v-if="editNavLink" class="meta-item edit-link">
      <AutoLink class="meta-item-label" :item="editNavLink" />
    </div>

    <div v-if="lastUpdated" class="meta-item last-updated flex-center">
      <ZpIcons icon="lucide:calendar" class="mr5" iconSize="0.9" />
      <span> {{ themeLocale.lastUpdatedText }}: </span>
      <ClientOnly>
        <span>{{ lastUpdated }}</span>
      </ClientOnly>
    </div>

    <div
      v-if="contributors && contributors.length"
      class="meta-item contributors"
    >
      <span class="meta-item-label">{{ themeLocale.contributorsText }}: </span>
      <span class="meta-item-info">
        <template v-for="(contributor, index) in contributors" :key="index">
          <span class="contributor" :title="`email: ${contributor.email}`">
            {{ contributor.name }}
          </span>
          <template v-if="index !== contributors.length - 1">, </template>
        </template>
      </span>
    </div>
  </footer>
</template>
