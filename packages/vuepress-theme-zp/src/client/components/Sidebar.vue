<script setup lang="ts">
import NavbarItems from '@theme-zp-client/components/NavbarItems.vue'
import SidebarItems from '@theme-zp-client/components/SidebarItems.vue'
</script>

<template>
  <aside class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
