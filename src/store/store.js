import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0,
    bookData: null,
    bookInfo: null,
    bookId: null,
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    setBookSearch(state, data) {
      state.bookData = data;
    },
    setBookID(state, id) {
      state.bookId = id;
    },
    setBookInfo(state, info) {
      state.bookInfo = info;
    },
  },
  getters: {
    getCount(state) {
      return state.count;
    },
    getBookData(state) {
      return state.bookData;
    },
    getBookID(state) {
      return state.bookId;
    },
    getBookInfo(state) {
      return state.bookInfo;
    },
  },
  actions: {
    searchBookList(context, search) {
      axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + search)
        .then((response) => {
          context.commit("setBookSearch", response.data);
        });
    },
    searchBook(context, id) {
      axios
        .get("https://www.googleapis.com/books/v1/volumes/" + id)
        .then((response) => {
          context.commit("setBookInfo", response.data);
        });
    },
    setBookId(context, id) {
      context.commit("setBookID", id);
    },
  },
});

export default store;
