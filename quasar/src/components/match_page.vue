<style lang="sass" scoped>



</style>

<template>
    <div style="overflow: hidden; border-radius:10px " class="shadow-2">
        <q-dialog 
            v-model="matchShow" 
            @hide="openMatchPage = false" 
            persistent
            maximized
            transition-show="scale"
            transition-hide="scale"
        >
            <q-card :class="`${$q.dark.isActive ? 'bg-black-4' : 'bg-grey-1'} q-pb-xl`">
                <div class="row" >
                    <div class="col-12 text-right">
                        <q-btn class="text-primary justify-center"  icon="close" flat round dense v-close-popup />
                    </div>
                </div>
                <div class="col-12 flex flex-center">
                    <q-img src="images/match.png"/>
                </div>
                <div class="text-center">
                    <label style="font-size: 14pt">You and {{matchInfo.name}} liked each other!</label>
                </div>
                <div class="row q-py-xl justify-evenly">
                    <div class="col-5 flex justify-end">
                        <q-avatar class="q-my-md text-bold shadow-8" size="120px">
                            <q-img :src="userInfo.avatar_url ? userInfo.avatar_url : 'images/avatar.png'"/>
                        </q-avatar>
                    </div>
                    <div class="col-2 flex flex-center">
                        <vue-star ref="vueStar" animate="animated rubberBand" >
                            <a slot="icon" class="fa fa-heart"></a>              
                        </vue-star>
                    </div>
                    <div class="col-5 flex justify-start">
                        <q-avatar class="q-my-md text-bold shadow-8" size="120px">
                            <q-img :src="matchInfo.avatar_url ? matchInfo.avatar_url : 'images/avatar.png'"/>
                        </q-avatar>
                    </div>
                </div>
                <div class="text-center">
                    <label style="font-size: 18pt">Start a conversation now!</label>
                </div>
                <div class="col-12 flex flex-center q-px-md">    
                    <q-btn v-if="matchInfo.instagram" @click="openLink(`https://www.instagram.com/${matchInfo.instagram.replace('@','')}`)" size="25px" :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-instagram" flat round outline />
                    <q-btn v-if="matchInfo.telegram" @click="openLink(`https://t.me/${matchInfo.telegram.replace('@','')}`)" size="25px" :class="`${$q.dark.isActive ? 'text-white' : 'text-primary'}`"  icon="fab fa-telegram-plane" flat round outline />
                </div>
                <div class="text-center q-mt-md">
                    <label style="font-size: 12pt">or</label>
                    <label @click="matchShow = false" class="q-ml-sm cursor-pointer text-primary" style="font-size: 12pt">Keep Swiping</label>
                </div>
            </q-card>
        </q-dialog>
        
    </div>

</template>

<script>
import { openURL } from 'quasar'
import VueStar from 'vue-star'

export default {
  props: {
    openMatchPage: Boolean,
    matchInfo: Object,
    userInfo: Object
  },
  components: {
    VueStar
  },
  created(){
    this.timer = setInterval(()=>{
        if(this.openMatchPage){
            if(this.$refs.vueStar != undefined){
            this.$refs.vueStar.toggle()

            }
        }
    }, 500)
  },
  data: () => ({
      slide: 0
    }),
  computed: {
    matchShow:{
        get(){
          console.log('AAAAAAAAMSMSJDNJ', this.userInfo, this.matchInfo)
          return this.openMatchPage
        },
        set(val){
          this.$emit('closeMatchPage', val)
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

