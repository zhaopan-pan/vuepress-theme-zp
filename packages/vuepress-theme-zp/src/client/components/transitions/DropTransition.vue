<template>
  <TransitionGroup @enter="onEnter" @after-enter="onAfterEnter">
    <slot />
  </TransitionGroup>
</template>

<script setup lang="ts">
const onEnter = (item): void => {
  item.style.transition = `transform ${0.1}s ease-in-out ${0.1}s, opacity ${0.1}s ease-in-out ${0.1}s`
  item.style.transform = 'translateY(-20px)'
  item.style.opacity = '0'
}

const onAfterEnter = (item): void => {
  item.style.transform = 'translateY(0px)'
  item.style.opacity = '1'
}
</script>

<style scoped></style>
