import { Icon, iconExists, loadIcons } from '@iconify/vue'
import { ClientOnly } from '@vuepress/client'
import {
  computed,
  CSSProperties,
  defineComponent,
  h,
  onUnmounted,
  ref,
  toRefs,
  watch,
  withModifiers,
} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ZpIcons',
  components: {},
  props: {
    icon: {
      type: String,
      default: '',
    },
    iconPosition: {
      type: String,
      // ['left', 'right', 'top', 'bottom',]
      default: 'left',
    },
    iconSize: {
      type: [String, Number],
      default: 1,
    },
    iconColor: {
      type: String,
      default: 'inherit',
    },
    iconProps: {
      type: Object,
      default: () => ({}),
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
      default: 0.9,
    },
    link: {
      type: String,
      default: '',
    },
    target: {
      type: String,
      default: '_self',
    },
  },

  setup(props, { slots, attrs }) {
    const {
      icon,
      link,
      iconPosition,
      iconSize,
      iconColor,
      iconProps,
      textColor,
      textSize,
      text,
    } = toRefs(props)

    const containerTag = 'div'
    // https://icon-sets.iconify.design/mdi
    // Material Design Icons 的前缀
    const ICON_PREFIX = 'mdi:'

    // Variable to store function to cancel loading
    const loaderAbort = ref()
    // Icon status
    const loaded = ref()

    const router = useRouter()

    const iconStyle = computed(() => {
      return {
        color: iconColor.value,
        width: `${iconSize.value}rem`,
        height: `${iconSize.value}rem`,
        fontSize: `${iconSize.value}rem`,
      }
    })

    const iconName = computed(() =>
      icon.value.includes(':') ? icon.value : `${ICON_PREFIX}${icon.value}`
    )

    const curText = computed(() => text.value || slots.default?.())

    const textStyle = computed<CSSProperties>(() => {
      const cssObj = {
        color: textColor.value,
        fontSize: `${textSize.value}rem`,
      }
      if (!loaded.value) {
        cssObj['marginLeft'] = '0 !important'
      } else {
        delete cssObj['marginLeft']
      }
      return cssObj
    })

    const toPage = (): void => {
      link.value && router.push(link.value)
    }

    // Function to check if icon data is available
    const check = (icon: string): void => {
      const isLoaded = (loaded.value = iconExists(icon))

      // Cancel old loader
      if (loaderAbort.value) {
        loaderAbort.value()
        loaderAbort.value = null
      }

      if (!isLoaded) {
        // 保存取消方法
        loaderAbort.value = loadIcons([icon], () => {
          loaded.value = iconExists(icon)
        })
      }
    }

    watch(
      () => iconName.value,
      (value) => {
        check(value)
      },
      { immediate: true }
    )

    // Stop loading
    onUnmounted(() => {
      const loaderAbortFn = loaderAbort.value
      if (loaderAbortFn) {
        loaderAbortFn()
      }
    })

    return () => {
      if (!loaded.value && !curText.value) return null

      if (link.value || curText.value) {
        return h(
          containerTag,
          {
            ...attrs,
            class: ['icon-container', iconPosition.value],
            style: {
              lineHeight: `${Number(iconSize.value) + 0.5}rem`,
              cursor: link.value ? 'pointer' : '',
            },
            onClick: link.value
              ? withModifiers(toPage, ['stop', 'prevent'])
              : {},
          },
          h(ClientOnly, null, () => [
            loaded.value
              ? h(Icon, {
                  icon: iconName.value,
                  style: iconStyle.value,
                  ...iconProps.value,
                })
              : null,
            h(
              'span',
              { style: textStyle.value, class: 'icon-text' },
              curText.value
            ),
          ])
        )
      }

      return h(ClientOnly, null, () =>
        h(Icon, {
          ...attrs,
          icon: iconName.value,
          style: iconStyle.value,
        })
      )
    }
  },
})
