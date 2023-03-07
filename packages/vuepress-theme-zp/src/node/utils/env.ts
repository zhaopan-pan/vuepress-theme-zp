import { env } from 'node:process'

const isDev = env.NODE_ENV === 'development'

const isBuild = env.NODE_ENV === 'production'

export { isDev, isBuild }
