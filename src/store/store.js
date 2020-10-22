import axios from "axios";
import Vuex from "vuex";
import Vue from "vue";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    bookData: null,
    bookInfo: null,
    bookId: null,
    searchKey: "",
    bookDataBackup: null,
    backupSearchKey: "",
    filterType: null,
  },
  mutations: {
    setFilterType(state, word) {
      state.filterType = word;
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
    getFilterType(state) {
      return state.filterType;
    },
    getBackupSearchKey(state) {
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
    setFilterType(context, filter) {
      console.log(filter);
      context.commit("setFilterType", filter);
    },
    setBackupSearchKey(context, backupSearchKey) {
      context.commit("setBackupSearchKey", backupSearchKey);
    },
    searchSortedBookList(context, searchKey) {
      if (this.getters.getBackupSearchKey == "") {
        context.dispatch("randomSearchBook", searchKey);
      } 
      else {
        if (this.getters.getFilterType != undefined && this.getters.getFilterType != null) {
          axios
            .get(
              "https://www.googleapis.com/books/v1/volumes?q=" + this.getters.getBackupSearchKey + searchKey + "&filter=" + this.getters.getFilterType)
            .then((response) => {
              context.commit("setBookSearch", response.data);
            });
        } 
        else {
          axios
            .get(
              "https://www.googleapis.com/books/v1/volumes?q=" +
                this.getters.getBackupSearchKey +
                searchKey
            )
            .then((response) => {
              context.commit("setBookSearch", response.data);
            });
        }
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
        context.dispatch("setBackupSearchKey", searchKey + "&orderBy=");
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
      var randomString = Math.random().toString(36).substr(2, 1);
      var searchKey = "";
      if (this.getters.getFilterType != undefined && this.getters.getFilterType != null) {
        searchKey = randomString + "&orderBy=" + sortingType + "&filter=" + this.getters.getFilterType;
        context.dispatch("setBackupSearchKey", randomString + "&orderBy=" + "|" + "&filter=");
      } 
      else {
        searchKey = randomString + "&orderBy=" + sortingType;
        context.dispatch("setBackupSearchKey", randomString + "&orderBy=");
      }
      context.dispatch("searchBookList", searchKey);
      context.dispatch("setBookListBackup");
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
