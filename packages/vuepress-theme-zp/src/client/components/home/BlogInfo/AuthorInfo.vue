<script setup lang="ts">
import { useThemeData } from '../../../composables/index.js'

const themeData = useThemeData()

const blogInfo = themeData.value?.blog || null

const toExternal = (link: string): unknown => link && window.open(link)
</script>

<template>
  <div v-if="blogInfo" class="author-info">
    <img
      class="author-logo"
      :src="blogInfo.avatar || ''"
      alt="logo"
      srcset=""
    />
    <div class="author-name">{{ blogInfo.name || '' }}</div>
    <div class="blog-external">
      <span
        v-for="(item, index) in blogInfo?.externalLinkList || []"
        :key="index"
        v-tooltip.arrow="item.text"
      >
        <img
          :src="item.icon"
          class="blog-external-icon"
          @click="toExternal(item.url)"
        />
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
