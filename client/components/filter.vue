<template>
  <v-navigation-drawer
    :value="showFilter"
    :fixed="$vuetify.breakpoint.smAndDown"
    :absolute="$vuetify.breakpoint.mdAndUp"
    right
  >
    <template v-slot:prepend>
      <v-list-item>
        <v-toolbar-title>筛选</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-list-item>
    </template>
    <v-list>
      <slot></slot>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
import VueTypes from 'vue-types'


export default {
  props: {
    showFilter: VueTypes.bool.def(false),
  },
}
</script>
