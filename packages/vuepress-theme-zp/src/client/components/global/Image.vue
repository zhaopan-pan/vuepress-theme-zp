<script setup lang="ts">
import { computed, ref, useAttrs } from 'vue'

// TODO 通过配置项来设置默认图
const defaultImg = 'https://picsum.photos/id/48/740/300'

const loadingDone = ref(false)
const loadFailed = ref(false)
const attrs = useAttrs()
const finallyUrl = computed(() =>
  loadFailed.value ? defaultImg : (attrs.src as string) || defaultImg
)
const loadingContainerClass = computed(() => {
  return `${attrs.class} ${!loadingDone.value ? 'zp-img-container' : ''}`
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
      v-bind="$attrs"
      :onload="onLoaded"
      :onerror="onErr"
      :src="finallyUrl"
      loading="lazy"
      class="zp-img"
      :class="loadingDone ? 'img-loaded' : 'img-loading'"
    />
  </div>
</template>
