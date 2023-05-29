<script setup lang="ts">
import type { IArticleItem } from '@theme-zp-src/shared/index.js'
import { computed, PropType, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DeviceType, useUpdateDeviceStatus } from '../../composables/index.js'
import ArticleInfo from './ArticleInfo.vue'

const router = useRouter()
// show narrow mobile cover image
const showMobileNarrowCover = ref(false)

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
</script>
<template>
  <article class="article-item-container cp" @click="toDetail">
    <Image
      v-if="info.cover && showMobileNarrowCover"
      class="mobile-article-cover"
      :src="info.cover"
      alt="article-cover"
    />
    <div class="article-item">
      <div v-show="info.title" class="article-name">
        {{ info.title }}
      </div>
      <div class="cover-info">
        <div
          v-if="showCoverInfo"
          class="cover-info-text"
          v-html="excerptContent"
        />
        <Image
          v-if="info.cover && !showMobileNarrowCover"
          class="article-cover"
          :src="info.cover"
          alt="article-cover"
        />
      </div>
      <ArticleInfo :info="info" :showTag="showTag" />
    </div>
  </article>
</template>
