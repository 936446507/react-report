import { routes as homeRoutes } from '../page/home/routes'
import { routes as loginRoutes } from '../page/login/routes'
import { routes as memberManagerRoutes } from '../page/member-manager/routes'
import { routes as reportRoutes } from '../page/report/routes'

export const routes = [
  ...homeRoutes,
  ...loginRoutes,
  ...memberManagerRoutes,
  ...reportRoutes
]
