import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from "bootstrap-vue";
import Axios from "axios"
import '@fortawesome/fontawesome-free/css/all.css'




Vue.use(BootstrapVue);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios;
Vue.prototype.$API_URL = process.env.VUE_APP_API

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
