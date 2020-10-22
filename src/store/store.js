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
    sortType: null
  },
  mutations: {
    setSortType(state, word) {
      state.sortType = word;
    },
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
    getSortType(state) {
      return state.sortType;
    },
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
    setSortType(context, sort) {
      context.commit("setSortType", sort);
    },
    setFilterType(context, filter) {
      context.commit("setFilterType", filter);
    },
    setBackupSearchKey(context, backupSearchKey) {
      context.commit("setBackupSearchKey", backupSearchKey);
    },
    searchSortedBookList(context) { 
      if (this.getters.getBackupSearchKey == "") {
        context.dispatch("randomSearchBook");
      } 
      else {
        if (this.getters.getFilterType != undefined && this.getters.getFilterType != null) {
          axios
            .get(
              "https://www.googleapis.com/books/v1/volumes?q=" + this.getters.getBackupSearchKey + "&orderBy=" + this.getters.getSortType + "&filter=" + this.getters.getFilterType)
            .then((response) => {
              context.commit("setBookSearch", response.data);
            });
        } 
        else {
          axios
            .get(
              "https://www.googleapis.com/books/v1/volumes?q=" + this.getters.getBackupSearchKey + "&orderBy=" + this.getters.getSortType)
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
      var fullSearchKey="";
      if (searchKey == this.getters.getSearchKey) {
        if (this.getters.getFilterType != undefined && this.getters.getFilterType != null) {
          fullSearchKey = searchKey + "&orderBy=" + this.getters.getSortType + "&filter=" + this.getters.getFilterType;
        } 
        else {
          fullSearchKey = searchKey + "&orderBy=" + this.getters.getSortType;
        }
        context.dispatch("searchBookList", fullSearchKey);
        context.dispatch("setBackupSearchKey", searchKey);
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
      var randomString = Math.random().toString(36).substr(2, 1);
      var fullSearchKey = "";
      if (this.getters.getFilterType != undefined && this.getters.getFilterType != null) {
        fullSearchKey = randomString + "&orderBy=" + this.getters.getSortType + "&filter=" + this.getters.getFilterType;
      } 
      else {
        fullSearchKey = randomString + "&orderBy=" + this.getters.getSortType;
      }
      
      context.dispatch("searchBookList", fullSearchKey);
      context.dispatch("setBackupSearchKey", randomString);
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
