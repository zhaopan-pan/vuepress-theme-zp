<script setup lang="ts">
import { useThemeData } from '@theme-zp-client/composables/index.js'

const themeData = useThemeData()
const url = themeData.value.blog?.homeTopBg
// ('https://images.pexels.com/photos/3695297/pexels-photo-3695297.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')
// 'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
// 'https://images.pexels.com/photos/1591056/pexels-photo-1591056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
</script>

<template>
  <div
    :class="url ? 'home-bg' : ''"
    :style="{
      backgroundImage: `url(${url})`,
    }"
  ></div>
</template>

<style scoped lang="scss"></style>
