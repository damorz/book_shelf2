<template>
  <div>
    <v-app-bar color="#373737" dark>
      <v-btn @click="goHomePage" depressed color="#373737">
        <v-toolbar-title>Book Shelf</v-toolbar-title>
      </v-btn>
      <v-spacer>
        <v-form>
          <v-container fill-height fluid>
            <v-row align="center" justify="center">
              <v-col cols="12" sm="7">
                <v-text-field
                  v-debounce:400ms="searchBySearchBar"
                  v-model="searchBar"
                  hide-details
                  dense
                  class="ma-2"
                  label="Search book"
                  solo-inverted
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-spacer>

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
  data() {
    return {
      searchBar: "",
    };
  },
  mounted() {
    if (localStorage.getItem("favoriteBookCount") == null) {
      localStorage.setItem("favoriteBookCount", 0);
    }
  },
  methods: {
    searchBySearchBar() {
      if (this.searchBar != "") {
        this.$store.dispatch("book/searchBookListBySearchBar", this.searchBar);
      } else {
        this.$store.dispatch("book/restoreBookData");
      }
    },
    goFavPage() {
      this.$router.push({ name: "favorite" });
    },
    goHomePage() {
      if (this.$route.path !== "/") {
        this.$router.push({ name: "home" });
      } else {
        this.$router.go({ name: "home" });
      }
    },
  },
  watch: {
    searchBar() {
      this.$store.dispatch("book/setSearchKey", this.searchBar);
    },
  },
};
</script>
