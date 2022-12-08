import { computed, defineComponent, h, toRefs } from 'vue'
import * as materialIcons from '@vicons/material'
import * as faIcons from '@vicons/fa'

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
      target,
      link,
      iconPosition,
      iconSize,
      iconColor,
      textColor,
      textSize,
      text,
    } = toRefs(props)

    const iconStyle = computed(() => {
      return {
        color: iconColor.value,
        width: `${iconSize.value}rem`,
        height: `${iconSize.value}rem`,
        fontSize: `${iconSize.value}rem`,
      }
    })
    const icons = { ...faIcons, ...materialIcons }
    const curText = computed(() => text.value || slots.default?.())

    const textStyle = computed(() => {
      return { color: textColor.value, fontSize: `${textSize.value}rem` }
    })

    const containerTag = curText ? 'a' : 'div'

    if (!icon.value) return null

    return () => {
      if (link.value) {
        return h(
          containerTag,
          {
            class: ['icon-container', iconPosition.value],
            href: link.value,
            target: target.value,
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
