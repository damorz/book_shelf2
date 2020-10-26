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
  }
};
</script>
