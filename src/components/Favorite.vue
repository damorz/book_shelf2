<template>
  <v-container fluid>
    <favorite-book-list></favorite-book-list>
  </v-container>
</template>
<script>
import FavoriteBookList from "./FavoriteBookList";
export default {
  components: {
    'favorite-book-list': FavoriteBookList
  },
  data() {
    return {
      favoriteBook: "",
    };
  },
  mounted() {
    var favoriteBook = {};
    var keys = Object.keys(localStorage);
    var i = keys.length;
    while (i !== 0) {
      i-=1;
      if (keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
        favoriteBook[keys[i]] = localStorage.getItem(keys[i]);
      }
    }
    this.favoriteBook = favoriteBook;
  },
};
</script>
