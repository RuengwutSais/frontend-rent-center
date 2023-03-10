import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import Axios from "axios"
import '@fortawesome/fontawesome-free/css/all.css'// import VueSocketIOExt from 'vue-socket.io-extended';
// eslint-disable-next-line
// let socket = io.connect(process.env.VUE_APP_API);
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



import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);
// Vue.use(VueSocketIOExt, socket);
Vue.use(BootstrapVue);
Vue.config.productionTip = false;
Vue.prototype.$axios = Axios;
Vue.prototype.$API_URL = process.env.VUE_APP_API
// Vue.prototype.$socket = socket

Vue.prototype.$Chartist = Chartist;
Vue.use(MaterialDashboard);
import 'bootstrap/dist/css/bootstrap.css'
Vue.use(GlobalComponents);
Vue.use(GlobalDirectives);

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
