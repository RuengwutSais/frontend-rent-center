import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import Axios from "axios"
import '@fortawesome/fontawesome-free/css/all.css'
// import VueSocketIOExt from 'vue-socket.io-extended';
import Vuelidate from "vuelidate";

// eslint-disable-next-line
// Plugins
import GlobalComponents from "./globalComponents";
import GlobalDirectives from "./globalDirectives";

// MaterialDashboard plugin
import MaterialDashboard from "./material-dashboard";

import Chartist from "chartist";

// import socket from './socket';
// eslint-disable-next-line
import $ from 'jquery';
import 'bootstrap/dist/js/bootstrap.js'
import Vuemeta from 'vue-meta'
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(Vuemeta)
Vue.use(
  VueGoogleMaps,
  {
    load: {
      key: 'AIzaSyD7hXZ6OFQK5xjcQnqml85KP5xq79ScSAE',
      libraries: 'places'
    },
    installComponents: true
  }
);
import VueThaiAddressInput from 'vue-thai-address-input'

import 'vue-thai-address-input/dist/vue-thai-address-input.css'
import BlockUI from "vue-blockui";

Vue.use(BlockUI);
Vue.use(VueThaiAddressInput);


import VueCarousel from 'vue-carousel';
Vue.use(Vuelidate);
Vue.use(VueCarousel);
// Vue.use(VueSocketIOExt, socket);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$API_URL = process.env.VUE_APP_API
Vue.prototype.$URL_IMG = process.env.VUE_APP_URL_IMG

import io from 'socket.io-client';

// let socket = io.connect(process.env.VUE_APP_API);


// if (localStorage.getItem('profiles') && localStorage.getItem('token')) {
  let socket = io.connect(process.env.VUE_APP_API, {
    // Optional configuration options for the socket connection
  });
  socket.on('connect', () => {
    console.log('Socket connected!');
    Vue.prototype.$socketConnected = true;
  });


  Vue.prototype.$socket = socket;
// }

// Vue.prototype.$socket = socket


Vue.prototype.$Chartist = Chartist;
Vue.use(MaterialDashboard);
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
