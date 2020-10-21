import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import Vuetify from "vuetify";
import Vuex from "vuex";
import routes from "./routes";
import store from "./store/store";
import vueDebounce from "vue-debounce";
Vue.use(VueRouter);
Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(vueDebounce);

Vue.config.productionTip = false;

Vue.use(vueDebounce, {
  listenTo: "input",
});

Vue.use(vueDebounce, {
  defaultTime: "700ms",
});

Vue.component("nav-bar", require("./components/navbar.vue").default);
Vue.component("footer-bar", require("./components/footer.vue").default);
Vue.component("bookList", require("./components/bookList.vue").default);
Vue.component("bookItem", require("./components/bookItem.vue").default);
Vue.component("favoriteBookList", require("./components/favoriteBookList.vue").default);

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
