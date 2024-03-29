<script setup lang="ts">
import {
  DeviceType,
  useUpdateDeviceStatus,
} from '@theme-zp-client/composables/index.js'
import { computed, type CSSProperties, ref } from 'vue'

const emit = defineEmits<{
  (e: 'onChange', currentPage: number, pageSize: number): void
}>()

const props = defineProps({
  total: { type: Number, default: 10 },
  pageSize: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 },
  className: { type: String, default: '' },
})

// 跳转指定页码
const changePage = ref<number>()
const isMobile = ref(false)

const pages = computed(() => {
  return Math.ceil(props.total / props.pageSize)
})
const showComponent = computed(() => {
  return props.total > props.pageSize && pages.value > 1
})
const showStartFakePageNum = computed(() => {
  return isMany.value && !pageNumbers.value.includes(1)
})
const showLastFakePageNum = computed(() => {
  return isMany.value && !pageNumbers.value.includes(pages.value)
})
const isMany = computed(() => {
  return pages.value > 5
})

const pageNumbers = computed(() => {
  let left = 1
  let right = pages.value
  const ar: number[] = []
  if (pages.value >= 7) {
    if (props.currentPage > 5 && props.currentPage + 4 < pages.value) {
      left = Number(props.currentPage) - 3
      right = Number(props.currentPage) + 3
    } else {
      if (props.currentPage <= 5) {
        left = 1
        right = 7
      } else {
        right = pages.value

        left = pages.value - 6
      }
    }
  }
  while (left <= right) {
    ar.push(left)
    left++
  }
  return ar
})

useUpdateDeviceStatus(DeviceType.MOBILE, (width: number): void => {
  isMobile.value = window.innerWidth < width
})

const paginationStyle = computed<CSSProperties>(() => {
  if (isMobile.value) {
    return { flexWrap: 'wrap' }
  }
  return { flexWrap: 'initial' }
})
const showJump = pages.value > 5

const keypress = (e: KeyboardEvent): void => {
  if (e.key === 'Enter' && e?.target && e.target['value']) {
    jumpPage(Number(e.target['value']))
  }
}

const goPrev = (): void => {
  let cp = props.currentPage
  if (props.currentPage > 1) {
    change(--cp)
  }
}

const goNext = (): void => {
  let cp = props.currentPage
  if (props.currentPage < pages.value) {
    change(++cp)
  }
}

const jumpPage = (num?: number): void => {
  if (!num || !String(num).trim()) {
    alert(`请输入页码！`)
    return
  }
  if (num <= pages.value) {
    change(num)
    return
  }
  alert(`请输入小于${pages.value}的页码！`)
}

const change = (num: number): void => {
  emit('onChange', num, props.pageSize)
}
</script>

<template>
  <div
    v-if="showComponent"
    class="pagination"
    :class="props.className"
    :style="paginationStyle"
  >
    <div class="pagination-list" :style="{ flex: !showJump ? '1' : 'none' }">
      <button
        :disabled="currentPage === 1"
        class="operation-btn"
        @click="goPrev"
      >
        <ZpIcons icon="ChevronBack" iconSize="0.9" />
      </button>
      <span v-show="showStartFakePageNum" class="jump" @click="jumpPage(1)">
        1
      </span>
      <span
        v-show="showStartFakePageNum && pageNumbers[0] > 2"
        class="ellipsis"
      >
        ...
      </span>
      <span
        v-for="num in pageNumbers"
        :key="num"
        class="jump"
        :class="{ curJumpItem: currentPage == num }"
        @click="jumpPage(num)"
        >{{ num }}</span
      >
      <span
        v-show="showLastFakePageNum && pages - (pageNumbers.at(-1) as number) > 1"
        class="ellipsis"
      >
        ...
      </span>
      <span
        v-show="showLastFakePageNum"
        class="jump"
        @click="jumpPage(pages)"
        >{{ pages }}</span
      >
      <button
        :disabled="currentPage >= pages"
        class="operation-btn"
        @click="goNext"
      >
        <ZpIcons icon="ChevronForward" iconSize="0.9" />
      </button>
    </div>
    <div
      v-show="showJump"
      class="jump-container"
      :style="{ flex: isMobile ? '1' : 'none' }"
    >
      <!-- <span class="jumpPoint">跳转到：</span> -->
      <span class="jumping">
        <input v-model="changePage" type="text" @keypress="keypress" />
      </span>
      <span class="jump go-page" @click="jumpPage(Number(changePage))">GO</span>
    </div>
  </div>
</template>
