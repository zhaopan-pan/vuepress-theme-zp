<script setup lang="ts">
import {
  DeviceType,
  useUpdateDeviceStatus,
} from '@theme-zp-client/composables/index.js'
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { computed, CSSProperties, PropType, ref } from 'vue'
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

// 图片、描述、摘要有一个即展示
const showCoverInfo = computed(
  () => info.cover || info.description || info.excerpt
)

// 优先取描述，没有描述取摘要
const excerptContent = computed(() => info.description || info.excerpt)

const toDetail = (): unknown => router.push(path)

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number) => {
  isMobile.value = window.innerWidth < width
})

const pcImgSize = computed(() => {
  if (!articleContainer.value || !hasCover.value) return undefined
  return {
    width: `${articleContainer.value?.offsetWidth * 0.4}px`,
    height: `${170}px`,
  }
  // const originSize = info.cover ? info.cover.split('/') : null
  // 原始图片的宽高比
  // const originRatio = originSize
  //   ? Number(
  //       (
  //         Number(originSize[originSize.length - 2]) /
  //         Number(originSize[originSize.length - 1])
  //       ).toFixed(2)
  //     )
  //   : 1

  // // 节点的宽高比
  // const articleNodeRatio = Number(
  //   (articleSize.width / articleSize.height).toFixed(2)
  // )
  // // 超出阈值 0.3
  // const exceed = Math.abs(articleNodeRatio - originRatio) - 0.3
  // if (exceed > 0) {
  //   // 超出比例后重新计算高度，防止图片变形
  //   articleSize['height'] = articleSize.width / (articleNodeRatio - exceed)
  // }
  // return {
  //   width: `${articleSize.width}px`,
  //   height: `${articleSize.height}px`,
  // }
})
console.log(info)
// mobile-end cover
const isMobileCover = computed(() => info.mobileCover && isMobile.value)
// pc-end cover
const isPcCover = computed(() => info.cover && !isMobile.value)

const hasCover = computed(() => isPcCover.value || isMobileCover.value)
// pc normal article
const isPcNormalArticle = computed(() => !isMobile.value && !isPcCover.value)

// cover url，take priority mobileCover
const coverUrl = computed(() => info.mobileCover && info.cover)

const articleContainerStyle = computed<CSSProperties>(() =>
  hasCover.value ? { height: 'calc(170px)' } : {}
)

const articleTextStyle = computed<CSSProperties>(() => {
  if (isPcNormalArticle.value) return { width: '100%', padding: '0.5rem 1rem' }
  return isPcCover.value
    ? {
        maxWidth: '60%',
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
    <Image
      v-if="info.cover && isMobile"
      class="mobile-article-cover"
      :src="info.cover"
      alt="article-cover"
    />
    <div
      class="article-item"
      :style="articleContainerStyle"
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
          v-if="showCoverInfo"
          class="cover-info-text"
          v-html="excerptContent"
        />
        <ArticleInfo :info="info" :showTag="showTag" />
      </div>
      <Image
        v-if="hasCover"
        class="article-cover"
        :src="coverUrl"
        alt="article-cover"
        :style="pcImgSize"
      />
    </div>
  </article>
</template>
