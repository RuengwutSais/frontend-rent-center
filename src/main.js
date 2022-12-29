import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import Axios from "axios"

Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios;

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
