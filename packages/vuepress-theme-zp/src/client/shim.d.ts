declare module '*.vue' {
  import type { ComponentOptions } from 'vue'
  const comp: ComponentOptions
  export default comp
}
declare module '*.module.scss' {
  type Variables = {
    [className: string]: string
    MQMobile: string
  }
  const cssVar: Variables
  export default cssVar
}
