<template>
  <v-list v-if="hasBookItem" style="width:100%; margin-top: 4%;">
      <div v-for="item in items" :key="item.id">
        <book-item v-if="item.id" :item="item"></book-item>
      </div>
  </v-list>
</template>

<script>
import BookItem from "./BookItem";
export default {
  components: {
    BookItem
  },
  computed: {
    items() {
      this.$store.dispatch("book/loadFavoritedBook");
      return this.$store.getters["book/getFavoritedBookData"];
    },
    hasBookItem() {
      return this.items !== undefined && this.items !== null;
    },
  },
};
</script>
