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
   background: linear-gradient(to top, #f32b60, #ff8f1f)

.col-login
  width: 400px
  height: 450px


.logo
  height: 100%
  width: 80px
  margin-top: 25px

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
    <div class="row ">
      <div class="col">
        <div class="row q-pa-md justify-center q-col-gutter-md">
          <div class="col-login items-center q-mb-xl">
            <div class="col-12 text-center q-my-md">
                <q-img src="images/logo.png" class="logo"/>
                <h2 class="text-white q-mt-md">minder</h2>
            </div>
            <div class="col q-pa-md q-mt-md">
              <q-form class="row" @submit="login()">
                <div class="col-12">
                  <label class="text-white text-bold ajust" for="email"
                    >Email</label
                  >
                  <q-input
                    class="q-mt-sm "
                    id="email"
                    input-class="text-black"
                    rounded standout 
                    bg-color="white"
                    v-model="form.email"
                    placeholder="E-mail"
                  >
                    <template v-slot:prepend>
                      <q-icon color="grey-6" name="email" />
                    </template>
                  </q-input>
                </div>

                <div class="col-12 q-mt-md">
                  <label class="text-white text-bold ajust" for="password">
                    Password
                  </label>
                  <q-input
                    class="q-mt-sm"
                    id="password"
                    input-class="text-black"
                    rounded standout 
                    bg-color="white"
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
                
                <div class="col-12 self-center q-mt-md" >
                  <div class="row justify-center">
                    <q-btn
                      class="login-button text-bold q-mt-md q-px-md"
                      unelevated
                      no-caps
                      rounded
                      color="primary"
                      label="Login"
                      size="20px"
                      :loading="loading"
                      type="submit"
                    />
                  </div>
                  <div class="row justify-center">
                    <q-btn
                      class="login-button text-bold q-mt-md q-px-md"
                      unelevated
                      no-caps
                      rounded
                      outline
                      color="white"
                      label="Register"
                      size="20px"
                      @click="$router.push('/auth/register')"
                    />
                  </div>
                </div>
              </q-form>
            </div>
          </div>

          
        </div>
      </div>
    </div>

  </q-page>
</template>

<script>
import { User } from 'src/models/User'
export default {
  name: 'login-page',
  data: () => ({
    form: {},
    verifyAccount: false,
    isPwd: true,
    loading: false
  }),
  created(){
      this.$q.dark.set(false)
  },
  methods: {
    async login() {
      this.loading = true
      const success = await new User().login(this.form)
      if (success){
        this.loading = false
        window.location.href = '/'
      }else{
        this.loading = false
      }
    },
  }
}
</script>
