<template>
  <v-list-item v-if="showFavoriteBook" class="book-item">
    <v-img
      v-if="!hasImageData"
      max-height="100%"
      max-width="10%"
      src="https://i.redd.it/s8lk86v3r2m11.png"
    >
    </v-img>
    <v-img
      v-else-if="hasThumbnailImage"
      max-height="100%"
      max-width="10%"
      :src="item.volumeInfo.imageLinks.thumbnail"
    >
    </v-img>
    <v-img
      v-else-if="hasSmallThumbnailImage"
      max-height="100%"
      max-width="10%"
      :src="item.volumeInfo.imageLinks.smallThumbnail"
    >
    </v-img>

    <v-list-item-content class="book-list-content">
      <h3>{{ item.volumeInfo.title }}</h3>
      <v-list-item-subtitle class="ml-auto" v-html="item.volumeInfo.description"></v-list-item-subtitle>
      <v-row>
        <v-col cols="2">
          <v-btn
            @click="goToBookInfo(item.id)"
            class="ml-auto mr-auto"
            depressed
            dark
            color="black"
          >
            Read more
          </v-btn>
        </v-col>
        <v-col cols="7">
          <v-btn
            v-bind:color="isFavorite ? 'red' : 'gray'"
            @click="favoriteClick"
            icon
            class="btn-row-stack"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          Add to favorite
        </v-col>
        <v-col cols="3">
          <v-alert v-if="item.saleInfo.isEbook" type="info" dense>
            E-book
          </v-alert>
          <v-alert v-if="!item.saleInfo.isEbook" type="warning" dense>
            Book
          </v-alert>
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "bookItem",
  props: {
    item: {
      type: Object,
      required: false
    }
  },
  data() {
    return {
      isFavorite: false
    };
  },
  computed: {
    showFavoriteBook() {
      if(this.$route.path === "/favorite") {
        return this.isFavorite;
      }
      else {
        return true;
      }
    },
    hasImageData() {
      return this.item.volumeInfo.imageLinks !== null && this.item.volumeInfo.imageLinks !== undefined;
    },
    hasThumbnailImage() {
      return this.item.volumeInfo.imageLinks.thumbnail !== null && this.item.volumeInfo.imageLinks.thumbnail !== undefined;
    },
    hasSmallThumbnailImage() {
      return this.item.volumeInfo.imageLinks.smallThumbnail !== null && this.item.volumeInfo.imageLinks.smallThumbnail !== undefined;
    }
  },
  mounted() {
    let favCount = parseInt(localStorage.getItem("favoriteBookCount"));
    if (isNaN(favCount)) {
      localStorage.setItem("favoriteBookCount",0);
    }
    
    this.$store.dispatch("book/isFavoritedCheck", this.item.id);
    this.isFavorite = this.$store.getters["book/isFavorited"];
  },
  methods: {
    favoriteClick() {
      this.$store.dispatch("book/onClickFavorite", this.item);
      this.isFavorite = !this.isFavorite;
    },
    goToBookInfo(bookId) {
      // this.$store.dispatch("book/searchBookList", bookId);
      this.$store.dispatch("book/searchBook", bookId);
      this.$router.push({ name: "book", params: { bookId } });
    },
  },
};
</script>
