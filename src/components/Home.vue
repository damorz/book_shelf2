<template>
  <v-container fluid>
    <!-- filter section -->
    <v-row class="mr-auto filter-bar">
      <v-col cols="3" class="py-2">
        <h3>Sort by: Complete?</h3>
        <v-btn-toggle
          v-model="sortingType"
          tile
          mandatory
          color="red accent-3"
        >
          <v-btn value="relevance">
            <h4>Relevance</h4>
          </v-btn>
          <v-btn value="newest" depressed>
            <h4>Newest</h4>
          </v-btn>
        </v-btn-toggle>
      </v-col>
      <v-col cols="9" class="py-2">
        <h3>Filter by:</h3>
        <v-btn-toggle 
          v-model="filterType" 
          tile 
          color="red accent-3"
        >
          <v-btn value="full">
            <h4>Full Books</h4>
          </v-btn>
          <v-btn value="ebooks">
            <h4>E-Books</h4>
          </v-btn>
          <v-btn value="free-ebooks">
            <h4>Free E-books</h4>
          </v-btn>
          <v-btn value="paid-ebooks">
            <h4>Paid E-Books</h4>
          </v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <v-row v-if="hasSuggestBook">
      <v-col cols="12">
        <v-alert
          dark
          :value="true"
          color="warning"
        >
          <h3>Suggest for you</h3>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <horizontal-book-list :items="items"></horizontal-book-list>
        <br>
        <hr>
      </v-col>
    </v-row>
    
    <!-- Book section -->
    <v-row>
      <v-col cols="12">
        <v-alert
          dark
          :value="true"
          color="info"
        >
          <h3>Other Books</h3>
        </v-alert>
      </v-col>
    </v-row>
    <book-list :sortingWord="sortingType" :filterType="filterType"></book-list>
  </v-container>
</template>

<script>
import BookList from "./BookList";
import HorizontalBookList from "./HorizontalBookList.vue";
export default {

  components: {
    BookList,
    HorizontalBookList
  },

  data() {
    return {
      sortingType: "",
      filterType: null,
    };
  },

  computed: {
    items() {
      return this.$store.getters["book/getSuggestBookData"];
    },
    hasSuggestBook() {
      if(this.items !== null && this.items !== undefined) {
        return this.items.totalItems !== 0 && this.items !== null;
      }
      return false;
    }
  },
  
  mounted() {
    this.$store.dispatch("book/setSuggestBookData", null);
  }
};
</script>
