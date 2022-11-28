<script setup lang="ts">
import NavbarItems from '@zpTheme/NavbarItems.vue'
import SidebarItems from '@zpTheme/SidebarItems.vue'
</script>

<template>
  <aside class="sidebar">
    <NavbarItems />
    <slot name="top" />
    <SidebarItems />
    <slot name="bottom" />
  </aside>
</template>
