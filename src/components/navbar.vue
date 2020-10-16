<template>
  <div>
    <v-app-bar color="#373737" dense dark>
      <v-btn @click="goHomePage" depressed color="#373737">
        <v-toolbar-title>Book Shelf</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>

      <v-btn
        v-show="this.$route.path !== '/favorite'"
        @click="goFavPage"
        depressed
        color="#373737"
      >
        <v-icon color="red">mdi-heart</v-icon>
        <span>favorite</span>
      </v-btn>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  mounted() {
    console.log("PATH : " + this.$route.path);
  },
  methods: {
    goFavPage() {
      this.$router.push({ name: "favorite" });
    },
    goHomePage() {
      if (this.$route.path !== "/") {
          this.$router.push({ name: "home" });
      }
    },
  },
};
</script>
