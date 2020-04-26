<template>
  <div class="pa-8 d-flex flex-column fill-height">
    <document-title>服务</document-title>
    <v-row class="mb-auto">
      <v-col cols="12">
        <v-list two-line>
          <template v-for="(service, index) in items">
            <v-list-item
              :key="service.id"
              two-line
            >
              <v-list-item-avatar>
                <v-img :src="service.avatar || ''"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{service.title}}</v-list-item-title>
                <v-list-item-subtitle>{{service.name}}</v-list-item-subtitle>
              </v-list-item-content>
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
      <v-subheader>名称</v-subheader>
      <v-list-item>
        <v-text-field dense filled placeholder="全部" v-debounce="updateQuery('title')" />
      </v-list-item>
    </v-filter>
  </div>
</template>
<script>
import { request } from 'keq'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('home/services')

const limit = 10

export default {
  async initialData({ store, route, router }) {
    const { title } = route.query
    const page = route.query.page ? Number(route.query.page) : 1
    if (!Number.isInteger(page) || page < 1) {
      router.push({ path: '/services', query: { ...route.query, page: 1 } })
      return
    }

    const list = await request
      .get('http://users.miaooo.me/system')
      .query('offset', (page - 1) * limit)
      .query('limit', limit)
      .query('title', title)

    store.commit('home/services/updateServiceList', list)
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

    title() {
      return this.$route.query.title
    },


    ...mapState(['items', 'filter']),
    ...mapState({
      length: state => Math.ceil(state.total / limit),
    })

  },

  methods: {
    ...mapMutations(['toggleFilter']),
  }
}
</script>
