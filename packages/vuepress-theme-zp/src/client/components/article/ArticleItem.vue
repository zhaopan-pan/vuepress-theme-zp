<script setup lang="ts">
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { computed, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DeviceType, useUpdateDeviceStatus } from '../../composables/index.js'
import ArticleInfo from './ArticleInfo.vue'

const router = useRouter()
// show narrow mobile cover image
const showMobileNarrowCover = ref(false)

const articleContainer = ref<HTMLElement | null>(null)

const props = defineProps({
  article: {
    type: Object as PropType<IArticleItem>,
    required: true,
  },
  showTag: { type: Boolean, default: true },
})

const { path, info } = props.article

// 图片、描述、摘要有一个即展示
const showCoverInfo = computed(
  () => info.cover || info.description || info.excerpt
)

// 优先取描述，没有描述取摘要
const excerptContent = computed(() => info.description || info.excerpt)

const toDetail = (): unknown => router.push(path)

useUpdateDeviceStatus(DeviceType.MOBILE_NARROW, (width: number) => {
  showMobileNarrowCover.value = window.innerWidth < width
})

const imgSize = computed(() => {
  if (!articleContainer.value || !info.cover) return undefined

  const originSize = info.cover ? info.cover.split('/') : null
  // 原始图片的宽高比
  const originRatio = originSize
    ? Number(
        (
          Number(originSize[originSize.length - 2]) /
          Number(originSize[originSize.length - 1])
        ).toFixed(2)
      )
    : 1

  const articleSize = {
    width: articleContainer.value?.offsetWidth / 2,
    height: articleContainer.value?.offsetHeight,
  }
  // 节点的宽高比
  const articleNodeRatio = Number(
    (articleSize.width / articleSize.height).toFixed(2)
  )
  // 超出阈值 0.3
  const exceed = Math.abs(articleNodeRatio - originRatio) - 0.3
  if (exceed > 0) {
    // 超出比例后重新计算高度，防止图片变形
    articleSize['height'] = articleSize.width / (articleNodeRatio - exceed)
  }
  return {
    width: `${articleSize.width}px`,
    height: `${articleSize.height}px`,
  }
})
</script>
<template>
  <article
    ref="articleContainer"
    class="article-item-container cp"
    @click="toDetail"
  >
    <Image
      v-if="info.cover && showMobileNarrowCover"
      class="mobile-article-cover"
      :src="info.cover"
      alt="article-cover"
    />
    <div
      class="article-item"
      :class="showMobileNarrowCover ? 'article-item-mobile-narrow ' : ''"
    >
      <div
        class="article-text"
        :style="{
          height: imgSize?.height ? `calc(${imgSize?.height} - 1rem)` : '100%',
        }"
      >
        <div v-show="info.title" class="article-name">
          {{ info.title }}
        </div>
        <div
          v-if="showCoverInfo"
          class="cover-info-text"
          v-html="excerptContent"
        />
        <ArticleInfo :info="info" :showTag="showTag" />
      </div>
      <div
        v-if="info.cover && !showMobileNarrowCover && imgSize"
        class="transition-zone"
        :style="{ backgroundImage: `url(${info.cover})` }"
      />
      <Image
        v-if="info.cover && !showMobileNarrowCover && imgSize"
        class="article-cover"
        :src="info.cover"
        alt="article-cover"
        :style="imgSize"
      />
    </div>
  </article>
</template>
