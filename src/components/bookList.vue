<template>
  <v-list three-line>
    <bookItem v-bind:items="items"></bookItem>
  </v-list>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("randomSearchBook");
  },
  computed: {
    items() {
      return this.$store.getters.getBookData;
    },
  },
};
</script>
