<script setup lang="ts">
import SidebarItem from '@theme-zp-client/components/SidebarItem.vue'
import { computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSidebarItems } from '@theme-zp-client/composables/index.js'
import { getFirstLayerSideBarData } from '@theme-zp-client/utils/index.js'

const route = useRoute()
const sidebarItems = useSidebarItems()
onMounted(() => {
  watch(
    () => route.hash,
    (hash) => {
      // get the sidebar DOM
      const sidebar = document.querySelector('.sidebar')
      if (!sidebar) return

      // get the active sidebar item DOM, whose href equals to the current route
      const activeSidebarItem = document.querySelector(
        `.sidebar a.sidebar-item[href="${route.path}${hash}"]`
      )
      if (!activeSidebarItem) return

      // get the top and height of the sidebar
      const { top: sidebarTop, height: sidebarHeight } =
        sidebar.getBoundingClientRect()
      // get the top and height of the active sidebar item
      const { top: activeSidebarItemTop, height: activeSidebarItemHeight } =
        activeSidebarItem.getBoundingClientRect()

      // when the active sidebar item overflows the top edge of sidebar
      if (activeSidebarItemTop < sidebarTop) {
        // scroll to the top edge of sidebar
        activeSidebarItem.scrollIntoView(true)
      }
      // when the active sidebar item overflows the bottom edge of sidebar
      else if (
        activeSidebarItemTop + activeSidebarItemHeight >
        sidebarTop + sidebarHeight
      ) {
        // scroll to the bottom edge of sidebar
        activeSidebarItem.scrollIntoView(false)
      }
    }
  )
})
// 从sidebarItems这个树结构数据中只保留前两层数据
const sidebarData = computed(() => getFirstLayerSideBarData(sidebarItems.value))
</script>

<template>
  <ul v-if="sidebarData.length" class="sidebar-items">
    <SidebarItem
      v-for="item in sidebarData"
      :key="`${item.text}${item.link}`"
      :item="item"
    />
  </ul>
</template>
