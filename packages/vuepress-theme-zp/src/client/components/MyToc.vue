<template>
  <div class="zp-toc">
    <Toc :options="options" />
  </div>
</template>

<script setup lang="ts">
const options = {
  containerClass: 'table-of-contents',
  linkActiveClass: 'zp-link-active-class',
}
</script>

<style scoped></style>
