// import materialIcons from '@vicons/material/HomeOutlined.js'
import { computed, defineComponent, h, toRefs, withModifiers } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'ZpIcons',
  props: {
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

  async setup(props, { slots }) {
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

    const router = useRouter()
    const iconStyle = computed(() => {
      return {
        color: iconColor.value,
        width: `${iconSize.value}rem`,
        height: `${iconSize.value}rem`,
        fontSize: `${iconSize.value}rem`,
      }
    })
    // const iconsNode = (materialIcons as object)[icon.value] || ''
    const getIcons = async (): Promise<unknown> => {
      try {
        // const res = await import(`@vicons/material/${icon.value}.js`)
        const res = import.meta.glob(
          `/node_modules/@vicons/material/HomeOutlined.js`
        )
        console.log('------------------------')
        console.log(res)
        return res
      } catch (error) {
        console.log(error)
        return null
      }
    }
    const iconsNode = await getIcons()
    console.log(iconsNode)

    // { ...faIcons, ...materialIcons, ...tablerIcons }
    const curText = computed(() => text.value || slots.default?.())

    const textStyle = computed(() => {
      return {
        color: textColor.value,
        fontSize: `${textSize.value}rem`,
        // lineHeight: `${textSize.value}rem`,
      }
    })

    const toPage = (): void => {
      link.value && router.push(link.value)
    }

    const containerTag = 'div'

    if (!icon.value) return null

    return () => {
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
            iconsNode
              ? h(iconsNode, {
                  style: iconStyle.value,
                  ...iconProps.value,
                })
              : null,
            curText.value &&
              h(
                'span',
                { style: textStyle.value, class: 'icon-text' },
                curText.value
              ),
          ]
        )
      }

      return iconsNode
        ? h(iconsNode, {
            style: iconStyle.value,
          })
        : null
    }
  },
})
