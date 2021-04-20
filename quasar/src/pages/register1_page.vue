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
    <div class="row q-pa-sm q-mb-md justify-center">
      <h5 class="text-bold text-primary text-left">
        Register
      </h5>
    </div>
    <div class="row justify-center">
      <q-form class="q-mx-md q-mb-xl" @submit="register">
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
          <div class="col-12 col-md-6">
            <label class="text-accent text-bold ajust" for="age">
              Age
            </label>
            <q-input
              class="q-mt-sm"
              id="age"
              rounded
              outlined
              type="number"
              mask="##"
              v-model="form.age"
              :rules="[val => !!val || 'Required']"
            />
          </div>

          <div class="col-12 col-md-6">
            <label class="text-accent text-bold ajust" for="country">
              Country
            </label>
            <q-input
              class="q-mt-sm"
              id="country"
              rounded
              outlined
              v-model="form.country"
              :rules="[val => !!val || 'Required']"
            />
          </div>

          <div class="col-12 col-md-6">
            <label class="text-accent text-bold ajust" for="class">
              Class
            </label>
            <q-input
              class="q-mt-sm"
              id="class"
              rounded
              outlined
              mask="##"
              v-model="form.class"
              :rules="[val => !!val || 'Required']"
            />
          </div>
          
        </div>
        
        <div class="justify-center q-mt-md flex q-gutter-sm">
          <q-btn
            @click="$router.push('/auth/login')"
            class="q-mx-md q-px-md text-bold btn-size"
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
            class="q-mx-md q-px-md text-bold btn-size"
            unelevated
            rounded
            :loading="loading"
            no-caps
            color="positive"
            label="Next"
            size="16px"
          />
        </div>
      </q-form>
    </div>

    
    <!-- <q-dialog v-model="success">
        <q-card class="text-center" style="border-radius: 15px; width: 300px">
          <q-card-section class=" col-12 text-center q-mt-sm">
            
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
      </q-dialog> -->

  </q-page>
</template>

<script>
import { User } from 'src/models/User'

export default {
  name: 'register-page',
  data: () => ({
    loading: false,
    isPwd: true,
    form: { },
  }),
  methods: {
    async register() {
      this.loading = true
      const success = await User.register({
        ...this.form,
        matches: "[]", 
        likes: "[]", 
        dislikes: "[]"
        })
      if (success != false){
        
        const logged = await new User().login({
          email: this.form.email,
          password: this.form.password,
          register: true
        })
        if(logged){
          this.loading = false
          this.$router.push(`/auth/register/${success.id}`)
        }
      }
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
  },
}
</script>
