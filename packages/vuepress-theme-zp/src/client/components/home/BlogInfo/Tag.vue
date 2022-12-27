<template>
  <div class="tag-info">
    <ZpIcons icon="Tag" iconSize="1">标签</ZpIcons>
    <Tags :tagMap="tagMap" blog-key="tag" />
  </div>
</template>

<script setup lang="ts">
import { useTag } from '../../../composables/index.js'
import Tags from '../../tag/Tags.vue'

const tagMap = useTag()
</script>

<style scoped lang="scss"></style>
