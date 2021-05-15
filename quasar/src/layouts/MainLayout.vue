<template>
  <q-layout view="lHh Lpr lFf">
    <q-header style="background: linear-gradient(to top right, #f32b60, #ff8f1f)" elevated>
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
        <q-toolbar-title @click="$router.push('/')" class="text-center cursor-pointer">
          <!-- <q-img src="images/logo.png" style="width: 20px; height: 100%" class="q-mr-sm"/> -->

          minder
        </q-toolbar-title>

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

    <MatchPage :matchInfo="match" :userInfo="user" :openMatchPage.sync="openMatchPage" @closeMatchPage="val => openMatchPage = val"/>

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
            :src="user.avatar_url || 'images/avatar.png'"
           
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
  
    <q-page-sticky position="bottom" class="" :offset="[0, 0]">
      <q-banner v-show="showAppInstallBanner" inline-actions rounded style="background: linear-gradient(to top right, #f32b60, #ff8f1f)" class="text-white">
        <template v-slot:avatar>
          <img
            src="icons/icon-128x128.png"
            style="width: 50px; border: 1.5px solid #fff; border-radius: 15px"  
          >
        </template>
        Install Minder?

        <template v-slot:action>
          <q-btn flat label="Yes" @click="installApp"/>
          <q-btn flat label="Later" @click="showAppInstallBanner = false"/>
        </template>
      </q-banner>
     </q-page-sticky>

  </q-layout>

</template>

<script>
import { User } from 'src/models/User'

let deferredPrompt

export default {
  name: 'MainLayout',
  computed: {
    getUser() {
      this.user = User.getUser()
      return User.getUser()
    },
    iconColor() {
      return this.$q.dark.isActive ? 'white' : 'primary'
    }
  },
  mounted(){
    let neverShowAppInstallBanner = localStorage.getItem('neverShowAppInstallBanner')
    if (!neverShowAppInstallBanner){
      console.log('YEEE')
      window.addEventListener('beforeinstallprompt', (e) => {
        deferredPrompt = e;
        this.showAppInstallBanner = true
      })
    }
  },
  created(){
    let theme = JSON.parse(localStorage.getItem('theme'))
    this.$q.dark.set(theme ? theme.dark : false)
    this.timer = setInterval(this.getMatches, 1000)
  },
  methods: {
    installApp(){
      this.showAppInstallBanner = false,
      deferredPrompt.prompt()
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted'){
          this.neverShowAppInstallBanner()
        }
      })
    },
    neverShowAppInstallBanner(){
      this.showAppInstallBanner = false
      localStorage.set('neverShowAppInstallBanner', true)
    },
    openUser(match){
      this.match = match
      this.openUserPage = true
    },
    async getMatches(){
      let matches =  await User.getMatches()
      // console.log("matches", this.matches)
      this.matches = matches.allMatches
      // console.log(matches.user)
      this.user = matches.user
      if (matches.match){
        this.match = matches.match
        this.openMatchPage = true
      }
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

      this.$router.push('/login')
      
    },
    
    
  },
  components: {
    UserPage: () => import('components/user_page.vue'),
    MatchPage: () => import('components/match_page.vue'),

  },
  data () {
    return {
      matches: [],
      timer: '',
      match: {},
      user: {},
      showAppInstallBanner: false,
      openUserPage: false,
      openMatchPage: false,
      leftDrawerOpen: false,
      rightDrawerOpen: false,
    }
  },
  
}
</script>
