import { isString } from '@vuepress/shared';

/**
 * Check if a value is starting with the given prefix
 */
export const startsWith = (str: unknown, prefix: string): boolean =>
  isString(str) && str.startsWith(prefix)