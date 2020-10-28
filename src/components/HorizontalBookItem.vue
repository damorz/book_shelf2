<template>
  <v-hover>
    <div class="horizontal-item ml-auto mt-auto" slot-scope="{ hover }">
      <div class="img-horizontal ">
        <v-img
          v-if="!hasImageData"
          width="100%"
          src="https://i.redd.it/s8lk86v3r2m11.png"
          style="margin: auto;"
        >
        <v-expand-transition>
            <div
              v-if="hover"
              @click="goToBookInfo"
              class="pointer d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <p style="font-size:3vh;">Read more</p>
            </div>
          </v-expand-transition>
        </v-img>
        <v-img
          v-else-if="hasThumbnailImage"
          width="100%"
          :src="item.volumeInfo.imageLinks.thumbnail"
          style="margin: auto; "
        >
        <v-expand-transition>
            <div
              v-if="hover"
              @click="goToBookInfo"
              class="pointer d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <p style="font-size:3vh;">Read more</p>
            </div>
          </v-expand-transition>
        </v-img>
        <v-img
          v-else-if="hasSmallThumbnailImage"
          width="100%"
          :src="item.volumeInfo.imageLinks.smallThumbnail"
          style="margin: auto;"
        >
        <v-expand-transition>
            <div
              v-if="hover"
              @click="goToBookInfo"
              class="pointer d-flex transition-fast-in-fast-out black darken-2 v-card--reveal display-3 white--text"
              style="height: 100%;"
            >
              <p style="font-size:3vh;">Read more</p>
            </div>
          </v-expand-transition>
        </v-img>
      </div>
      <v-card-text class="pt-6" style="position: relative;">
        <h3 @click="goToBookInfo" class="orange--text mb-2 pointer">
          {{ item.volumeInfo.title }}
        </h3>
        <div
          v-if="item.saleInfo.isEbook"
          class="font-weight-light blue--text mb-2"
        >
          e-Book
        </div>
        <div
          v-if="!item.saleInfo.isEbook"      
          class="font-weight-light blue--text mb-2"
        >
          Book
        </div>
      </v-card-text>
    </div>
  </v-hover>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: false
    },
  },
  computed: {
    showFavoriteBook() {
      return (this.$route.path === "/favorite") ? this.isFavorite : true;
    },
    src() {
      return true;
    },
    hasImageData() {
      return (
        this.item.volumeInfo.imageLinks !== null &&
        this.item.volumeInfo.imageLinks !== undefined
      );
    },
    hasThumbnailImage() {
      return (
        this.item.volumeInfo.imageLinks.thumbnail !== null &&
        this.item.volumeInfo.imageLinks.thumbnail !== undefined
      );
    },
    hasSmallThumbnailImage() {
      return (
        this.item.volumeInfo.imageLinks.smallThumbnail !== null &&
        this.item.volumeInfo.imageLinks.smallThumbnail !== undefined
      );
    },
  },
  methods: {
    favoriteClick() {
      this.$store.dispatch("book/onClickFavorite", this.item);
      this.isFavorite = !this.isFavorite;
    },
    goToBookInfo() {
      // this.$store.dispatch("book/searchBookList", this.item.id);
      this.$store.dispatch("book/searchBook", this.item.id);
      this.$router.push({ name: "book", params: { bookId: this.item.id } });
      if(this.$route.path !== "/") {
        window.scrollTo({top: 0});
      }
    },
  },
};
</script>
