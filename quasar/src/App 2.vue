<template>
  <div id="q-app">
    <router-view />
  </div>
</template>
<script>
import { User } from 'src/models/User'

export default {
  name: 'App',
  methods: {
    async getUser(){
      const isAuthenticated = User.isAuthenticated()
      if (isAuthenticated){
        const { data } = await this.$http.get('myaccount')
        const user = data
        
        localStorage.user = JSON.stringify(user)
        console.log(data)
      }
    }
  },
  mounted(){
    this.getUser()
  }
}
</script>
