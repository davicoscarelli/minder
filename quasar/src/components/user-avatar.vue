<style lang="sass" scoped>
.user-menu-content 
  width: 270px
  max-width: 300px
  font-size: 12px

.notifications
  width: 350px

.notificationsList
    width: 350px

@media (max-width: 400px)
  .notifications
    width: 320px

  .notificationsList
    width: 320px

@media (max-width: 370px)
  .notifications
    width: 250px

  .notificationsList
    width: 250px

</style>

<template>
  <div class="row q-gutter-sm" >


    <q-avatar class="cursor-pointer" v-show="!loading && user">
      <img :src="user.avatar ? user.avatar_url : 'images/avatar.png'" />
      <q-menu max-width="320px">
        <div class="q-py-md">
          <div class="user-menu-content">
            <q-list>
              <q-item-label class="q-pb-md q-px-md text-subtitle1">
                {{ user.name }}
              </q-item-label>
              <q-separator />
              <q-item clickable v-ripple @click="changeTheme()">
                <q-item-section avatar>
                  <q-icon
                    :color="iconColor"
                    :name="`mdi-brightness-${$q.dark.isActive ? '7' : '4'}`"
                  />
                </q-item-section>
                <q-item-section>
                  {{ `${$q.dark.isActive ? 'Light Mode' : 'Dark Mode'}` }}
                </q-item-section>
              </q-item>

              <q-item
                active-class="text-positive"
                clickable
                v-ripple
                to="/my-account"
                exact
              >
                <q-item-section avatar>
                  <q-icon :color="iconColor" name="mdi-account" />
                </q-item-section>
                <q-item-section>My Account</q-item-section>
              </q-item>

              <q-item clickable v-ripple @click="logout()">
                <q-item-section avatar>
                  <q-icon :color="iconColor" name="mdi-exit-run" />
                </q-item-section>
                <q-item-section>Logout</q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
      </q-menu>
    </q-avatar>
      
  </div>
  
</template>

<script>
import { Notify } from 'quasar'
import { User } from 'src/models/User'

export default {
  data: () => ({
    loading: false,
    

  }),
  computed: {
    user() {
      // return User.getUser()
      return {name: 'Davi Coscarelli', avatar: ''}
    },
    iconColor() {
      return this.$q.dark.isActive ? 'white' : 'primary'
    }
  },
  
  methods: {
    
    changeTheme() {
      const dark = !this.$q.dark.isActive
      this.$q.dark.set(dark)
      localStorage.setItem('theme', JSON.stringify({ dark }))
    },
    async logout() {
      const userName = this.user.name
      this.loading = true
      await User.logout()
      this.loading = false
      this.$q.dark.set(false)

      this.$router.push('/auth/login')
    },
    
  }
}
</script>
