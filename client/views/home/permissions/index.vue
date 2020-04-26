<template>
  <div class="pa-8 d-flex flex-column fill-height">
    <document-title>权限</document-title>
    <v-row class="mb-auto">
      <v-col cols="12">
        <v-list two-line>
          <template v-for="(permission, index) in items">
            <v-list-item
              :key="permission.id"
              two-line
            >
              <v-list-item-avatar>
                <v-img :src="permission.avatar || ''"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{permission.name}}</v-list-item-title>
                <v-list-item-subtitle>{{permission.description}}</v-list-item-subtitle>
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
      <v-subheader>服务</v-subheader>
      <v-list-item>
        <v-autocomplete
          :items="serviceList"
          :loading="isLoadingServices"
          :search-input.sync="serviceSearchInput"
          @focus="searchServices('')"
          @change="updateQuery('services')($event)"
          no-data-text="无结果"
          placeholder="全部"
          item-value="id"
          :item-text="item => item.title || item.name"
          :error-messages="searchServiceErrorMessages"
          hide-no-data
          hide-selected
          filled
          chips
          multiple
          outlined
          dense
          :value="services"
        >
          <template v-slot:selection="{ item, index }">
            <v-chip small v-if="index === 0">
              <span>{{ item.title || item.name }}</span>
            </v-chip>
            <span
              v-if="index === 1"
              class="grey--text caption"
            >(+{{ serviceList.length - 1 }} others)</span>
          </template>
        </v-autocomplete>
      </v-list-item>
    </v-filter>
  </div>
</template>
<script>
import { request } from 'keq'
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapMutations } = createNamespacedHelpers('home/permissions')

const limit = 10

export default {
  async initialData({ store, route, router }) {
    const { services } = route.query
    const page = route.query.page ? Number(route.query.page) : 1
    if (!Number.isInteger(page) || page < 1) {
      router.push({ path: '/permissions', query: { ...route.query, page: 1 } })
      return
    }

    const serviceIds = services ? services.split(',') : []

    const list = await request
      .get('http://users.miaooo.me/permissions')
      .query('offset', (page - 1) * limit)
      .query('limit', limit)
      .query('systemIds', serviceIds)

    store.commit('home/permissions/updatePermissionList', list)

    const serviceList = []
    for (const id of serviceIds) {
      const service = await request
        .get(`http://users.miaooo.me/system/${id}`)

      serviceList.push(service)
    }

    store.commit('home/permissions/updateServiceList', serviceList)
  },

  data() {
    return {
      isLoadingServices: false,
      serviceSearchInput: null,
    }
  },

  computed: {
    page() {
      const page = Number(this.$route.query.page)
      if (Number.isInteger(page) && page > 0) return page
      else return 1
    },

    services() {
      const { services } = this.$route.query
      return services ? services.split(',').map(id => Number(id)) : []
    },

    ...mapState(['items', 'serviceList', 'searchServiceErrorMessages', 'filter']),
    ...mapState({
      length: state => Math.ceil(state.total / limit),
    })

  },

  watch: {
    serviceSearchInput(val) {
      val && this.searchServices(val)
    }
  },

  methods: {
    ...mapMutations(['updateServiceList', 'appendSearchServiceError', 'clearSearchServiceError', 'toggleFilter']),
    async searchServices(name) {
      this.isLoadingServices = true
      try {
        const { items } = await request
          .get('http://users.miaooo.me/system')
          .query('limit', 10)
          .query('offset', 0)
          .query('name', name)

        this.clearSearchServiceError()
        this.updateServiceList(items)
      } catch (e) {
        this.appendSearchServiceError(e)
      } finally {
        this.isLoadingServices = false
      }
    },
  }
}
</script>
