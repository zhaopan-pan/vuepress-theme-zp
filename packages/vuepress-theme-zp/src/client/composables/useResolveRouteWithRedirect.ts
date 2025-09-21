import { isFunction, isString } from '@vuepress/shared'
import { useRouter } from 'vue-router'
import type { RouteLocationAsRelativeGeneric, Router } from 'vue-router'

/**
 * Resolve a route with redirection
 */
export const useResolveRouteWithRedirect = (
  ...args: Parameters<Router['resolve']>
): ReturnType<Router['resolve']> => {
  const router = useRouter()
  const route = router.resolve(...args)
  const lastMatched = route.matched[route.matched.length - 1]
  if (!lastMatched?.redirect) {
    return route
  }
  const { redirect } = lastMatched
  const resolvedRedirect = isFunction(redirect) ? redirect(route) : redirect
  const resolvedRedirectObj = isString(resolvedRedirect)
    ? { path: resolvedRedirect }
    : resolvedRedirect
  return useResolveRouteWithRedirect({
    hash: route.hash,
    query: route.query,
    params: route.params as unknown as RouteLocationAsRelativeGeneric['params'],
    ...resolvedRedirectObj,
  } as RouteLocationAsRelativeGeneric)
}
