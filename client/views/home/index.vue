<template>
  <v-app dark>
    <document-title>用户管理平台</document-title>
    <v-app-bar
      app
      dark
      color="primary"
      :clipped-left="$vuetify.breakpoint.mdAndUp"
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
    >
      <v-app-bar-nav-icon @click.stop=" showDrawer = !showDrawer" />
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span>{{ title }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon v-if="filterable" @click="toggleFilter">
        <v-icon>filter_list</v-icon>
      </v-btn>
      <template v-if="creatable" v-slot:extension>
        <v-btn color="pink" dark absolute bottom right fab @click="toggleCreator">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
    </v-app-bar>

    <v-navigation-drawer
      v-if="user"
      v-model="showDrawer"
      :clipped="$vuetify.breakpoint.mdAndUp"
      :mobile-break-point="$vuetify.breakpoint.thresholds.sm"
      app
    >
      <v-list dense nav class="py-0">
        <v-list-item two-line class="px-0">
          <v-list-item-avatar>
            <img :src="user.avatar" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>{{ user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ user.email }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-divider></v-divider>

        <v-list-item
          v-for="route in routes"
          :key="route.path"
          :to="`/${route.path}`"
          active-class="blue--text text--accent-4"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
<script>
import { mapState } from "vuex";
import * as cookie from "@client/utils/cookie";
import * as R from "ramda";
import route from './route'

export default {
  async initialData({ store, route, router }) {
    const { token } = route.query;

    if (token) {
      cookie.set("token", token);
      router.push({ path: route.path, query: R.omit(["token"], route.query) });
      return;
    }

    try {
      await store.dispatch("auth");
    } catch (e) {
      router.push("/login");
    }
  },

  computed: {
    ...mapState(["user"]),
    title() {
      return this.$route.meta.title || '用户管理平台'
    },

    filterable() {
      return this.$route.meta.filterable
    },
    creatable() {
      return this.$route.meta.creatable
    },
    namespace() {
      return this.$route.meta.namespace
    }
  },

  data() {
    return {
      showDrawer: this.$vuetify.breakpoint.mdAndUp,
      routes: route.children,
    };
  },

  methods: {
    toggleFilter() {
      const action = `home/${this.namespace}/toggleFilter`;
      this.$store.dispatch(action);
    },

    toggleCreator() {
      const action = `home/${this.namespace}/toggleCreator`
      this.$store.dispatch(action)
    },
  }
};
</script>
<style lang="postcss" scoped></style>
