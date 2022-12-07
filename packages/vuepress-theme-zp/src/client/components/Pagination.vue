<template>
  <div class="pagination" v-show="show">
    <div class="pagination-list">
      <span
        class="jump"
        v-show="currentPage > 1"
        @click="goPrev"
        unselectable="on"
        >Prev</span
      >
      <span v-show="manyPage" class="jump" @click="jumpPage(1)">1</span>
      <span class="ellipsis" v-show="manyPage">...</span>
      <span
        class="jump"
        v-for="num in pageNumbers"
        :key="num"
        :class="{ jumpItem: currentPage == num }"
        @click="jumpPage(num)"
        >{{ num }}</span
      >
      <span class="ellipsis" v-show="manyPage && currentPage < pages - 4"
        >...</span
      >
      <span
        v-show="manyPage && currentPage < pages - 4"
        class="jump"
        @click="jumpPage(pages)"
        >{{ pages }}</span
      >
      <span class="jump" v-show="currentPage < pages" @click="goNext"
        >next</span
      >
      <span class="jumpPoint">跳转到：</span>
      <span class="jumping">
        <input type="text" v-model="changePage" />
      </span>
      <span class="jump gobtn" @click="jumpPage(Number(changePage))">GO</span>
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
const show = computed(() => {
  return total > pageSize
})
const manyPage = computed(() => {
  if (pages.value <= 7) return false
  return props.currentPage > 5
})

console.log('pages:', pages.value)
console.log('currentPage:', props.currentPage)
console.log('manyPage:', manyPage.value)
const pageNumbers = computed(() => {
  let left = 1
  let right = pages.value
  let ar: number[] = []
  if (pages.value >= 7) {
    if (props.currentPage > 5 && props.currentPage < pages.value - 4) {
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
  console.log(ar)
  return ar
})

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
