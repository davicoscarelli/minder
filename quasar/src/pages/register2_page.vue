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
        Profile Setup
      </h5>
    </div>
    <div class="row justify-center">
      <q-form class="q-mx-md q-mb-xl" @submit="register">
        <ImageCrop
          @change="changePhoto"
          :ratio="1"
          size="100px"
        />
        <div class="row justify-center q-col-gutter-sm">
          
          <div class="col-12">
            <label class="text-accent text-bold ajust" for="name">
              Tags (What do you like?)
            </label>
              <q-select
                  v-model="form.tags"
                  use-input
                  class="q-mt-sm"
                  id="tags"
                  rounded
                  outlined
                  use-chips
                  multiple
                  hide-dropdown-icon
                  input-debounce="0"
                  new-value-mode="add-unique"
              />
          </div>
          <div class="col-12">
            <label class="text-accent text-bold ajust" for="bio">
              Bio
            </label>
            <q-input
              class="q-mt-sm"
              id="bio"
              rounded
              outlined
              type="textarea"
              v-model="form.bio"
              :rules="[val => !!val || 'Required']"
            />
          </div>
          <PhotoSelect
              @change="changeFile"
              :photos="photos"
            />

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
    photos: []
  }),
  
  components: {
    PhotoSelect: () => import('components/photos-select'),
    ImageCrop: () => import('components/image-crop'),
  },
  methods: {
    changeFile() {
      this.getUserData()
    },
    
    changePhoto(photo) {
      this.form.avatar = photo
      this.form.avatar_url = null
      },
    async register() {
      this.loading = true
      let user = JSON.parse(localStorage.user)
      let tags = this.form.tags ? JSON.stringify(this.form.tags) : '[]'
      const success = await User.register({
        ...this.form,
        tags: tags,
        id: user.id,
        })
      if (success != false){
        this.loading = false
        this.$router.push('/auth/login')
      }
    },
    async getUserData() {
      const { data } = await this.$http.get('myaccount')
      console.log("aaaaa", data)
      
      // Object.assign(this.form, data)
      this.photos = data.photos
      
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
