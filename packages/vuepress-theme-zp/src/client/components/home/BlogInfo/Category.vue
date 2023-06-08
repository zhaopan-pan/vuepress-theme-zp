<script setup lang="ts">
import { useCategory } from '@theme-zp-client/composables/index.js'
import Tags from '../../tag/Tags.vue'

const category = useCategory()
</script>

<template>
  <div class="category-info">
    <ZpIcons icon="FolderRegular" iconSize="1">分类</ZpIcons>
    <Tags :tagMap="category" blog-key="category" />
  </div>
</template>

<style scoped lang="scss"></style>
