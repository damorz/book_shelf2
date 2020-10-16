<template>
  <v-container class="fill-height" fluid>
    <v-row class="text-center">
      <v-col cols="4">
        <h1 v-if="hasBookInfo">{{ bookData.id }}</h1>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    console.log("component mounted.");
  },
  computed: {
    hasBookInfo() {
      return this.$store.getters.getBookInfo != null;
    },
    bookData() {
      return this.$store.getters.getBookInfo;
    },
  },
};
</script>
