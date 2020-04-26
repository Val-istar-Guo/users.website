<template>
  <v-dialog :value="showCreator" fullscreen hide-overlay transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="$emit('close')">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>创建用户</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <slot name="toolbar"></slot>
        </v-toolbar-items>
      </v-toolbar>

      <slot></slot>
    </v-card>
  </v-dialog>
</template>
<script>
import VueTypes from 'vue-types'


export default {
  props: {
    showCreator: VueTypes.bool.def(false),
  },
}
</script>
