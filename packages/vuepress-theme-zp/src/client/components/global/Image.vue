<script lang="ts">
import { useThemeData } from '@theme-zp-client/composables/index.js'
import { computed, onBeforeMount, onMounted, ref, useAttrs } from 'vue'
export default {
  // 禁用属性透传
  inheritAttrs: false,
}
type IAttrs = {
  class?: string
  src?: string
  height?: string
  width?: string
}
</script>
<script setup lang="ts">
// cache state value
const CACHE_STATE = '1'

const attrs: IAttrs = useAttrs()
const themeData = useThemeData()

const imgRef = ref<HTMLImageElement | null>(null)
const loadingDone = ref(false)
const loadFailed = ref(false)

const defaultArticleCover = themeData.value?.defaultArticleCover || ''
onBeforeMount(() => {
  // is there cache
  if (attrs.src && isLoaded.value) {
    loadingDone.value = true
  }
})

onMounted(() => {
  // 说明图片已完成解码（图片已缓存onload不执行，所以用这个api）
  imgRef.value
    ?.decode()
    .then(() => {
      loadingDone.value = true
    })
    .catch((encodingError) => {
      console.error(encodingError)
      loadingDone.value = true
      loadFailed.value = true
    })
})

// 设置缓存主要是为了记录初次加载成功，只有初次才显示淡入的效果，后面有缓存就直接展示
const setLoadedCache = (): void => {
  sessionStorage.setItem(attrs?.src as string, CACHE_STATE)
}

const isLoaded = computed(
  () => sessionStorage.getItem(attrs?.src || '') === CACHE_STATE
)

const finallyUrl = computed(() => {
  return loadFailed.value
    ? defaultArticleCover
    : attrs.src || defaultArticleCover
})

// container class
const loadingContainerClass = computed(() => {
  return `${attrs.class || ''}
  zp-img-container
  ${!loadingDone.value ? 'zp-img-skeleton' : ''}`
})

// custom inline style
const loadingContainerStyle = computed(() => {
  return attrs.height && attrs.width
    ? {
        height: `${attrs.height}px`,
        width: `${attrs.width}px`,
        minHeight: `${attrs.height}px !important`,
      }
    : undefined
})

// img class
const imgClass = computed(() => {
  // 如果已经加载且成功过，会取缓存，所以不展示动画
  return loadingDone.value ? 'img-loaded-animation' : 'img-loading-animation'
})

// ⚡️ 浏览器缓存图片的情况下不会执行
const onLoaded = (): void => {
  loadingDone.value = true
  setLoadedCache()
}

const onErr = (_err: Event): void => {
  loadFailed.value = true
  if (__VUEPRESS_DEV__) {
    throw new Error(`image loading failed`)
  }
}
</script>

<template>
  <div :class="loadingContainerClass" :style="loadingContainerStyle">
    <img
      ref="imgRef"
      alt="img"
      class="zp-img"
      v-bind="$attrs"
      :src="finallyUrl"
      :onload="onLoaded"
      :onerror="onErr"
      :class="imgClass"
    />
  </div>
</template>
