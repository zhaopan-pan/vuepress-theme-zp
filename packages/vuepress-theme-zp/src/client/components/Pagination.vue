<template>
  <div class="pagination" v-show="showComponent">
    <div class="pagination-list">
      <button
        :disabled="currentPage === 1"
        class="operation-btn"
        @click="goPrev"
      >
        <ZpIcons icon="ChevronLeftFilled" iconSize="1.3" />
      </button>
      <span v-show="showStartFakePageNum" class="jump" @click="jumpPage(1)">
        1
      </span>
      <span class="ellipsis" v-show="showStartFakePageNum"> ... </span>
      <span
        class="jump"
        v-for="num in pageNumbers"
        :key="num"
        :class="{ curJumpItem: currentPage == num }"
        @click="jumpPage(num)"
        >{{ num }}</span
      >
      <span class="ellipsis" v-show="showLastFakePageNum"> ... </span>
      <span
        v-show="showLastFakePageNum"
        class="jump"
        @click="jumpPage(pages)"
        >{{ pages }}</span
      >
      <button
        class="operation-btn"
        @click="goNext"
        :disabled="currentPage >= pages"
      >
        <ZpIcons icon="KeyboardArrowRightFilled" iconSize="1.3" />
      </button>
      <span class="jumpPoint">跳转到：</span>
      <span class="jumping">
        <input type="text" v-model="changePage" @keypress="keypress" />
      </span>
      <span class="jump go-page" @click="jumpPage(Number(changePage))">GO</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
const emit = defineEmits<{
  (e: 'getCurrentPage', v: number): void
}>()

const props = defineProps({
  total: { type: Number, default: 10 },
  pageSize: { type: Number, default: 10 },
  currentPage: { type: Number, default: 1 },
})
const { total, pageSize } = props

// 跳转指定页码
const changePage = ref<number>()

const pages = computed(() => {
  return Math.ceil(total / pageSize)
})
const showComponent = computed(() => {
  return total > pageSize
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

console.log('pages:', pages.value)
console.log('currentPage:', props.currentPage)
console.log('isMany:', isMany.value)
const pageNumbers = computed(() => {
  let left = 1
  let right = pages.value
  let ar: number[] = []
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
  console.log('pageNumbers:', ar)
  return ar
})

const keypress = (e: KeyboardEvent) => {
  console.log(e)
  if (e.keyCode === 13 && e?.target) {
    // e.target?.value && jumpPage(e.target?.value)
  }
}

const goPrev = () => {
  let cp = props.currentPage
  if (props.currentPage > 1) {
    change(--cp)
  }
}

const goNext = () => {
  let cp = props.currentPage
  if (props.currentPage < pages.value) {
    change(++cp)
  }
}

const jumpPage = (num?: number) => {
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

const change = (num: number) => {
  emit('getCurrentPage', num)
}
</script>
