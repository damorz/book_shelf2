import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    favoriteBookCount: 0,
    bookData: null,
    bookInfo: null,
    bookId: null,
    searchKey: "",
    bookDataBackup: null,
  },
  mutations: {
    setfavoriteBookCount(state, count) {
      state.favoriteBookCount = count;
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
    setSearchKey(state, key) {
      state.searchKey = key;
    },
    setBookListBackup(state, data) {
      state.bookDataBackup = data;
    },
  },
  getters: {
    getFavoriteBookCount(state) {
      return state.favoriteBookCount;
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
    getSearchKey(state) {
      return state.searchKey;
    },
    getBookListBackup(state) {
      return state.bookDataBackup;
    },
  },
  actions: {
    searchBookList(context, searchKey) {
      axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + searchKey)
        .then((response) => {
          context.commit("setBookSearch", response.data);
        });
    },
    searchBookListBySearchBar(context, searchKey) {
      if (searchKey == this.state.searchKey) {
        context.dispatch("searchBookList", searchKey);
      }
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
    randomSearchBook(context) {
      var randomString = Math.random()
        .toString(36)
        .substr(2, 1);
      context.dispatch("searchBookList", randomString);
      setTimeout(function() {
        context.dispatch("setBookListBackup");
      }, 2000);
    },
    setSearchKey(context, key) {
      context.commit("setSearchKey", key);
    },
    setBookListBackup(context) {
      context.commit("setBookListBackup", this.state.bookData);
    },
    restoreBookData(context) {
      context.commit("setBookSearch", this.state.bookDataBackup);
    },
  },
});

export default store;
