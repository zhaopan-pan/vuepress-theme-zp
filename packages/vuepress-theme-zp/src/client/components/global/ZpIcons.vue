<template>
  <a
    v-if="link"
    :class="['icon-container', iconPosition]"
    :href="link"
    :target="target"
  >
    <component v-if="icon" :style="iconStyle" :is="icons[icon]" />
    <span v-if="text || $slots.default" :style="textStyle" class="icon-text">
      <slot>{{ text }}</slot>
    </span>
  </a>
  <component v-else :style="iconStyle" :is="icons[icon]" />
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue'
import * as materialIcons from '@vicons/material'
import * as faIcons from '@vicons/fa'

const icons = { ...faIcons, ...materialIcons }

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  iconPosition: {
    type: String, // ['left', 'right', 'top', 'bottom',]
    default: 'left',
  },
  iconSize: {
    type: [String, Number],
    default: 18,
  },
  iconColor: {
    type: String,
    default: 'inherit',
  },
  text: {
    type: String,
    default: '',
  },
  textColor: {
    type: String,
    default: 'inherit',
  },
  textSize: {
    type: [String, Number],
    default: '14',
  },
  link: {
    type: String,
    default: '',
  },
  target: {
    type: String,
    default: '_self',
  },
})

const { icon, iconSize, iconColor, textColor, textSize } = toRefs(props)

const iconStyle = computed(() => {
  return {
    color: iconColor.value,
    width: `${iconSize.value}px`,
    height: `${iconSize.value}px`,
    fontSize: `${iconSize.value}px`,
  }
})

const textStyle = computed(() => {
  return { color: textColor.value, fontSize: `${textSize.value}px` }
})
</script>

<style lang="scss">
.icon-container {
  display: flex;

  &.left {
    /* @apply flex-row items-center; */
    display: flex;
    flex-direction: row;
    align-items: center;

    flex > .icon-text {
      // @apply ml-1.5;
      margin-left: 15px;
    }
  }

  &.right {
    display: flex;
    flex-direction: row-reverse;
    align-content: center;

    > .icon-text {
      margin-right: 15px;
    }
  }

  &.top {
    display: flex;
    flex-direction: column;
    align-items: center;

    > .icon-text {
      margin-top: 15px;
    }
  }

  &.bottom {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;

    > .icon-text {
      margin-bottom: 15px;
    }
  }
}
</style>
