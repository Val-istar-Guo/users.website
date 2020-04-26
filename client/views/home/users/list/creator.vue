<template>
  <div>
    <v-creator v-bind="creator" @close="toggleCreator">
      <template slot="toolbar">
        <v-btn dark text v-if="step > 1" @click="lastStep">上一步</v-btn>
        <v-btn dark text v-if="step === 1" @click="toStep2" >下一步</v-btn>
        <v-btn dark text v-if="step === 2" @click="create">创建</v-btn>
      </template>
      <template>
        <v-stepper v-model="step" alt-labels class="elevation-0">
          <v-stepper-header>
            <v-stepper-step dark :complete="step > 1" :step="1" @click="step = 1" :editable="step > 1">基本信息</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2">密码</v-stepper-step>
          </v-stepper-header>

          <v-stepper-items>
            <v-stepper-content :step="1">
              <v-form ref="baseInfoForm" @submit="toStep2">
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" md="4">
                      <v-autocomplete
                        v-model="country"
                        label="国家或地区"
                        :items="countries"
                        item-text="native"
                        item-value="code"
                      />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        validate-on-blur
                        label="账户名"
                        hint="全局唯一且无法修改，请慎重设置"
                      />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="nickname"
                        :rules="nicknameRules"
                        validate-on-blur
                        label="昵称"
                      />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        validate-on-blur
                        label="邮箱"
                      />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="phone"
                        :rules="phoneRules"
                        validate-on-blur
                        :prefix="phonePrefix"
                        label="手机号"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>

            <v-stepper-content :step="2">
              <v-form>
                <v-container>
                  <v-row justify="center">
                    <v-col cols="12" md="3">
                      <v-text-field type="password" v-model="password" label="密码" />
                    </v-col>
                  </v-row>
                  <v-row justify="center">
                    <v-col cols="12" md="3">
                      <v-text-field
                        type="password"
                        :rules="[passwordEqualRule]"
                        validate-on-blur
                        v-model="ensurePassword"
                        label="确认密码"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-form>
            </v-stepper-content>
          </v-stepper-items>
        </v-stepper>
      </template>
    </v-creator>

    <v-snackbar v-model="snackbar.value" :timeout="5000">
      {{snackbar.message}}
      <v-btn color="primary" text @click="snackbar = false">关闭</v-btn>
    </v-snackbar>
  </div>

</template>
<script>
import { createNamespacedHelpers, mapActions } from 'vuex'
import { stringify } from 'querystring'
import { request } from 'keq'
import * as rules from '@client/utils/rules'
import { RequestException } from '@client/exception/request-exception'
import { countries } from 'countries-list'

const { mapState, mapMutations } = createNamespacedHelpers('home/users')

export default {
  data() {
    return {
      step: 1,

      name: '',
      nickname: '',
      email: '',
      phone: '',
      country: 'CN',

      password: '',
      ensurePassword: '',

      nameRules: [rules.isLowercase()],
      nicknameRules: [rules.isRequired('请填写昵称')],
      emailRules: [rules.isRequired('请填写邮箱'), rules.isEmail()],
      phoneRules: [rules.isRequired('请填写电话')],
      countryRules: [rules.isRequired('请选择国家或地区')],
      countries: Object.entries(countries).map(([code, value]) => ({
        code,
        ...value,
      })),

      snackbar: {
        value: false,
        message: '',
      },
    }
  },

  computed: {
    ...mapState(['creator']),
    phonePrefix() {
      const country = countries[this.country]
      return country ? `+${country.phone}` : ''
    }
  },

  methods: {
    ...mapMutations(['toggleCreator']),
    toStep2() {
      const valid = this.$refs.baseInfoForm.validate()
      if (valid) this.step += 1
    },

    lastStep() {
      this.step -= 1
    },

    passwordEqualRule() {
      return this.password === this.ensurePassword ? true : '两次密码输入的不一样'
    },

    async create() {
      const { nickname, name, email, phone, password, phonePrefix, country } = this
      try {
        const user = await request
          .post('http://users.miaooo.me/users')
          .send({ name, nickname, email, password, country })
          .send({ phone: `${phonePrefix}${phone}` })

        this.toggleCreator()
        this.snackbar.value = true
        this.snackbar.message = `用户创建成功`
      } catch (e) {
        if (!(e instanceof RequestException)) throw e
        this.snackbar.value = true
        this.snackbar.message = `${e.messages.join('\n')}`
      }
    }
  }
}
</script>
