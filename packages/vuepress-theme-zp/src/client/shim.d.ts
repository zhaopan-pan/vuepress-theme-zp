declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}

declare module '*.module.scss?module' {
  const cssVars: Record<string, string>
  export default cssVars
}

declare module '@vuepress-zp/plugin-code-copy/lib/client/composables/useCopyBtn'
