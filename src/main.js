import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router"

// import Vuetify from 'vuetify'
// import Vuex from 'vuex';
import routes from "./routes";

import vuetify from './plugins/vuetify';

Vue.use(VueRouter)

Vue.config.productionTip = false

// Vue.component('HelloWorld', require('./components/HelloWorld.vue').default);
const router = new VueRouter({
  mode: 'history',
  routes: routes 
});

new Vue({
  render: h => h(App),
  vuetify,
  router
}).$mount('#app')
