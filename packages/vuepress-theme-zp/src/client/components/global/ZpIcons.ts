import type ionicons5Icons from '@vicons/ionicons5'
import {
  Component,
  computed,
  defineComponent,
  h,
  markRaw,
  onMounted,
  PropType,
  reactive,
  toRefs,
  withModifiers,
} from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ZpIcons',
  components: {},
  props: {
    icon: {
      type: String as PropType<keyof typeof ionicons5Icons>,
      default: '',
    },
    iconPosition: {
      type: String, // ['left', 'right', 'top', 'bottom',]
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

  setup(props, { slots }) {
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

    const state = reactive<{ iconNode: Component | null }>({
      iconNode: null,
    })
    const router = useRouter()
    const iconStyle = computed(() => {
      return {
        color: iconColor.value,
        width: `${iconSize.value}rem`,
        height: `${iconSize.value}rem`,
        fontSize: `${iconSize.value}rem`,
      }
    })

    const curText = computed(() => text.value || slots.default?.())

    const textStyle = computed(() => {
      return {
        color: textColor.value,
        fontSize: `${textSize.value}rem`,
        // lineHeight: `${textSize.value}rem`,
      }
    })

    onMounted(() => {
      initIcon()
    })

    const initIcon = async (): Promise<void> => {
      if (!icon.value) return
      try {
        const { [icon.value]: iconCom } = await import('@vicons/ionicons5')
        if (iconCom) {
          // markRaw 将一个对象标记为不可被转为代理。返回该对象本身。
          state.iconNode = markRaw(iconCom)
        }
      } catch (error) {
        console.log(error)
      }
    }

    const toPage = (): void => {
      link.value && router.push(link.value)
    }

    const containerTag = 'div'

    return () => {
      if (!state.iconNode) return null

      if (link.value || curText.value) {
        return h(
          containerTag,
          {
            class: ['icon-container', iconPosition.value],
            style: {
              lineHeight: `${Number(iconSize.value) + 0.5}rem`,
              cursor: link.value ? 'pointer' : '',
            },
            onClick: withModifiers(toPage, ['stop', 'prevent']),
          },
          [
            h(state.iconNode, {
              style: iconStyle.value,
              ...iconProps.value,
            }),
            curText.value &&
              h(
                'span',
                { style: textStyle.value, class: 'icon-text' },
                curText.value
              ),
          ]
        )
      }

      return h(state.iconNode, {
        style: iconStyle.value,
      })
    }
  },
})
