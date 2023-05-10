<script lang="ts">
import { computed, ref, useAttrs } from 'vue'
export default {
  // 禁用属性透传
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
// TODO 通过配置项来设置默认图
const defaultImg = 'https://picsum.photos/id/48/740/300'

const attrs = useAttrs()
const loadingDone = ref(false)
const loadFailed = ref(false)

const finallyUrl = computed(() =>
  loadFailed.value ? defaultImg : (attrs.src as string) || defaultImg
)

const loadingContainerClass = computed(() => {
  return `${attrs.class}
  zp-img-container
  ${!loadingDone.value ? 'zp-img-skeleton' : ''}`
})

const onLoaded = (): void => {
  loadingDone.value = true
}

const onErr = (_err: Event): void => {
  loadFailed.value = true
  if (__VUEPRESS_DEV__) {
    throw new Error(`image loading failed`)
  }
}
</script>

<template>
  <div :class="loadingContainerClass">
    <img
      alt="img"
      :onload="onLoaded"
      :onerror="onErr"
      :src="finallyUrl"
      loading="lazy"
      class="zp-img"
      v-bind="$attrs"
      :class="loadingDone ? 'img-loaded' : 'img-loading'"
    />
  </div>
</template>
