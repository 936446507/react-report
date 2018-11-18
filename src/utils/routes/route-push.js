import { routes } from '../../routes'
import { checkDataType } from '../check-data-type'

export function routePush({ name }) {
  console.log(routes, window.location)
  for (let routeItem of routes) {
    if (routeItem.name === name) {
      window.location.href = window.location.origin + routeItem.path
      return
    }
    if (
      checkDataType(routeItem.children) === 'Array' &&
      routeItem.children.length > 0
    ) {
      const childrenRoutes = routeItem.children
      for (let childrenRouteItem of childrenRoutes) {
        if (childrenRouteItem.name === name) {
          let childrenRoutePath =
            childrenRouteItem.path.indexOf('/') === -1 ?
            '/' + childrenRouteItem.path :
            childrenRouteItem.path
          window.location.href = window.location.origin + routeItem.path + childrenRoutePath
          return
        }
      }
    }
  }
  return 'not find route'
}
