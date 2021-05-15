<style lang="sass" scoped>
  .header
    height: 150px
  .logo
    height: 100%
    width: 40px
  .appendice
    height: 100px
    width: 250px
 
</style>

<template>
<q-layout view="hHh Lpr lff" >
    <q-header elevated style="background: linear-gradient(to top right, #f32b60, #ff8f1f)">
      <div class="col-12 justify-center header">
          <div class="row flex-center">
            <q-img src="images/logo.png" class="logo q-mr-md"/>
            <h3>minder</h3>
              
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
