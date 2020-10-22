<template>
  <v-list v-if="hasBookItem" style="width:100%;" three-line>
      <div v-for="item in items.items" :key="getkey(item)">
        <bookItem v-if="hasKey(item.id)" v-bind:item="item"></bookItem>
      </div>
  </v-list>
</template>

<script>
export default {
  props: ["sortingWord","filterType"],
  data() {
    return {
      keys: {},
    };
  },
  mounted() {
  },
  methods: {
    hasKey(key) {
      if (this.keys[key] == false) {
        return false;
      }
      return true;
    },
    getkey(item) {
      if (this.keys[item.id] != null) {
        this.keys[item.id] = false;
      } else {
        this.keys[item.id] = true;
      }
      return item.id+item.etag;
    },
  },
  computed: {
    items() {
      return this.$store.getters.getBookData;
    },
    hasBookItem() {
      return this.items != null;
    },
  },
  watch: {
    sortingWord() {
      this.$store.dispatch("setFilterType",this.filterType);
      this.$store.dispatch("setSortType",this.sortingWord);
      this.$store.dispatch("searchSortedBookList");
    },
    filterType() {
      this.$store.dispatch("setFilterType",this.filterType);
      this.$store.dispatch("setSortType",this.sortingWord);
      this.$store.dispatch("searchSortedBookList");
    },
    items() {
      this.keys = {};
    },
  },
};
</script>
