<template>
  <v-app>
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar
                color="primary"
                dark
                flat
              >
                <v-toolbar-title>登陆</v-toolbar-title>
                <v-spacer />
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid">
                  <v-text-field
                    label="用户名"
                    name="login"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    @keyup.enter="login"
                  />

                  <v-text-field
                    id="password"
                    label="密码"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                    @keyup.enter="login"
                  />
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn :loading="logining" text color="primary" @click="login">登陆</v-btn>
                <v-btn text class="grey--text">注册</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import { request } from 'keq'
import cookie from 'cookie'
import url from 'url'

export default {
  async initialData({ store, router }) {
  },
  data() {
    return {
      valid: true,
      logining: false,
      username: '',
      password: '',
    }
  },

  methods: {
    async login() {
      const { redirect } = this.$route.query
      const { username, password } = this
      console.log(`Login with ${username}:${password}`);
      try {
        this.logining = true
        const body = await request
          .post('http://users.miaooo.me/users/login')
          .send({ password, username })

        if (redirect) {
          const urlObj = url.parse(redirect, true)
          urlObj.query.token = body.token

          window.location.replace(url.format(urlObj))
        } else {
          // window.location.replace()
          this.$router.replace({
            path: '/',
            query: { ...this.$route.query, token: body.token }
          })
        }
      } catch (e) {
        this.logining = false
        this.valid = false
      }
    }
  }
}
</script>
