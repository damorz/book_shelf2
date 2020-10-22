<template>
  <v-list v-if="hasBookItem" style="width:100%;" three-line>
      <div v-for="item in items.items" :key="getkey(item.id)">
        <bookItem v-if="hasKey(item.id)" v-bind:item="item"></bookItem>
      </div>
  </v-list>
</template>

<script>
export default {
  props: ["sortingWord"],
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
    getkey(key) {
      if (this.keys[key] != null) {
        this.keys[key] = false;
      } else {
        this.keys[key] = true;
      }
      return key;
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
      this.$store.dispatch("searchSortedBookList", this.sortingWord);
    },
    items() {
      this.keys = {};
    },
  },
};
</script>
