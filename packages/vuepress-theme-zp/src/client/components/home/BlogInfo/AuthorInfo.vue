<script setup lang="ts">
import { useThemeData } from '../../../composables/index.js'
import Avatar from '../Avatar.vue'

const themeData = useThemeData()

const blogInfo = themeData.value?.blog || null

const toExternal = (link: string): unknown => link && window.open(link)
</script>

<template>
  <div v-if="blogInfo" class="author-info">
    <Avatar />
    <div class="author-name">{{ blogInfo.name || '' }}</div>
    <div class="blog-external">
      <span
        v-for="(item, index) in blogInfo?.externalLinkList || []"
        :key="index"
        v-tooltip.arrow="item.text"
        class="blog-external-icon"
      >
        <img :src="item.icon" @click="toExternal(item.url)" />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
