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
