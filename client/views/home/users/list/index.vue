<template>
  <div class="pa-8 d-flex flex-column fill-height">
    <document-title>用户</document-title>
    <v-row class="mb-auto">
      <v-col cols="12">
        <v-list two-line>
          <template v-for="(user, index) in items">
            <v-list-item
              :key="user.id"
              two-line
            >
              <v-list-item-avatar>
                <v-img :src="user.avatar"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{user.nickname}}</v-list-item-title>
                <v-list-item-subtitle>{{user.name}}</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon :to="`/users/${user.id}`"><v-icon>settings</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-divider
              v-if="index + 1 < items.length"
              :key="index"
            />
          </template>
        </v-list>
      </v-col>
    </v-row>
    <v-row class="flex-grow-0">
      <v-pagination :value="page" :length="length" @input="updateQuery('page')($event)" />
    </v-row>

    <v-filter v-bind="filter" @close="toggleFilter">
      <v-subheader>手机号</v-subheader>
      <v-list-item>
        <v-text-field dense filled placeholder="全部" v-debounce="updateQuery('phone')" />
      </v-list-item>
      <v-subheader>邮箱</v-subheader>
      <v-list-item>
        <v-text-field dense filled placeholder="全部" v-debounce="updateQuery('email')" />
      </v-list-item>
    </v-filter>

    <creator />
  </div>
</template>
<script>
import { request } from 'keq'
import { createNamespacedHelpers } from 'vuex'
import Creator from './creator'


const { mapState, mapMutations } = createNamespacedHelpers('home/users')

const limit = 10

export default {
  components: { Creator },
  async initialData({ store, route, router }) {
    const { phone, email } = route.query
    const page = route.query.page ? Number(route.query.page) : 1
    if (!Number.isInteger(page) || page < 1) {
      router.push({ path: '/users', query: { ...route.query, page: 1 } })
      return
    }

    const list = await request
      .get('http://users.miaooo.me/users')
      .query('offset', (page - 1) * limit)
      .query('limit', limit)
      .query('phone', phone)
      .query('email', email)

    store.commit('home/users/updateUserList', list)
  },

  data() {
    return {
    }
  },

  computed: {
    page() {
      const page = Number(this.$route.query.page)
      if (Number.isInteger(page) && page > 0) return page
      else return 1
    },

    phone() {
      return this.$route.query.phone
    },

    email() {
      return this.$route.query.email
    },

    ...mapState(['filter']),
    ...mapState({
      items: state => state.list.items,
      length: state => Math.ceil(state.list.total / limit),
    })

  },

  methods: {
    ...mapMutations(['toggleFilter'])
  }
}
</script>
