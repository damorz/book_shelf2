/* eslint-disable no-undef */
import axios from "axios";
const BASE_BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes";

export default {
  namespaced: true,
  state: {
    isFavorited: true,
    suggestBookData: {
      items: [],
      kind: "",
      totalItems: 0
    },
    bookData: {
      items: [],
      kind: "",
      totalItems: 0
    },
    bookDataBackup: {
      items: [],
      kind: "",
      totalItems: 0
    },
    bookInfo: {
      accessInfo: {},
      etag: "",
      id: "",
      kind: "",
      saleInfo: {},
      selfLink: "",
      volumeInfo: {}
    },
    favoritedBookData: [],
    bookId: "",
    searchKey: "",
    backupSearchKey: "",
    filterType: "",
    sortType: ""
  },
  mutations: {
    SET_SUGGEST_BOOK_DATA(state, data) {
      state.suggestBookData = data;
    },
    SET_IS_FAVORITED_BOOK(state, isFav) {
      state.isFavorited = isFav;
    },
    SET_FAVORITED_BOOK_DATA(state, data) {
      state.favoritedBookData = data;
    },
    SET_SORT_TYPE(state, word) {
      state.sortType = word;
    },
    SET_FILTER_TYPE(state, word) {
      state.filterType = word;
    },
    SET_BACKUP_SEARCH_KEY(state, key) {
      state.backupSearchKey = key;
    },
    SET_BOOK_SEARCH(state, data) {
      state.bookData = data;
    },
    SET_BOOK_ID(state, id) {
      state.bookId = id;
    },
    SET_BOOK_INFO(state, info) {
      state.bookInfo = info;
    },
    SET_SEARCH_KEY(state, key) {
      state.searchKey = key;
    },
    SET_BOOK_LIST_BACKUP(state, data) {
      state.bookDataBackup = data;
    },
  },
  getters: {
    isFavorited: (state) => state.isFavorited,
    hasFilterType: (getters) => getters.getFilterType !== undefined && getters.getFilterType !== null,
    hasSortType: (getters) => getters.getSortType !== undefined && getters.getSortType !== null,
    getSuggestBookData: (state) => state.suggestBookData,
    getFavoritedBookData: (state) => state.favoritedBookData,
    getSortType: (state) => state.sortType,
    getFilterType: (state) => state.filterType,
    getBackupSearchKey: (state) => state.backupSearchKey,
    getBookData: (state) => state.bookData,
    getBookID: (state) => state.bookId,
    getBookInfo: (state) => state.bookInfo,
    getSearchKey: (state) => state.searchKey,
    getBookListBackup: (state) => state.bookDataBackup,
  },
  actions: {
    async setSuggestBookData(context, bookTitle) {
      let favBook = context.getters.getFavoritedBookData;
      let randomNumber = 0;
      let words = [];
      const hasFavbook = (favBook !== null && favBook !== undefined && favBook.length !== 0);
      const hasTitle = (bookTitle !== null);

      if(hasTitle) {
        words = bookTitle.split(" ");
      }
      else if(hasFavbook) {
        let randomIndex = Math.floor(Math.random() * (favBook.length));
        words = favBook[randomIndex].volumeInfo.title.split(" ");
      }
      else {
        let randomString = Math.random().toString(36).substr(2, 1);
        words = randomString.split(" ");
      }

      randomNumber = Math.floor(Math.random() * (words.length));
      const params = {q: words[randomNumber]};

      try {
        const response = await axios.get(BASE_BOOK_API_URL, {params});
        context.commit("SET_SUGGEST_BOOK_DATA", response.data);
      } catch (error) {
        console.log(error);
        console.error //Suggest ! ?
      }
    },
    isFavoritedCheck(context, id) {
      let isFav = false;
      if(JSON.parse(localStorage.getItem(id)) !== null) {
        isFav = true;
      }
      else {
        isFav = false;
      }
      context.commit("SET_IS_FAVORITED_BOOK", isFav);
    },
    loadFavoritedBook(context) {
      let favoriteBook = [];
      let keys = Object.keys(localStorage);
      let i = keys.length;
      let count = 0;
      while(i !== 0) {
        i-=1;
        if(keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
          favoriteBook[count] = JSON.parse(localStorage.getItem(keys[i]));
          count += 1;
        }
      }
      context.commit("SET_FAVORITED_BOOK_DATA", favoriteBook);
    },
    onClickFavorite(context, Bookdata) {
      let favBook = JSON.parse(localStorage.getItem(Bookdata.id));
      let favCount = parseInt(localStorage.getItem("favoriteBookCount"));
      if(favCount === null || favCount === undefined) {
        favCount = 0;
      }
      if(favBook !== null) { //Already fav and remove
        localStorage.removeItem(Bookdata.id);
        localStorage.setItem("favoriteBookCount",favCount - 1 );
        favCount -= 1;
      }
      else { //New Fav
        localStorage.setItem(Bookdata.id,JSON.stringify(Bookdata));
        localStorage.setItem("favoriteBookCount",favCount + 1 );
        favCount += 1;
        favBook = JSON.parse(localStorage.getItem(Bookdata.id));
      }
      context.dispatch("loadFavoritedBook");
    },
    setSortType(context, sort) {
      context.commit("SET_SORT_TYPE", sort);
    },
    setFilterType(context, filter) {
      context.commit("SET_FILTER_TYPE", filter);
    },
    setBackupSearchKey(context, backupSearchKey) {
      context.commit("SET_BACKUP_SEARCH_KEY", backupSearchKey);
    },
    async searchSortedBookList(context) {
      if(context.getters.getBackupSearchKey === "") {
        context.dispatch("randomSearchBook"); 
        return;
      } 
      let params = {
        q: context.getters.getBackupSearchKey,
        orderBy: context.getters.getSortType
      }
      if (context.getters.hasFilterType) {
        params = {
          q: context.getters.getBackupSearchKey,
          orderBy: context.getters.getSortType,
          filter: context.getters.getFilterType
        }
      } 
      try {
        const response = await axios.get(BASE_BOOK_API_URL, {params});
        context.commit("SET_BOOK_SEARCH", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async searchBookList(context, searchKey) {
      let params = {
        q: searchKey,
        orderBy: context.getters.getSortType
      }
      if (context.getters.hasFilterType) {
        params = {
          q: searchKey,
          orderBy: context.getters.getSortType,
          filter: context.getters.getFilterType
        }
      } 
      try {
        const response = await axios.get(BASE_BOOK_API_URL, {params});
        context.commit("SET_BOOK_SEARCH", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    searchBookListBySearchBar(context, searchKey) {
      if (searchKey === context.getters.getSearchKey) {
        context.dispatch("searchBookList", searchKey);
        context.dispatch("setBackupSearchKey", searchKey);
      }
    },
    async searchBook(context, id) {
      try {
        const response = await axios.get(`${BASE_BOOK_API_URL}/${id}`);
        context.commit("SET_BOOK_INFO", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    setBookId(context, id) {
      context.commit("SET_BOOK_ID", id);
    },
    async randomSearchBook(context) {
      let randomString = Math.random().toString(36).substr(2, 1);
      await context.dispatch("searchBookList", randomString);
      context.dispatch("setBackupSearchKey", randomString);
      context.dispatch("setBookListBackup");
    },
    setSearchKey(context, key) {
      context.commit("SET_SEARCH_KEY", key);
    },
    setBookListBackup(context) {
      context.commit("SET_BOOK_LIST_BACKUP", context.state.bookData);
    },
    restoreBookData(context) {
      context.commit("SET_BOOK_SEARCH", context.state.bookDataBackup);
    },
  },
};