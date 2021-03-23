<style lang="sass" scoped>
  .header
    height: 150px
  .logo
    height: 100px
    width: 250px
    margin-top: 25px
  .appendice
    height: 100px
    width: 250px
 
</style>

<template>
<q-layout view="hHh Lpr lff" >
    <q-header elevated>
      <div class="col header">
          <div class="row justify-center">
            <h2>minder</h2>
              <!-- <q-img src="~assets/logo2.png" class="logo"/> -->
          </div>
      </div>
    </q-header>
    
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  
</template>

<script>
export default {
  name: 'AuthLayout',

  data() {
    return {}
  }
}
</script>
