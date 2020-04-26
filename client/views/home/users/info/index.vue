<template>
  <div>
    <modify-field
      label="修改账户名"
      :show="modify.name"
      v-model="name"
      @cancle="hide('name')"
    />
    <modify-field
      label="修改昵称"
      :show="modify.nickname"
      v-model="nickname"
      @cancle="hide('nickname')"
    />
    <modify-field
      label="修改邮箱"
      :show="modify.email"
      v-model="email"
      @cancle="hide('email')"
    />
    <modify-field
      label="修改手机号"
      :show="modify.phone"
      v-model="phone"
      @cancle="hide('phone')"
    />

    <modify-password
      :show="modify.password"
      @cancle="hide('password')"
    />

    <v-container>
      <v-row justify="center">
        <v-container fluid>
          <v-row justify="center">
            <v-avatar height="128" width="128">
              <v-img :src="avatar" />
            </v-avatar>
          </v-row>
          <v-row justify="center" class="mt-4">
            <v-btn dense color="primary">更换头像</v-btn>
          </v-row>
        </v-container>
      </v-row>
      <v-row justify="center">
        <v-col cols="12">
          <v-list two-line subheader>
            <v-subheader>基本信息</v-subheader>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="name">{{name}}</v-list-item-title>
                <v-list-item-title v-else>未设置</v-list-item-title>
                <v-list-item-subtitle>账户名</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="display('nickname')"><v-icon>create</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{nickname}}</v-list-item-title>
                <v-list-item-subtitle>昵称</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="display('nickname')"><v-icon>create</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="email">{{email}}</v-list-item-title>
                <v-list-item-title v-else>未设置</v-list-item-title>
                <v-list-item-subtitle>邮箱</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="display('email')"><v-icon>create</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title v-if="phone">{{phone}}</v-list-item-title>
                <v-list-item-title v-else>未设置</v-list-item-title>
                <v-list-item-subtitle>手机号</v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon @click="display('phone')"><v-icon>create</v-icon></v-btn>
              </v-list-item-action>
            </v-list-item>

            <v-divider />
            <v-subheader>安全</v-subheader>

            <v-list-item>
              <v-list-item-title>密码</v-list-item-title>
              <v-list-item-action>
                <v-btn text color="primary" @click="display('password')">修改密码</v-btn>
              </v-list-item-action>
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </div>

</template>
<script>
import { request } from 'keq'
import { createNamespacedHelpers } from 'vuex'
import modifyField from './modify-field'
import modifyPassword from './modify-password'


const { mapState, mapMutations } = createNamespacedHelpers('home/users')

export default {
  components: { modifyField, modifyPassword },

  async initialData({ store, route, router }) {
    const { id } = route.params

    await store.dispatch('home/users/fetchUser', id)
  },

  computed: {
    ...mapState({
      country: state => state.info.country,
      name: state => state.info.name,
      nickname: state => state.info.nickname,
      avatar: state => state.info.avatar,
      email: state => state.info.email,
      phone: state => state.info.phone,
    })
  },

  data() {
    return {
      modify: {
        nickname: false,
        name: false,
        email: false,
        phone: false,
        password: false,
      }
    }
  },

  methods: {
    display(key) {
      this.modify[key] = true
    },

    hide(key) {
      this.modify[key] = false
    },

    save() {
      request
        .put(`http://users.miaooo.me/users/${id}`)

    }
  }
}
</script>
