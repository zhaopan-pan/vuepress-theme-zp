import { isLinkAbsolute } from '../../shared/link';
import { ensureEndingSlash, isLinkWithProtocol } from '@vuepress/shared';


export const resolvePrefix = (prefix = '', path = ''): string =>
  isLinkAbsolute(path) || isLinkWithProtocol(path)
    ? path
    : `${ensureEndingSlash(prefix)}${path}`
