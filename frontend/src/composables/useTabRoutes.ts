import { ref } from 'vue'
import { useRouter } from 'vue-router'

const tabRoutes = ref<Record<string, string>>({})

export function useTabRoutes() {
  const router = useRouter()

  function saveRoute(tab: string) {
    tabRoutes.value[tab] = router.currentRoute.value.fullPath
  }

  function getRoute(tab: string): string {
    return tabRoutes.value[tab] || defaultRouteFor(tab)
  }

  function defaultRouteFor(tab: string): string {
    const defaults: Record<string, string> = {
      // home: '/',
      // cart: '/cart',
      marketplace: '/marketplace',
      account: '/account',
      // explore: '/explore',
    }
    return defaults[tab] || '/'
  }

  function resetTabRoute(tab: string) {
    delete tabRoutes.value[tab]
  }

  return {
    saveRoute,
    getRoute,
    resetTabRoute,
    tabRoutes,
  }
}
