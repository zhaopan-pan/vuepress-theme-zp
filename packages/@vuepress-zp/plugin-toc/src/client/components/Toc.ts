import { usePageData } from '@vuepress/client'
import type { PageHeader } from '@vuepress/client'
import {
  computed,
  defineComponent,
  h,
  nextTick,
  onMounted,
  ref,
  toRefs,
  watch,
} from 'vue'
import type { PropType, VNode } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import type { TocPropsOptions } from '../../shared/index.js'

export type TocPropsHeaders = PageHeader[]

export interface TocProps {
  headers: TocPropsHeaders
  options: TocPropsOptions
}

const renderLink = (
  header: PageHeader,
  options: TocPropsOptions,
  route: RouteLocationNormalizedLoaded,
  onClickLink: (e: Event) => void
): VNode => {
  const hash = `#${header.slug}`
  const linkClass = [options.linkClass]

  // add active class if the header hash is matched
  if (options.linkActiveClass && route.hash === hash) {
    linkClass.push(options.linkActiveClass)
  }

  // add active class if any sub-header hash is matched
  if (
    options.linkChildrenActiveClass &&
    header.children.some((item) => `#${item.slug}` === route.hash)
  ) {
    linkClass.push(options.linkChildrenActiveClass)
  }

  if (options.linkTag === 'RouterLink') {
    return h(
      RouterLink,
      {
        to: hash,
        class: linkClass,
        ariaLabel: header.title,
        title: header.title,
        onClick: onClickLink,
      },
      () => header.title
    )
  }

  return h(
    'a',
    {
      href: hash,
      class: linkClass,
      ariaLabel: header.title,
      title: header.title,
    },
    header.title
  )
}

const renderHeaders = (
  headers: PageHeader[],
  options: TocPropsOptions,
  route: RouteLocationNormalizedLoaded,
  onClickLink: (e: Event) => void
): VNode[] => {
  if (headers.length === 0) {
    return []
  }

  return [
    h(
      'ul',
      {
        class: options.listClass,
      },
      headers.map((header) =>
        h(
          'li',
          {
            class: options.itemClass,
          },
          [
            renderLink(header, options, route, onClickLink),
            renderHeaders(header.children, options, route, onClickLink),
          ]
        )
      )
    ),
  ]
}

export const Toc = defineComponent({
  name: 'Toc',

  props: {
    headers: {
      type: Array as PropType<TocPropsHeaders>,
      required: false,
      default: null,
    },

    options: {
      type: Object as PropType<Partial<TocPropsOptions>>,
      required: false,
      default: () => ({}),
    },
  },

  setup(props) {
    const { headers: propsHeaders, options: propsOptions } = toRefs(props)
    const markerOffsetTop = ref(0)

    const route = useRoute()
    const page = usePageData()
    const headers = computed<TocPropsHeaders>(() => {
      const headersToUse = propsHeaders.value || page.value.headers

      // skip h1 header
      return headersToUse[0]?.level === 1
        ? headersToUse[0].children
        : headersToUse
    })
    const options = computed<TocPropsOptions>(() => ({
      containerTag: 'nav',
      containerClass: 'vuepress-toc',
      markerClass: 'zp-toc-marker',
      listClass: 'vuepress-toc-list',
      itemClass: 'vuepress-toc-item',
      linkTag: 'RouterLink',
      linkClass: 'vuepress-toc-link',
      linkActiveClass: 'active',
      linkChildrenActiveClass: 'active',
      ...propsOptions.value,
    }))

    const updateMarkerOffsetTop = (hash: string): void => {
      const activeLink = document.querySelector(
        `a.zp-link-active-class[href="${route.path}${hash}"]`
      ) as unknown as { offsetTop: number } | null
      markerOffsetTop.value = activeLink ? activeLink.offsetTop : 0
    }

    // 页面渲染后更新marker位置
    onMounted(() => {
      updateMarkerOffsetTop(route.hash)
    })

    // 检测hash变化更新marker位置
    watch(
      () => route.hash,
      (hash) => {
        nextTick(() => updateMarkerOffsetTop(hash))
      }
    )

    // 链接点击事件
    const onClickLink = (e: Event): void => {
      const target = e.target as unknown as { offsetTop: number }
      markerOffsetTop.value = target.offsetTop
    }

    return () => {
      const renderedHeaders = renderHeaders(
        headers.value,
        options.value,
        route,
        onClickLink
      )

      if (options.value.containerTag) {
        return h(
          options.value.containerTag,
          {
            class: options.value.containerClass,
          },
          [
            renderedHeaders,
            h(
              'div',
              {
                class: options.value.markerClass,
                style: { top: `${markerOffsetTop.value}px` },
              },
              ''
            ),
          ]
        )
      }

      return renderedHeaders
    }
  },
})
