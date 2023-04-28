import * as faIcons from '@vicons/fa'
import * as materialIcons from '@vicons/material'
import * as tablerIcons from '@vicons/tabler'
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
    const icons = { ...faIcons, ...materialIcons, ...tablerIcons }
    const curText = computed(() => text.value || slots.default?.())

    const textStyle = computed(() => {
      return {
        color: textColor.value,
        fontSize: `${textSize.value}rem`,
        lineHeight: '',
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
              lineHeight: `${iconSize.value}rem`,
              cursor: link.value ? 'pointer' : '',
            },
            onClick: withModifiers(toPage, ['stop', 'prevent']),
          },
          [
            h(icons[`${icon.value}`], { style: iconStyle.value }),
            curText.value &&
              h(
                'span',
                { style: textStyle.value, class: 'icon-text' },
                curText.value
              ),
          ]
        )
      }

      return h(icons[`${icon.value}`], { style: iconStyle.value })
    }
  },
})
