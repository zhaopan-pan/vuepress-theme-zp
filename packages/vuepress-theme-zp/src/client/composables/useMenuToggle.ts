import { inject, provide } from 'vue'
import type { InjectionKey } from 'vue'

export type IMenu = { toggleMobileMenu: () => void }

export const MenuToggleSymbol: InjectionKey<IMenu> =
  Symbol.for('toggleMobileMenu')

/**
 * Inject data
 */
export const useMenuToggle = (key?: string): IMenu => {
  const menuFn = inject(MenuToggleSymbol)

  if (!menuFn) {
    throw new Error('useMenuToggle() is called without provider.')
  }

  return key ? menuFn[key] : menuFn
}

export const setupMenuToggle = (obj: IMenu): void => {
  provide(MenuToggleSymbol, obj)
}
