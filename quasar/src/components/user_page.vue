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

                    <q-carousel-slide v-if="userInfo.photos && userInfo.photos.length == 0" :name="0" :img-src="'https://instagram.fbvb2-1.fna.fbcdn.net/v/t51.2885-15/e35/150472018_722140988494711_4586550391134516284_n.jpg?tp=1&_nc_ht=instagram.fbvb2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7q7DsGX4lL4AX9tIylw&ccb=7-4&oh=355333cfd2e0f254309df581c039b0be&oe=6083D7BB&_nc_sid=83d603'"/>

                    <q-carousel-slide v-else v-for="photo in userInfo.photos" :key="photo.name" :name="photo.name" :img-src="'https://instagram.fbvb2-1.fna.fbcdn.net/v/t51.2885-15/e35/150472018_722140988494711_4586550391134516284_n.jpg?tp=1&_nc_ht=instagram.fbvb2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7q7DsGX4lL4AX9tIylw&ccb=7-4&oh=355333cfd2e0f254309df581c039b0be&oe=6083D7BB&_nc_sid=83d603'"/>
                    
                
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
                    > 20
                    </label>
                </div>
                <div class="col-4 q-px-md q-pt-md">    
                    <q-btn  :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-instagram" flat round outline />
                    <q-btn  :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-telegram-plane" flat round outline />
                </div>
                </div>
                <div class="col-12 q-pl-md q-mb-sm">
                   <q-chip v-for="n in 5" :key="n" outline :color="`${$q.dark.isActive ? 'white' : 'primary'}`" :text-color="`${$q.dark.isActive ? 'white' : 'primary'}`" >
                       Coding
                   </q-chip>
                </div>
                <div class="col-12 q-pl-md q-my-sm">
                    <label
                    style="font-size: 14pt"
                    class="text-leftno-margin no-padding dialogTitle"
                   > 🌎 Brazil 
                    </label>
                </div>
                <div class="col-12 q-pl-md q-my-sm">
                    <label
                    style="font-size: 14pt"
                    class="text-leftno-margin no-padding dialogTitle"
                    > 🎓 Class of 2025
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
                    > A classic yellow pencil. Depicted as a graphite pencil, like a U.S. #2 or European HB,
                     with a sharpened tip and pink eraser. A classic yellow pencil. Depicted as a graphite pencil, like a U.S. #2 or European HB,
                     with a sharpened tip and pink eraser. 
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
    userInfo: Object
  },
  data: () => ({
      slide: 0
    }),
  computed: {
    userShow:{
        get(){
            console.log(this.userInfo)
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

