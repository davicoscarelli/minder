<style lang="sass" scoped>



</style>

<template>
    <div style="overflow: hidden; border-radius:10px " class="shadow-2">
        <q-dialog 
            v-model="userShow" 
            @hide="openUserPage = false" 
            persistent
            maximized
            transition-show="slide-up"
            transition-hide="slide-down"
        >
    
            <q-card :class="`${$q.dark.isActive ? 'bg-black-4' : 'bg-grey-1'} q-pb-xl`">
                <div class="row" >
                    <div class="col-1">
                        </div>
                </div>
                <q-carousel
                    animated
                    v-model="slide"
                    arrows
                    style="height: 350px"
                    navigation
                    infinite
                    >

                    <q-carousel-slide v-if="userInfo.photos && userInfo.photos.length == 0" :name="0" :img-src="'images/no-image.png'"/>

                    <q-carousel-slide v-else v-for="photo in userInfo.photos" :key="photo.id" :name="photo.name" :img-src="photo.url"/>
                    
                
                    <template v-slot:control>
                        <q-carousel-control
                            position="top-right"
                            :offset="[15, 15]"
                            >
                            <q-btn  class="text-primary justify-center"  icon="close" flat round dense v-close-popup />
                        </q-carousel-control>
                    </template>
                </q-carousel>
                <div class="row">
                <div class="col-8 q-px-md q-pt-md q-pb-sm">
                    <label
                    style="font-size: 22pt"
                    class="text-left text-bold no-margin no-padding dialogTitle"
                    > {{userInfo.name}}
                    </label>
                    <label
                    style="font-size: 18pt"
                    class="text-left no-margin no-padding dialogTitle"
                    > {{userInfo.age}}
                    </label>
                </div>
                <div class="col-4 q-px-md q-pt-md" v-if="match">    
                    <q-btn v-if="userInfo.instagram" @click="openLink(`https://www.instagram.com/${userInfo.instagram.replace('@','')}`)" :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-instagram" flat round outline />
                    <q-btn v-if="userInfo.telegram" @click="openLink(`https://t.me/${userInfo.telegram.replace('@','')}`)" :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-telegram-plane" flat round outline />
                </div>
                </div>
                <div class="col-12 q-pl-md q-mb-sm" v-if="userInfo.tags">
                   <q-chip v-for="n in JSON.parse(userInfo.tags)" :key="n" outline :color="`${$q.dark.isActive ? 'white' : 'primary'}`" :text-color="`${$q.dark.isActive ? 'white' : 'primary'}`" >
                       {{n}}
                   </q-chip>
                </div>
                <div class="col-12 q-pl-md q-my-sm">
                    <label
                    style="font-size: 14pt"
                    class="text-leftno-margin no-padding dialogTitle"
                   > 🌎 {{userInfo.country}}
                    </label>
                </div>
                <div class="col-12 q-pl-md q-my-sm">
                    <label
                    style="font-size: 14pt"
                    class="text-leftno-margin no-padding dialogTitle"
                    > 🎓 Class of 20{{userInfo.class}}
                    </label>
                </div>
                <div class="col-12 q-pl-md q-mt-sm">
                    <label
                    style="font-size: 14pt"
                    class="text-left no-margin no-padding dialogTitle"
                    > ✏️Bio:
                    </label>
                </div>
                <div style="border-radius: 15px" 
                   class="col-12  q-mx-md q-pa-md"
                    :class="`${$q.dark.isActive ? 'bg-black-8' : 'bg-grey-2'}`">
                    <label
                    style="font-size: 14pt"
                    class="text-left no-margin no-padding dialogTitle"
                    > {{userInfo.bio}} 
                    </label>
                </div>

            </q-card>
        </q-dialog>
        
    </div>

</template>

<script>
import { openURL } from 'quasar'

export default {
  props: {
    openUserPage: Boolean,
    match: Boolean,
    userInfo: Object
  },
  data: () => ({
      slide: 0
    }),
  computed: {
    userShow:{
        get(){
            // console.log(this.userInfo)
            if (this.userInfo.photos && this.userInfo.photos.length != 0){
                    this.userInfo.photos.map((photo) =>{
                    photo.name =  this.userInfo.photos.indexOf(photo)
                })
            }
            // console.log(JSON.parse("[\"coding\", \"playing\", \"exploring\"]"))
            return this.openUserPage
        },
        set(val){
          this.$emit('closeUserPage', val)
        }
    },
},
  methods: {
    openLink(link){
      openURL(link)
    },
},
  
}
</script>

