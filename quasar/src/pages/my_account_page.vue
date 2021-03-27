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
      <div class="q-pa-md">
    
        <div class="row q-pa-sm q-mb-md justify-center">
          <h5 class="TitlePage text-primary text-left">
            Personal Info
          </h5>
        </div>
        <div class="row justify-center">
          <q-form class="q-mb-xl" @submit="update()">
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


              

              
            </div>
            <div class="justify-center flex">
              <q-btn
                type="submit"
                class="q-ma-md q-px-md text-bold btn-size"
                unelevated
                rounded
                no-caps
                color="positive"
                label="Update"
                size="16px"
              />
          </div>
          </q-form>
        </div>
        
        
        </div>



     
    
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
              Account successfully updated!
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
                @click="$router.go(0)"
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
  name: 'myaccount-page',
  data: () => ({
    loading: false,
    error: false,
    success: false,
    form: { },
  }),
  computed: {
    user(){
      return User.getUser()
      
    }
  },
  beforeMount() {
    this.$q.loading.show({
          //spinner: QSpinnerFacebook,
          spinnerColor: 'white',
          thickness:"10",
          spinnerSize: 140,
          backgroundColor: 'primary',
          messageColor: 'white'
        })
    this.timer = setTimeout(() => {
      this.getUserData()
    }, 500)
    
  },
  methods: {
    async update() {
      this.loading = true
      const success = await User.register(this.form)
      if (success){
        this.loading = false
        this.success = true
      }
    },

     async getUserData() {
      const { data } = await this.$http.get('myaccount')
      console.log("aaaaa", data)
      
      // Object.assign(this.form, data)
      this.form = data
      console.log(this.form, "forrmm")
      localStorage.user = JSON.stringify(data)
      this.$q.loading.hide()
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
    
  },
}
</script>
