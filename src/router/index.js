import VueRouter from "vue-router";
import Vue from "vue";
import routes from "./routes"
Vue.use(VueRouter);


const router = new VueRouter({
    mode: "hash",
    routes: routes,
});

export default router;