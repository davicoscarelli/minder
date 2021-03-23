<template>
  <q-page class="flex flex-center">
    <div id="app">
      <VueTinder  ref="tinder" key-name="id" :queue.sync="queue" :offset-y="10" @submit="onSubmit">
        <template slot-scope="scope" class="">
          
          <div class=" text-container">
            <div class="col-12 ">
              <div class="row ">
                <p style="font-size: 20pt" class="text-white text-bold q-mb-none">{{scope.data.name}}</p>
                <p style="font-size: 18pt" class="text-white q-ml-sm q-mb-none">{{scope.data.age}}</p>
              </div>
              <div class="row">
                <p style="font-size: 14pt" class="text-white">{{scope.data.bio}}</p>
              </div>
            </div>
          </div>

          <div
            class="pic"
            :style="{
              'background-image': `url(${scope.data.images[0]})`
            }"
            @click="open()"
          />
          
          
          
          
        </template>
        <img class="like-pointer" slot="like" src="../assets/like-txt.png">
        <img class="nope-pointer" slot="nope" src="../assets/nope-txt.png">
        <img class="super-pointer" slot="super" src="../assets/super-txt.png">
        <img class="rewind-pointer" slot="rewind" src="../assets/rewind-txt.png">
      </VueTinder>
      <div class="btns">
        <img src="../assets/rewind.png" @click="decide('rewind')">
        <img src="../assets/nope.png" @click="decide('nope')">
        <img src="../assets/super-like.png" @click="decide('super')">
        <img src="../assets/like.png" @click="decide('like')">
      </div>

    </div>
  </q-page>
</template>

<script>
import VueTinder from 'vue-tinder'
import source from "../bing";

export default {
  name: 'PageIndex',

  components: {
    VueTinder
  },
  data: () => ({
    queue: [],
    offset: 0,
    history: [],
  }),
  created() {
    this.getQueue();
  },
  methods: {
    open(){
      console.log("vrau")
    },
    async getQueue() {
      let list = [
        {
          id: 0,
          name: "Davi Coscarelli",
          bio: "Nothing to declare",
          age: "19",
          city: "Boa Vista",
          images: ["https://instagram.fbvb2-1.fna.fbcdn.net/v/t51.2885-15/e35/150472018_722140988494711_4586550391134516284_n.jpg?tp=1&_nc_ht=instagram.fbvb2-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=7q7DsGX4lL4AX9tIylw&ccb=7-4&oh=355333cfd2e0f254309df581c039b0be&oe=6083D7BB&_nc_sid=83d603"]
        },
        {
          id: 1,
          name: "Felipe Bandeira",
          bio: "Nothing to declare",
          age: "22",
          city: "Recife",
          images: ["https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8bWVufGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80"]
        },
        {
          id: 2,
          name: "Zoey",
          bio: "Nothing to declare",
          age: "20",
          city: "No Idea",
          images: ["https://images.unsplash.com/photo-1536063211352-0b94219f6212?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8YmVhdXRpZnVsJTIwZ2lybHxlbnwwfHwwfA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"]
        },
      ]

      this.queue = list
    },
    onSubmit({ item }) {
      if (this.queue.length === 0) {
        // this.getQueue();
      }
      this.history.push(item);
    },
    async decide(choice) {
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
