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
  display: block
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

      <q-form class="q-mb-xl" @submit="update()">
            <div class="row justify-center q-col-gutter-sm">
              <div class="col-12 flex flex-center">
                <ImageCrop
                  @change="changePhoto"
                  :photo="avatar.photo"
                  :ratio="1"
                  class="q-mr-md"
                  size="100px"
                />
              </div>
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
            </div>
            <div class="col-12 col-md-6">
              <label class="text-accent text-bold ajust" for="name">
                Telegram 
              </label>
              <q-input
                class="q-mt-sm"
                id="name"
                ref="formname"
                rounded
                maxlength="60"
                outlined
                v-model="form.telegram"
              />
            </div>
            <div class="col-12 col-md-6">
              <label class="text-accent text-bold ajust" for="name">
                Instagram
              </label>
              <q-input
                class="q-mt-sm"
                id="name"
                ref="formname"
                rounded
                maxlength="60"
                outlined
                v-model="form.instagram"
              />
            </div>

            <PhotoSelect
              @change="changeFile"
              :photos="form.photos"
            />
            
          <div class="justify-center q-mt-md flex q-gutter-sm">
            
            <q-btn
              type="submit"
              class="q-mx-md q-px-md text-bold btn-size"
              unelevated
              rounded
              no-caps
              color="positive"
              label="Finish"
              size="16px"
            />
          </div>
          </q-form>
    </div>

    
    <q-dialog v-model="success">
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
      </q-dialog>

  </q-page>
</template>

<script>

import { User } from 'src/models/User'
import { Notify } from 'quasar'

export default {
  name: 'myaccount-page',
  data: () => ({
    loading: false,
    error: false,
    success: false,
    avatarchanged: false,
    form: {
      photos: [{
        id: 0,
        user_id: 0,
        url: '',
      }]
    },
    avatar: {}
  }),
  computed: {
    user(){
      return User.getUser()
      
    }
  },
  components: {
    PhotoSelect: () => import('components/photos-select'),
    ImageCrop: () => import('components/image-crop'),
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
      this.getUserData(false)
    }, 500)
    
  },
  methods: {
    changeFile() {
      this.getUserData(true)
    },
    async update() {
      this.loading = true
      console.log(this.form.images)
      let tags = this.form.tags ? JSON.stringify(this.form.tags) : "[]"
      const success = await User.register({
        bio: this.form.bio,
        avatar: this.form.avatar,
        tags: tags,
        id: this.user.id,
      })
      if (success && !this.avatarchanged){
        this.loading = false
        this.success = true
      }else{
        this.avatarchanged = false
        this.loading = false
      }
    },
    changePhoto(photo) {
      this.form.avatar = photo
      this.avatar = photo
      this.form.avatar_url = null
      this.avatarchanged = true
      this.update()
      },

     async getUserData(photos) {
      const { data } = await this.$http.get('myaccount')
      console.log("aaaaa", data)
      
      // Object.assign(this.form, data)
      if(photos) this.form = {...this.form, photos: data.photos, id: data.id}
      else{
        let tags =  JSON.parse(data.tags)
        this.form = {...data, tags: tags}
      } 

      if (data.avatar){
        //this.avatar = user.avatar_url
        this.avatar = {photo: data.avatar}
        data.avatar = null
      }else{
        this.avatar = {photo: 'images/avatar.png'}
      }
      console.log(this.form, "forrmm")
      localStorage.user = JSON.stringify(data)
      this.$q.loading.hide()
    },
    
  },
}


// import { User } from 'src/models/User'

// export default {
//   name: 'register-page',
//   data: () => ({
//     loading: false,
//     isPwd: true,
//     form: { },
//     photos: []
//   }),
//   computed: {
//     user(){
//       return User.getUser()
//     }
//   },
//   components: {
//     PhotoSelect: () => import('components/photos-select'),
//     ImageCrop: () => import('components/image-crop'),
//   },
//   methods: {
//     changeFile() {
//       this.getUserData()
//     },
    
//     changePhoto(photo) {
//       this.form.avatar = photo
//       this.form.avatar_url = null
//       },
//     async register() {
//       this.loading = true
//       let user = JSON.parse(localStorage.user)
//       let tags = this.form.tags ? JSON.stringify(this.form.tags) : "[]"
//       const success = await User.register({
//         ...this.form,
//         tags: tags,
//         id: user.id,
//         })
//       if (success != false){
//         console.log("ATUALIZAA", success)
//         this.loading = false
//         this.$router.push('/auth/login')
//       }
//     },
//     async getUserData() {
//       const { data } = await this.$http.get('myaccount')
//       console.log("aaaaa", data)
      
//       // Object.assign(this.form, data)
//       this.photos = data.photos
      
//     },

//   },
// }
</script>
