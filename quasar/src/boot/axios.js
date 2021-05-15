import Vue from 'vue'
import axios from 'axios'


axios.defaults.baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://api.minder.minerva.community'
    : 'http://localhost:3333'
   

Vue.prototype.$http = axios
