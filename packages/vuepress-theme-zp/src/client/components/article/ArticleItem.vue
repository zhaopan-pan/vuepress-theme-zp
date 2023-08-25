<script setup lang="ts">
import {
  DeviceType,
  useUpdateDeviceStatus,
} from '@theme-zp-client/composables/index.js'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { computed, type CSSProperties, type PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import ArticleInfo from './ArticleInfo.vue'

const router = useRouter()
// show narrow mobile cover image
const isMobile = ref(false)

const articleContainer = ref<HTMLElement | null>(null)

const props = defineProps({
  article: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})

const { path, info } = props.article

const toDetail = (): unknown => router.push(path)

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number) => {
  isMobile.value = window.innerWidth < width
})

// mobile-end cover
const isMobileCover = computed(
  () => (info.mobileCover || info.cover) && isMobile.value
)
// pc-end cover
const isPcCover = computed(() => info.cover && !isMobile.value)

const hasCover = computed(() => isPcCover.value || isMobileCover.value)
// pc normal article
const isPcNormalArticle = computed(() => !isMobile.value && !isPcCover.value)

// cover url，take priority mobileCover
const coverUrl = computed(() => info.mobileCover || info.cover)

const articleTextStyle = computed<CSSProperties>(() => {
  if (isPcNormalArticle.value) return { width: '100%', padding: '0.5rem 1rem' }
  return isPcCover.value
    ? {
        // maxWidth: '60%',
        paddingRight: '0.5rem',
        padding: '0.5rem 1rem',
      }
    : { width: '100%' }
})
</script>
<template>
  <article
    ref="articleContainer"
    class="article-item-container cp"
    @click="toDetail"
  >
    <div class="mobile-article-cover-box">
      <Image
        v-if="hasCover"
        class="mobile-article-cover"
        :src="coverUrl"
        alt="article-cover"
      />
    </div>
    <div
      class="article-item"
      :class="{ 'article-item-mobile-narrow': isMobile }"
    >
      <div class="article-text" :style="articleTextStyle">
        <h1
          v-show="info.title"
          :title="info.title"
          :class="{
            'article-name': true,
            'article-name-ellipsis': !isMobile,
          }"
        >
          {{ info.title }}
        </h1>
        <div
          v-if="info.excerpt"
          class="cover-info-text"
          v-html="info.excerpt"
        />
        <ArticleInfo :info="info" :showTag="showTag" />
      </div>
    </div>
  </article>
</template>
