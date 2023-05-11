<script lang="ts">
import { computed, onBeforeMount, ref, useAttrs, watch } from 'vue'
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
// TODO 通过配置项来设置默认图
const defaultImg = 'https://picsum.photos/id/48/740/300'
// cache state
const CACHE_STATE = '1'

const imgRef = ref<HTMLImageElement | null>(null)
const attrs: IAttrs = useAttrs()
const loadingDone = ref(false)
const loadFailed = ref(false)
// 图片是否有缓存
const hasCache = ref(false)

onBeforeMount(() => {
  // is there cache
  if (attrs.src && isLoaded.value) {
    hasCache.value = true
  }
})

watch(
  () => [imgRef?.value?.complete],
  () => {
    // 如果加载完成,且没有加载失败,但是却没有触发onload修改loadingDone
    // 这种情况是从缓存中获取的img，需手动调用onload刷新状态
    if (imgRef?.value?.complete && !loadingDone.value && !loadFailed.value) {
      console.log('--------------')
      onLoaded()
    }
  }
)

const setLoadedCache = (): void => {
  sessionStorage.setItem(attrs?.src as string, CACHE_STATE)
}

const isLoaded = computed(
  () => sessionStorage.getItem(attrs?.src || '') === CACHE_STATE
)

const finallyUrl = computed(() => {
  return loadFailed.value ? defaultImg : attrs.src || defaultImg
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
  if (hasCache.value) return ''
  return loadingDone.value ? 'img-loaded-animation' : 'img-loading-animation'
})

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
      :onload="onLoaded"
      :onerror="onErr"
      loading="lazy"
      class="zp-img"
      v-bind="$attrs"
      :src="finallyUrl"
      :class="imgClass"
    />
  </div>
</template>
