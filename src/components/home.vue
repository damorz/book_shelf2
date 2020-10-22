<template>
  <v-container fluid>
    <v-row class="mr-auto filter-bar">
      <v-col class="py-2" cols="3">
        <h3>Sort by:</h3>
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
      <v-col class="py-2" cols="9">
        <h3>Filter by:</h3>
        <v-btn-toggle tile v-model="filterType" color="red accent-3"
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
    <bookList v-bind:sortingWord="sortingType" v-bind:filterType="filterType"></bookList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sortingType: "",
      filterType: null
    };
  },
  name: "home",
};
</script>
