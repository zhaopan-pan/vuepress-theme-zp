/// <reference types="vite/client" />

declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}

declare module '*.module.scss?module' {
  const cssVars: Record<string, string>
  export default cssVars
}

interface ImportMeta {
  readonly glob: (
    pattern: string,
    options?: Record<string, string>
  ) => Promise<Record<string, string>>
}
