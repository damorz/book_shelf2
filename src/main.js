/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import store from "./store/store";
import vueDebounce from "vue-debounce";
import VueRouter from "vue-router";
import routes from "./routes"
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(vueDebounce);

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: "input",
  defaultTime: "700ms"
});

const router = new VueRouter({
  mode: "hash",
  routes: routes,
});

new Vue({
  render: (h) => h(App),
  vuetify: new Vuetify(),
  store: store,
  router,
  data: () => ({
    drawer: null,
  }),
}).$mount("#app");
