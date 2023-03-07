# vuepress-theme-zp
custom theme of vuepress2.x

## how to use?

has two step 

### install

if you use `pnpm`, you may need to install `vue` and `@vuepress/client` as peer-dependencies. `pnpm add -D vue @vuepress/client@next`. [reason](https://v2.vuepress.vuejs.org/guide/getting-started.html)

```sh
npm install vuepress-theme-zp
```

### use

/docs/.vuepress/config.js

```ts
import Theme from 'vuepress-theme-zp'
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
  title: 'test',
  description: 'this is description',
  theme: Theme({
    ...option
  }),
})
```
