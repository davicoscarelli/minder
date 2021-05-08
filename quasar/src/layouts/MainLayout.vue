<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          size="16pt"
          icon="people"
          aria-label="Mathces"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />
        <q-space />
        <q-toolbar-title class="text-center">
          minder
        </q-toolbar-title>
        <q-space />

        <div>
          <q-btn
            flat
            dense
            round
            size="16pt"
            icon="person"
            aria-label="Me"
            @click="rightDrawerOpen = !rightDrawerOpen"
          />
          
      <!-- <img :src="user.avatar ? user.avatar_url : 'images/avatar.png'" /> -->
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      elevated
      bordered
      :content-class="`${$q.dark.isActive ? 'bg-black-4' : 'bg-grey-1'}`"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Matches
        </q-item-label>
        <div 
          v-if="matches.length == 0"
          class="text-grey-8 text-center"
        >
          No matches yet...
        </div>
        <q-item
          clickable
          tag="a"
          v-for="match in matches"
          :key="match.id"
          target="_blank"
          @click="openUser(match)"
        >
          <q-item-section
            avatar
          >
          <q-avatar>
            <img :src="match.avatar ? match.avatar_url : 'images/avatar.png'" />
          </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ match.name }}</q-item-label>
            <q-item-label caption>
              {{ match.email }}
            </q-item-label>
          </q-item-section>
        </q-item>
        
      </q-list>
      
    </q-drawer>

    <UserPage :userInfo="match" :match="true" :openUserPage.sync="openUserPage" @closeUserPage="val => openUserPage = val"/>

    <q-drawer
      side="right"
      v-model="rightDrawerOpen"
      show-if-above
      elevated
      bordered
      :content-class="`${$q.dark.isActive ? 'bg-black-4' : 'bg-grey-1'} text-center`"
    >
      <q-avatar
          class="q-my-md text-bold shadow-8"
          size="80px"
          text-color="white"
        >
          <q-img
            ref="current_photo"
            :src="user.avatar ? user.avatar_url : 'images/avatar.png'"
           
          />
          
        </q-avatar>
      <q-list >
        
        <q-item-label class="q-pb-md q-px-md text-subtitle1">
          {{ user.name }}
        </q-item-label>
        <q-separator />

        <q-item
          active-class="text-positive"
          clickable
          v-ripple
          to="/"
          exact
        >
          <q-item-section avatar>
            <q-icon :color="iconColor" name="mdi-home" />
          </q-item-section>
          <q-item-section class="text-left">Home</q-item-section>
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
          <q-item-section class="text-left">My Account</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="changeTheme()">
          <q-item-section avatar>
            <q-icon
              :color="iconColor"
              :name="`mdi-brightness-${$q.dark.isActive ? '7' : '4'}`"
            />
          </q-item-section>
          <q-item-section class="text-left">
            {{ `${$q.dark.isActive ? 'Light Mode' : 'Dark Mode'}` }}
          </q-item-section>
        </q-item>

        
        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon :color="iconColor" name="mdi-exit-run" />
          </q-item-section>
          <q-item-section class="text-left">Logout</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  
  </q-layout>
</template>

<script>
import { User } from 'src/models/User'


export default {
  name: 'MainLayout',
  computed: {
    user() {
      return User.getUser()
    },
    iconColor() {
      return this.$q.dark.isActive ? 'white' : 'primary'
    }
  },
  created(){
    let theme = JSON.parse(localStorage.getItem('theme'))
    this.$q.dark.set(theme ? theme.dark : false)
    this.timer = setInterval(this.getMatches, 1000)
  },
  methods: {
    openUser(match){
      this.match = match
      this.openUserPage = true
    },
    async getMatches(){
      this.matches =  await User.getMatches()
      console.log("matches", this.matches)
    },
    
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

      this.$router.push('/auth/login')
      
    },
    
    
  },
  components: {
    UserPage: () => import('components/user_page.vue'),
  },
  data () {
    return {
      matches: [],
      timer: '',
      match: {},
      openUserPage: false,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    }
  },
  
}
</script>
