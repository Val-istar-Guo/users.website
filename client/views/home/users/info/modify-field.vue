<template>
  <v-dialog :value="show" persistent max-width="600px">
    <v-card>
      <v-card-title>{{label}}</v-card-title>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <v-text-field
              required
              :value="value"
              @input="$emit('input', $event)"
              placeholder="未设置"
            ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="$emit('cancle')">取消</v-btn>
        <v-btn color="blue darken-1" text @click="$emit('ensure')">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
import VueTypes from 'vue-types'


export default {
  props: {
    show: VueTypes.bool.def(false),
    label: VueTypes.string.isRequired,
    value: VueTypes.string,
  }
}
</script>
