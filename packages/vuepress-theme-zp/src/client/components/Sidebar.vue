<script setup lang="ts">
import SidebarItems from '@zpTheme/SidebarItems.vue'
import { computed } from 'vue';
import {
  useSidebarItems,
} from '../composables/index.js'
import { useRoute } from 'vue-router';

const route = useRoute()
const sidebarItems = useSidebarItems()
console.log('route.meta:', route.meta);
const needSidebar = computed(() => sidebarItems.value.length && sidebarItems.value[0].text && sidebarItems.value[0].children?.length)

</script>

<template>
  <aside class="sidebar" v-if="needSidebar">
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
