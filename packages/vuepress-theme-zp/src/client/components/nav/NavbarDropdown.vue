<script setup lang="ts">
import AutoLink from '@theme-zp-client/components/AutoLink.vue'
import DropdownTransition from '@theme-zp-client/components/DropdownTransition.vue'
import { useMenuToggle } from '@theme-zp-client/composables/index.js'
import type {
  NavbarItem,
  ResolvedNavbarItem,
} from '@theme-zp-src/shared/index.js'
import { computed, ref, toRefs, watch } from 'vue'
import type { PropType } from 'vue'
import { useRoute } from 'vue-router'

const props = defineProps({
  item: {
    type: Object as PropType<Exclude<ResolvedNavbarItem, NavbarItem>>,
    required: true,
  },
})

// eslint-disable-next-line vue/no-dupe-keys
const { item } = toRefs(props)

const open = ref(false)
const route = useRoute()
const { toggleMobileMenu } = useMenuToggle()

const dropdownAriaLabel = computed(
  () => item.value.ariaLabel || item.value.text
)

watch(
  () => route.path,
  () => {
    open.value = false
  }
)

/**
 * Open the dropdown when user tab and click from keyboard.
 *
 * Use event.detail to detect tab and click from keyboard.
 * The Tab + Click is UIEvent > KeyboardEvent, so the detail is 0.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail
 */
const handleDropdown = (e): void => {
  const isTriggerByTab = e.detail === 0
  if (isTriggerByTab) {
    open.value = !open.value
  } else {
    open.value = false
  }
}

const isLastItemOfArray = (item: unknown, arr: unknown[]): boolean =>
  arr[arr.length - 1] === item
</script>

<template>
  <div class="navbar-dropdown-wrapper" :class="{ open }">
    <button
      class="navbar-dropdown-title"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="handleDropdown"
    >
      <span class="title">{{ item.text }}</span>
      <!-- <span class="arrow down" /> -->
      <ZpIcons icon="KeyboardArrowDownRound" iconSize="1" class="arrow" />
    </button>

    <button
      class="navbar-dropdown-title-mobile"
      type="button"
      :aria-label="dropdownAriaLabel"
      @click="open = !open"
    >
      <span class="title">{{ item.text }}</span>
      <ZpIcons
        icon="KeyboardArrowDownRound"
        iconSize="1"
        :class="open ? 'arrow-mobile-open' : 'arrow-mobile'"
      />
    </button>

    <DropdownTransition>
      <ul :class="{ 'navbar-dropdown': true, 'open-navbar-dropdown': open }">
        <li
          v-for="child in item.children"
          :key="child.text"
          class="navbar-dropdown-item"
        >
          <template v-if="child.children">
            <h4 class="navbar-dropdown-subtitle">
              <AutoLink
                v-if="child.link"
                :item="child"
                @click="toggleMobileMenu"
                @focusout="
                  isLastItemOfArray(child, item.children) &&
                    child.children.length === 0 &&
                    (open = false)
                "
              />

              <span v-else>{{ child.text }}</span>
            </h4>

            <ul class="navbar-dropdown-subitem-wrapper">
              <li
                v-for="grandchild in child.children"
                :key="grandchild.link"
                class="navbar-dropdown-subitem"
              >
                <AutoLink
                  :item="grandchild"
                  @click="toggleMobileMenu"
                  @focusout="
                    isLastItemOfArray(grandchild, child.children) &&
                      isLastItemOfArray(child, item.children) &&
                      (open = false)
                  "
                />
              </li>
            </ul>
          </template>

          <template v-else>
            <AutoLink
              :item="child"
              @click="toggleMobileMenu"
              @focusout="
                isLastItemOfArray(child, item.children) && (open = false)
              "
            />
          </template>
        </li>
      </ul>
    </DropdownTransition>
  </div>
</template>