<template>
  <v-container class="fill-height" fluid>
    <v-row class="mr-auto filter-bar">
      <v-col class="py-2" cols="4">
        <h3>Sort by:</h3>
        <v-btn-toggle v-model="sortingType" tile mandatory color="blue accent-3">
          <v-btn value="relevance">
            <h4>Relevance</h4>
          </v-btn>
          <v-btn value="newest" depressed>
            <h4>Newest</h4>
          </v-btn>
          
        </v-btn-toggle>
      </v-col>
    </v-row>
    <bookList v-bind:sortingWord="sortingType"></bookList>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      sortingType: "",
    };
  },
  name: "home",
};
</script>
