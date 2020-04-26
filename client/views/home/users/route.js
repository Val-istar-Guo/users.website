import Users from './index.vue'
import List from './list/index.vue'
import Info from './info/index.vue'


export default {
  path: 'users',
  component: Users,
  meta: {
    title: '用户',
    icon: "people",
    namespace: "users",
    filterable: true,
    creatable: true
  },
  children: [
    {
      path: '',
      component: List,
    },
    {
      path: ':id',
      component: Info,
    }
  ]
}
