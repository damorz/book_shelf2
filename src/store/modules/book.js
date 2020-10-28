/* eslint-disable no-undef */
import axios from "axios";
// const BASE_BOOK_API_URL = "https://www.googleapis.com/books/v1/volumes";
// use params to get api
export default {
  namespaced: true,
  state: {
    suggestBookData: null,
    bookData: null,
    bookInfo: null,
    bookId: null,
    searchKey: "",
    backupSearchKey: "",
    bookDataBackup: null,
    filterType: null,
    sortType: null,
    favoritedBookData: null,
    isFavorited: true
    //Set empty state in defaut Obj !!!!!??????
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
    hasFilterType: (state, getters) => getters.getFilterType !== undefined && getters.getFilterType !== null,
    hasSortType: (state, getters) => getters.getSortType !== undefined && getters.getSortType !== null,
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
      let url = "https://www.googleapis.com/books/v1/volumes?q=";
      let favBook = context.getters.getFavoritedBookData;
      let randomNumber = 0;
      let words = [];
      const hasFavbook = favBook !== null && favBook !== undefined && favBook.length !== 0;
      const hasTitle = bookTitle !== null;


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
      try {
        const response = await axios.get(`${url}${words[randomNumber]}`);
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
        return; // quick end process ??!  // return context.dispatch("randomSearchBook"); // quick end process ??!
      } 
      let url = `https://www.googleapis.com/books/v1/volumes?q=${context.getters.getBackupSearchKey}&orderBy=${context.getters.getSortType}`;
      if (context.getters.hasFilterType) {
        url = `${url}&filter=${context.getters.getFilterType}`; 
      } 
      try {
        const response = await axios.get(url);
        context.commit("SET_BOOK_SEARCH", response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async searchBookList(context, searchKey) {
      let url = "https://www.googleapis.com/books/v1/volumes?q=";
      try {
          const response = await axios.get(`${url}${searchKey}`);
          context.commit("SET_BOOK_SEARCH", response.data);
      } catch (error) {
          console.log(error);
      }
    },
    searchBookListBySearchBar(context, searchKey) {
      let fullSearchKey = "";
      if (searchKey === context.getters.getSearchKey) {
        if (context.getters.getFilterType !== undefined && context.getters.getFilterType !== null) {
          fullSearchKey = `${searchKey}&orderBy=${context.getters.getSortType}&filter=${context.getters.getFilterType}`;
        } 
        else {
          fullSearchKey = `${searchKey}&orderBy=${context.getters.getSortType}`;
        }
        context.dispatch("searchBookList", fullSearchKey);
        context.dispatch("setBackupSearchKey", searchKey);
      }
    },
    async searchBook(context, id) {
        const url = "https://www.googleapis.com/books/v1/volumes/";
        try {
            const response = await axios.get(url + id);
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
      let fullSearchKey = "";
      if (context.getters.getFilterType !== undefined && context.getters.getFilterType !== null) {
        fullSearchKey = `${randomString}&orderBy=${context.getters.getSortType}&filter=${context.getters.getFilterType}`;
      } 
      else {
        fullSearchKey = `${randomString}&orderBy=${context.getters.getSortType}`;
      }
      await context.dispatch("searchBookList", fullSearchKey);
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