<template>
  <v-list 
    v-if="hasBookItem" 
    three-line
    style="width:100%;" 
  >
    <div v-for="item in items.items" :key="getkey(item)">
      <book-item v-if="hasKey(item.id)" :item="item"></book-item>
    </div>
  </v-list>
</template>

<script>
import BookItem from "./BookItem";
export default {
  components: {
    'book-item': BookItem
  },
  props: {
    sortingWord: {
      type: String
    },
    filterType: {
      type: String
    }
  },
  data() {
    return {
      keys: {},
    };
  },
  computed: {
    items() {
      return this.$store.getters["book/getBookData"];
    },
    hasBookItem() {
      return this.items !== null;
    },
  },
  methods: {
    hasKey(key) {
      if (this.keys[key] == false) {
        return false;
      }
      return true;
    },
    getkey(item) {
      if (this.keys[item.id] !== null && this.keys[item.id] !== undefined) {
        this.keys[item.id] = false;
      } else {
        this.keys[item.id] = true;
      }
      return item.id+item.etag;
    },
  },
  watch: {
    sortingWord() {
      this.$store.dispatch("book/setFilterType",this.filterType);
      this.$store.dispatch("book/setSortType",this.sortingWord);
      this.$store.dispatch("book/searchSortedBookList");
    },
    filterType() {
      this.$store.dispatch("book/setFilterType",this.filterType);
      this.$store.dispatch("book/setSortType",this.sortingWord);
      this.$store.dispatch("book/searchSortedBookList");
    },
    items() {
      this.keys = {};
    },
  },
};
</script>
