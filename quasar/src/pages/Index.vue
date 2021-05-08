<template>
  <q-page class="flex flex-center">
    <div id="app">
      <VueTinder v-if="queue.length > 0" ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit" :allowSuper="false">
        
        <template slot-scope="scope">
          
          <div class=" text-container"  @click="openUser(scope.data)">
            <div class="col-12 ">
              <div class="row ">
                <p style="font-size: 20pt" class="text-white text-bold q-mb-none">{{scope.data.name}}</p>
                <p style="font-size: 18pt" class="text-white q-ml-sm q-mb-none">{{scope.data.age}}</p>
              </div>
              <div class="row">
                <!-- <p style="font-size: 14pt" class="text-white">{{scope.data.bio}}</p> -->
              </div>
            </div>
          </div>
          <div
            class="pic"
            :style="{
              'background-image': `url(${scope.data.photos.length > 0 ? scope.data.photos[0] : 'https://instagram.fbvb2-1.fna.fbcdn.net/v/t51.2885-15/e35/150472018_722140988494711_4586550391134516284_n.jpg?tp=1&_nc_ht=instagram.fbvb2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7q7DsGX4lL4AX9tIylw&ccb=7-4&oh=355333cfd2e0f254309df581c039b0be&oe=6083D7BB&_nc_sid=83d603'})`
            }"
          />
          
          
          
          
        </template>
        
        <img class="like-pointer" slot="like" src="../assets/like-txt.png">
        <img class="nope-pointer" slot="nope" src="../assets/nope-txt.png">
        <!-- <img class="super-pointer" slot="super" src="../assets/super-txt.png">
        <img class="rewind-pointer" slot="rewind" src="../assets/rewind-txt.png"> -->
      </VueTinder>
      <div class="btns" v-if="queue.length > 0">
        <!-- <img src="../assets/rewind.png" @click="decide('rewind')"> -->
        <img src="../assets/nope.png" @click="decide('nope')">
        <!-- <img src="../assets/super-like.png" @click="decide('super')"> -->
        <img src="../assets/like.png" @click="decide('like')">
      </div>

       <UserPage :userInfo="match" :match="false" :openUserPage.sync="openUserPage" @closeUserPage="val => openUserPage = val"/>
       <MatchPage :matchInfo="match" :userInfo="user" :openMatchPage.sync="openMatchPage" @closeMatchPage="val => openMatchPage = val"/>
       

      <div class="row flex flex-center">
        <div class="flex-center flex col-12">
        <q-icon class="flex-center" size="10em" color="grey-6" name="mdi-heart-broken" />
        </div>
        <div class="col-12 text-center">
          <label style="font-size: 18pt" class="text-grey-6">Nobody found...</label>
        </div>
        <div class="col-12 text-center q-py-md">
          <q-btn
            label="Search for more"
            size="15px"
            outline
            color="grey-6"
            class="text-bold"
            style="width: 150px; font-size: 12pt"
            no-caps
            rounded
            @click="getQueue"
          />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import VueTinder from 'vue-tinder'
import { User } from 'src/models/User'

export default {
  name: 'PageIndex',

  components: {
    VueTinder,
    UserPage: () => import('components/user_page.vue'),
    MatchPage: () => import('components/match_page.vue'),
  },
  data: () => ({
    queue: [],
    offset: 0,
    match: {},
    openUserPage: false,
    openMatchPage: false,
    history: [],
  }),
  created() {
    this.getQueue();
  },
  computed: {
    user(){
      return User.getUser()
    }
  },
  methods: {
    openUser(match){
      this.match = match
      this.openUserPage = true
    },
    async getQueue() {
      const { data } = await this.$http.get('clients')
      console.log("aaaaa", data)

      // "https://instagram.fbvb2-1.fna.fbcdn.net/v/t51.2885-15/e35/150472018_722140988494711_4586550391134516284_n.jpg?tp=1&_nc_ht=instagram.fbvb2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7q7DsGX4lL4AX9tIylw&ccb=7-4&oh=355333cfd2e0f254309df581c039b0be&oe=6083D7BB&_nc_sid=83d603"
      this.queue = data.data
      console.log(this.queue, "QUEUE")
    },
    async onSubmit({ item, type }) {
      console.log(type)
      if (this.queue.length === 0) {
        // this.getQueue();
      }
      let decision = await User.decide(item, type)
        console.log("DECISIONN", decision)

      if (decision){
        console.log("AAAII", decision)
        this.match = decision
        this.openMatchPage = true
      }
      this.history.push(item);
    },
    async decide(choice) {
      console.log(choice)
      if (choice === "rewind") {
        if (this.history.length) {
          this.$refs.tinder.rewind([this.history.pop()]);
        }
      } else if (choice === "help") {
        window.open("https://shanlh.github.io/vue-tinder");
      } else {
        this.$refs.tinder.decide(choice);
      }
    }
  }
}
</script>

<style>
html,
body {
  height: 100%;
}

body {
  margin: 0;
  overflow: hidden;
}

.text-container {
  padding-left: 10px;
  position: absolute;
  display: flex;
  align-items: flex-end;
  width: 100%;
  height: 100%;
  
  
}

#app .vue-tinder {
  position: absolute;
  z-index: 1;
  left: 0;
  right: 0;
  top: 23px;
  margin: auto;
  width: calc(100% - 20px);
  height: calc(100% - 23px - 65px - 47px - 16px);
  min-width: 300px;
  max-width: 355px;
  
}

.nope-pointer,
.like-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  width: 128px;
}

.nope-pointer {
  right: 10px;
}

.like-pointer {
  left: 10px;
}

.super-pointer {
  position: absolute;
  z-index: 1;
  bottom: 80px;
  left: 0;
  right: 0;
  margin: auto;
  width: 128px;
}

.rewind-pointer {
  position: absolute;
  z-index: 1;
  top: 20px;
  right: 10px;
  width: 112px;
  height: 78px;
}

.pic {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  box-shadow: inset -10px -100px 30px -25px rgba(170, 79, 94, 0.466); 
  
}

.btns {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 30px;
  margin: auto;
  height: 65px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 300px;
  max-width: 355px;
}

.btns img {
  margin-right: 12px;
  box-shadow: 0 4px 9px rgba(92, 92, 92, 0.15);
  border-radius: 50%;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
}

.btns img:nth-child(2n + 1) {
  width: 53px;
}

.btns img:nth-child(2n) {
  width: 65px;
}

.btns img:nth-last-child(1) {
  margin-right: 0;
}
</style>
