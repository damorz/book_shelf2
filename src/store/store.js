import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bookData: null,
    favoriteBookData: null,
    bookInfo: null,
    bookId: null,
    searchKey: "",
    bookDataBackup: null,
    backupSearchKey: "",
  },
  mutations: {
    setFavoriteBookData(state, data) {
      state.favoriteBookData = data;
    },
    setBackupSearchKey(state, key) {
      state.backupSearchKey = key;
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
    getFavoriteBookData(state) {
      return state.favoriteBookData;
    },
    getBackSearchKey(state) {
      return state.backupSearchKey;
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
    searchfavoriteBookData(context, searchId) {
      var favoriteBook = [];
      var i = 0;
      searchId.forEach(id => {
        axios
        .get("https://www.googleapis.com/books/v1/volumes/" + id)
        .then((response) => {
          favoriteBook[i++] = response.data;
        });
      });
      context.commit("setFavoriteBookData",favoriteBook);
    },
    setBackupSearchKey(context, backupSearchKey) {
      context.commit("setBackupSearchKey",backupSearchKey);
    },
    searchSortedBookList(context, searchKey) {
      if(this.getters.getBackSearchKey == "") {
        context.dispatch("randomSearchBook",searchKey);
      }
      else {
        axios
        .get("https://www.googleapis.com/books/v1/volumes?q=" + this.getters.getBackSearchKey+ searchKey)
        .then((response) => {
          context.commit("setBookSearch", response.data);
        });
      }
    },
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
        context.dispatch("setBackupSearchKey",searchKey+"&orderBy=");
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
    randomSearchBook(context, sortingType) {
      var randomString = Math.random()
        .toString(36)
        .substr(2, 1);
      var searchKey = randomString+"&orderBy="+sortingType;
      context.dispatch("searchBookList", searchKey);
      setTimeout(function() {
        context.dispatch("setBackupSearchKey",randomString+"&orderBy=");
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
