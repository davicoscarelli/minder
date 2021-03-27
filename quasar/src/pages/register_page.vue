<style lang="sass" scoped>
.stepper
  height: 10px


.btn-size
  width: 130px

.container 
  width: 100%
  height: 0
  padding-bottom: 33%
  position: relative
  

@media (max-width: $breakpoint-xs-max)
  .container 
    padding-bottom: 100%

.iframe 
  display:block
  position: absolute
  top: 0
  left: 0
  bottom: 0
  right: 0
  width: 100%
  height: 100%


</style>

<template>
  <q-page>
    <q-stepper
      v-model="step"
      header-nav
      class="no-shadow"
      ref="stepper"
      color="primary"
      animated
      :contracted="$q.screen.xs"
    >
    
      <q-step
        :name="1"
        title="Profile"
        icon="account"
        :done="done1"
        :header-nav="step > 1"
        
      >
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            Personal Info
          </h5>
        </div>
        <div class="row justify-center">
          <q-form class="q-mb-xl" @submit="submitStep1()">
            <div class="row justify-center q-col-gutter-sm">
              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="name">
                  Name
                </label>
                <q-input
                  class="q-mt-sm"
                  id="name"
                  ref="formname"
                  rounded
                  maxlength="60"
                  outlined
                  v-model="form.name"
                  :rules="[val => !!val || 'Required']"
                />
              </div>

              

              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="email"
                  >Email</label
                >
                <q-input
                  class="q-mt-sm"
                  id="email"
                  rounded
                  outlined
                  maxlength="60"
                  ref="email"
                  v-model="form.email"
                  :rules="[val => !!val || 'Required', isValidEmail]"

                />
              </div>


              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="password">Password</label>
                <q-input
                    class="q-mt-sm"
                    id="password"
                    rounded
                    maxlength="30"
                    outlined
                    ref="password"
                    v-model="form.password"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[val => !!val || 'Required', isValidPassword]"
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
              </div>

              
            </div>
            <div class="justify-center flex">
              <q-btn
                @click="$router.push('/auth/login')"
                class="q-ma-md q-px-md text-bold btn-size"
                unelevated
                rounded
                no-caps
                outline
                color="primary"
                label="Return"
                size="16px"
              />
              <q-btn
                type="submit"
                class="q-ma-md q-px-md text-bold btn-size"
                unelevated
                rounded
                no-caps
                color="positive"
                label="Next"
                size="16px"
              />
          </div>
          </q-form>
        </div>

      </q-step>

      <q-step
        :name="2"
        title="Preferences"
        icon="mdi-map-marker"
        :done="done2"
        class="q-px-sm"
        :header-nav="step > 2"
      >
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            What do you like?
          </h5>
        </div>

        <div class="row justify-center">
          
        </div>

        <q-stepper-navigation class="justify-center flex">
          <q-btn
            @click="() => {
                done2 = false
                step = 1
              }"
            class="q-ma-md q-px-md text-bold btn-size"
            unelevated
            rounded
            no-caps
            outline
            color="primary"
            label="Return"
            size="16px"
          />
          <q-btn
            @click="
              () => {
                done2 = true
                step = 3
              }
            "
            class="q-ma-md q-px-md text-bold btn-size"
            unelevated
            rounded
            no-caps
            color="positive"
            label="Next"
            size="16px"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Bio"
        icon="mdi-currency-usd"
        :done="done3"
        class="q-px-sm"
        :header-nav="step > 3"
      >
        <!-- begin  -->
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            Show yourself
          </h5>
        </div>
        <div class="row justify-evenly q-pa-md">
          
        </div>

        <!-- end plans -->
        <q-stepper-navigation class="justify-center flex q-pt-none q-mt-none">
         
          <q-btn
            @click="step = 2"
            class="q-ma-md q-px-md text-bold btn-size"
            unelevated
            rounded
            no-caps
            dense
            outline
            color="primary"
            label="Return"
            size="16px"
          />
          <q-btn
            @click="register"
            class="q-ma-md q-px-md text-bold btn-size"
            unelevated
            rounded
            no-caps
            :loading="loading"
            color="positive"
            label="Register"
            size="16px"
          />
        </q-stepper-navigation>
      </q-step>
      
    </q-stepper>

    
    <q-dialog v-model="success">
        <q-card class="text-center" style="border-radius: 15px; width: 300px">
          <q-card-section class=" col-12 text-center q-mt-sm">
            <!-- <img
              src="~assets/check.png"
              size="20px"
            /> -->
            
          </q-card-section>

          <div class="q-px-md">
            <p
              class="text-primary text-bold"
              style="font-size: 18pt; text-align: center"
            >
              Account successfully registered!
            </p>
          </div>
          <q-card-section>
            <q-card-actions class="col-12 justify-center">

              <q-btn
                label="Ok"
                size="15px"
                color="positive"
                class="text-bold"
                style="width: 150px; font-size: 12pt"
                no-caps
                rounded
                @click="$router.push('/auth/login')"
                v-close-popup
              />
            </q-card-actions>
          </q-card-section>
        </q-card>
      </q-dialog>

  </q-page>
</template>

<script>
import { User } from 'src/models/User'

export default {
  name: 'register-page',
  data: () => ({
    step: 1,
    terms: false,
    denied1: false,
    done1: false,
    done2: false,
    done3: false,
    loading: false,
    error: false,
    success: false,
    isPwd: true,
    isConfirmPwd: true,
    form: { },
    date: '2001/01/01'
  }),
  methods: {
    async register() {
      this.loading = true
      const success = await User.register(this.form)
      if (success){
        this.loading = false
        this.success = true
      }
    },
    
    async submitStep1(){
      if(this.form.name && this.form.email  && this.form.password ){
          this.done1 = true
          this.step = 2  
          return 
        }
        this.error = true
        return
                 
    },
    async verifyEmail(){
        const url = `verifyemail/${this.form.email}`
        const { data, status } = await this.$http.get(url)
        if(!data) return this.$t('myAccount.emailExists')
    },
    isValidPassword(val){        
        if (val.length > 7) {
          
            if (!/\d/.test(val)) return this.$t('register.musthavenum')
            if (!/[a-zA-Z]/.test(val)) return this.$t('register.musthavecha')
          
        } else {
          return this.$t('register.musthave8')
        }
        
    },
    isValidEmail (val) {
    const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || this.$t('general.invalidEmail');
    },
    reset() {
      this.done1 = false
      this.done2 = false
      this.done3 = false
      this.step = 1
    },
  },
}
</script>
