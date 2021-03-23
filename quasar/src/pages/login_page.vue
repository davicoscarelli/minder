<style lang="sass" scoped>
.login-card
    padding: 30px
    border-radius: 20px
.login-button
    width: 100%
.title
  font-size: 25px
  padding-left: 45px

.presentation-text
  font-size: 25px
  padding-left: 45px

.page
  background-color: #aa4f5e3b
.col-login
  width: 400px
  height: 450px
.col-register
  width: 400px
  height: 500px
  padding-top: calc(100% / 10 - 5px)


@media (max-width: 878px) 
  .presentation-text
    font-size: 25px
    padding: 1px
    text-align: justify

  .title
    font-size: 25px
    padding-left: 1%
    text-align: center

</style>

<template>
  <q-page class="page">
    <div class="row">
      <div class="col">
        <div class="row q-pa-md justify-center q-col-gutter-md">
          <div class="col-login items-center q-mb-xl">
            <div class="col q-pa-md">
              <label class="text-primary text-bold title">
                Welcome
              </label>
            </div>
            <q-card class="login-card">
              <q-form class="row" @submit="login()">
                <div class="col-12">
                  <label class="text-primary text-bold ajust" for="email"
                    >Email</label
                  >
                  <q-input
                    class="q-mt-sm "
                    id="email"
                    rounded
                    outlined
                    v-model="form.email"
                    placeholder="E-mail"
                  >
                    <template v-slot:prepend>
                      <q-icon color="grey-6" name="email" />
                    </template>
                  </q-input>
                </div>

                <div class="col-12 q-mt-md">
                  <label class="text-primary text-bold ajust" for="password">
                    Password
                  </label>
                  <q-input
                    class="q-mt-sm"
                    id="password"
                    rounded
                    outlined
                    v-model="form.password"
                    placeholder="Password"
                    :type="isPwd ? 'password' : 'text'"
                    @keydown.enter.prevent="login"
                  >
                    <template v-slot:prepend>
                      <q-icon color="grey-6" name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        color="grey-6"
                        :name="isPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isPwd = !isPwd"
                      />
                    </template>
                  </q-input>
                  <!-- <q-input class="q-mt-sm" id="password" rounded outlined v-model="form.password" placeholder="Senha"/> -->
                </div>
                <!-- <div class="col-12 q-mt-sm "  @click="$router.replace('/auth/forgot-password')">
                      <label class="text-accent text-bold cursor-pointer">{{
                        $t('login.forgotPassword')
                      }}</label>
                </div> -->
                
                <div class="col-12 self-center">
                  <div class="row justify-center">
                    <q-btn
                      class="login-button text-bold q-mt-md q-px-md"
                      unelevated
                      no-caps
                      rounded
                      color="primary"
                      label="Login"
                      size="15px"
                      type="submit"
                    />
                  </div>
                </div>
              </q-form>
            </q-card>
          </div>

          <!-- <div class="col-register">
            <div>
              <div class="row justify-center">
                <label class="text-accent text-bold presentation-text">{{
                  $t('login.notInCommunity')
                }}</label>
              </div>
              <div class="row justify-center">
                <q-btn
                  class="q-mt-xl q-px-md"
                  unelevated
                  no-caps
                  rounded
                  color="accent"
                  :label="$t('login.wantToBePart')"
                  size="20px"
                  @click="$router.push('/register')"
                />
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
// import { User } from 'src/models/User'
export default {
  name: 'login-page',
  data: () => ({
    form: {},
    verifyAccount: false,
    isPwd: true,
  }),
  methods: {
    async login() {
      // const success = await new User().login(this.form)
      // if (success === 401) {
      //   this.verifyAccount = true

      // }else if (success){
      //   this.$i18n.locale = localStorage.lang 
        window.location.href = '/'
      // }else{

      // }
    },
  }
}
</script>
