<script setup lang="ts">
import AutoLink from '@theme-zp-client/components/AutoLink.vue'
import DropdownTransition from '@theme-zp-client/components/DropdownTransition.vue'
import {
  IconNameMap,
  isActiveSidebarItem,
} from '@theme-zp-client/utils/index.js'
import type { ResolvedSidebarItem } from '@theme-zp-src/shared/index.js'
import { useToggle } from '@vueuse/core'
import { computed, nextTick, onBeforeUnmount, toRefs } from 'vue'
import type { PropType } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import cssVars from '../styles/_variables.module.scss?module'

const props = defineProps({
  item: {
    type: Object as PropType<ResolvedSidebarItem>,
    required: true,
  },
  depth: {
    type: Number,
    required: false,
    default: 0,
  },
})

const { item, depth } = toRefs(props)
const route = useRoute()
const router = useRouter()

const isActive = computed(() => isActiveSidebarItem(item.value, route))
const itemClass = computed(() => ({
  'sidebar-item': true,
  'sidebar-heading': depth.value === 0,
  'active': isActive.value,
  'collapsible': item.value.collapsible,
}))

const isOpenDefault = computed(() =>
  item.value.collapsible ? isActive.value : true
)
const [isOpen, toggleIsOpen] = useToggle(isOpenDefault.value)
const onClick = (e: Event): void => {
  if (item.value.collapsible) {
    e.preventDefault()
    // toggle open status on click
    toggleIsOpen()
  }
}

// reset open status after navigation
const unregisterRouterHook = router.afterEach((to) => {
  nextTick(() => {
    isOpen.value = isOpenDefault.value
  })
})
onBeforeUnmount(() => {
  unregisterRouterHook()
})
</script>

<template>
  <li>
    <AutoLink v-if="item.link" :class="itemClass" :item="item" />
    <button
      v-else
      tabindex="0"
      :class="itemClass"
      @click="onClick"
      @keydown.enter="onClick"
    >
      {{ item.text }}
      <ZpIcons
        v-if="item.collapsible"
        :icon="IconNameMap['arrowDown']"
        class="arrow"
        :iconSize="cssVars.sidebarIconSize"
        :class="isOpen ? 'arrow-open' : 'arrow'"
      />
    </button>

    <DropdownTransition v-if="item.children?.length">
      <ul v-show="isOpen" class="sidebar-item-children">
        <SidebarItem
          v-for="child in item.children"
          :key="`${depth}${child.text}${child.link}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </DropdownTransition>
  </li>
</template>
