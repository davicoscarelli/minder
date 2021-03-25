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
                  placeholder="Name"
                  :rules="[val => !!val || 'Required']"
                />
              </div>

              

              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="email"
                  >{{$t('register.email')}}</label
                >
                <q-input
                  class="q-mt-sm"
                  id="email"
                  rounded
                  outlined
                  maxlength="60"
                  ref="email"
                  v-model="form.email"
                  :placeholder="$t('register.email')"
                  :rules="[val => !!val || $t('general.requiredField'), isValidEmail, verifyEmail]"

                />
              </div>

              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="email"
                  >{{$t('register.emailconfirmation')}}</label
                >
                <q-input
                  class="q-mt-sm"
                  id="email"
                  rounded
                  outlined
                  maxlength="60"
                  v-model="form.emailconfirmation"
                  :placeholder="$t('register.emailconfirmation')"
                  :rules="[val => !!val || $t('general.requiredField'), isValidEmail, val => val == $refs.email.value ||  $t('register.emailDidntMatch')]"

                />
              </div>

              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="password">{{
                  $t('register.password')
                }}</label>
                <q-input
                    class="q-mt-sm"
                    id="password"
                    rounded
                    maxlength="30"
                    outlined
                    ref="password"
                    v-model="form.password"
                    :placeholder="$t('login.password')"
                    :type="isPwd ? 'password' : 'text'"
                    :rules="[val => !!val || $t('general.requiredField'), isValidPassword]"
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

              <div class="col-12 col-md-6">
                <label class="text-accent text-bold ajust" for="password">{{
                  $t('register.passwordconfirmation')
                }}</label>
                <q-input
                    class="q-mt-sm"
                    id="password"
                    rounded
                    outlined
                    maxlength="30"
                    v-model="form.passwordconfirmation"
                    :placeholder="$t('register.passwordconfirmation')"
                    :type="isConfirmPwd ? 'password' : 'text'"
                    :rules="[val => !!val || $t('general.requiredField'), isValidPassword, val => val == $refs.password.value ||  $t('register.passwordDidntMatch')]"
                  >
                    <template v-slot:prepend>
                      <q-icon color="grey-6" name="lock" />
                    </template>
                    <template v-slot:append>
                      <q-icon
                        color="grey-6"
                        :name="isConfirmPwd ? 'visibility_off' : 'visibility'"
                        class="cursor-pointer"
                        @click="isConfirmPwd = !isConfirmPwd"
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
                color="accent"
                :label="$t('general.return')"
                size="16px"
              />
              <q-btn
                type="submit"
                class="q-ma-md q-px-md text-bold btn-size"
                unelevated
                rounded
                no-caps
                color="positive"
                :label="$t('register.next')"
                size="16px"
              />
          </div>
          </q-form>
        </div>

      </q-step>

      <q-step
        :name="2"
        :title="$t('register.step2')"
        icon="mdi-map-marker"
        :done="done2"
        class="q-px-sm"
        :header-nav="step > 2"
      >
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            {{ $t('register.title2') }}
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
            color="accent"
            :label="$t('general.return')"
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
            :label="$t('register.next')"
            size="16px"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        :title="$t('register.step3')"
        icon="mdi-currency-usd"
        :done="done3"
        class="q-px-sm"
        :header-nav="step > 3"
      >
        <!-- begin  -->
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            {{ $t('register.title3') }}
          </h5>
        </div>
        <div class="row justify-evenly q-pa-md">
          
        </div>

        <!-- end plans -->
        <q-stepper-navigation class="justify-center flex q-pt-none q-mt-none">
          <q-btn
            @click="step = 2"
            class="q-ml-md q-mb-md q-px-md text-bold"
            style="width: 150px"
            unelevated
            rounded
            no-caps
            color="accent"
            :label="$t('general.return')"
            size="20px"
          />
          <!-- <q-btn
            @click="done3 = true"
            class="q-ma-md q-px-md"
            unelevated
            rounded
            color="positive"
            label="Concluir"
            size="20px"
          /> -->
        </q-stepper-navigation>
      </q-step>
      
    </q-stepper>

    
    <q-dialog v-model="success">
        <q-card class="text-center" style="border-radius: 15px; width: 500px">
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
              {{
                $t('register.successRegister')
              }}
            </p>
          </div>
          <q-card-section>
            <q-card-actions class="col-12 justify-center">

              <q-btn
                :label="$t('general.ok')"
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
    loading: 0,
    error: false,
    success: false,
    isPwd: true,
    isConfirmPwd: true,
    form: { },
    date: '2001/01/01'
  }),
  methods: {
    
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
