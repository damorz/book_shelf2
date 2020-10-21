<template>
  <v-list three-line>
    <bookItem v-bind:items="items"></bookItem>
  </v-list>
</template>

<script>
export default {
  props: ["sortingWord"],
  mounted() {
    this.$store.dispatch("randomSearchBook","newest");
  },
  computed: {
    items() {
      return this.$store.getters.getBookData;
    },
  },
  watch: {
    sortingWord() {
      this.$store.dispatch("searchSortedBookList",this.sortingWord);
    }
  }
};
</script>
