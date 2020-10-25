import Vuex from "vuex";
import Vue from "vue";
import book from "./modules/book"
Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
      book: book
    }
});
export default store;
