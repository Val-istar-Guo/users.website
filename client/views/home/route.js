import Services from './services/index.vue'
import Home from './index.vue'
import usersRoute from './users/route'
import Roles from './roles/index.vue'
import Permissions from './permissions/index.vue'


export default {
  path: '/',
  component: Home,
  children: [
    {
      path: 'services',
      component: Services,
      meta: {
        title: '服务',
        icon: "apps",
        namespace: "services",
        filterable: true,
        creatable: true,
      },
    },
    usersRoute,
    {
      path: 'roles',
      component: Roles,
      meta: {
        title: '角色',
        icon: "theater_comedy",
        namespace: "roles",
        filterable: true,
        creatable: true
      }
    },
    {
      path: 'permissions',
      component: Permissions,
      meta: {
        title: "权限",
        icon: "lock",
        namespace: "permissions",
        filterable: true,
        creatable: true
      },
    },
  ],
}
