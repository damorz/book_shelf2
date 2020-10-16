import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";
import routes from "./routes";
import store from "./store/store";
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);

Vue.config.productionTip = false;

Vue.component("nav-bar", require("./components/navbar.vue").default);
Vue.component("footer-bar", require("./components/footer.vue").default);

const router = new VueRouter({
  mode: "history",
  routes: routes,
});

router.beforeEach((to, from, next) => {
  if (to.fullPath === "/book") {
    next("/");
  }
  next();
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
