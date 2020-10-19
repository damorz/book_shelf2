<template>
  <v-container v-if="hasBookInfo" class="fill-height" fluid>
    <v-row class="book-info-container">
      <v-col cols="3">
        <v-img
          v-if="hasThumbnail"
          max-height="100%"
          max-width="80%"
          class="ml-auto mr-auto"
          :src="bookItem.volumeInfo.imageLinks.thumbnail"
        >
        </v-img>
        <v-img
          v-else
          max-height="100%"
          max-width="80%"
          class="ml-auto mr-auto"
          :src="bookItem.volumeInfo.imageLinks.smallThumbnail"
        >
        </v-img>
      </v-col>
      <v-col cols="5">
        <h1>{{ bookItem.volumeInfo.title }}</h1>
        <span v-if="hasAuthor">
          by
          <span v-for="author in bookItem.volumeInfo.authors" :key="author">
            {{ author }} <span v-if="haveMoreThanOneAuthor">,</span>
          </span>
        </span>
        <hr />
        <div v-if="isForSale" class="price-block">
          <h2 class="text-free" v-if="isFree" style="padding: 7% 0">
            FREE !
          </h2>
          <h1 class="text-price" v-else style="padding: 7% 0">
            {{ bookItem.saleInfo.listPrice.amount }} &nbsp;
            {{ bookItem.saleInfo.listPrice.currencyCode }}
          </h1>
        </div>
        <div v-else class="price-block">
            <h2 class="text-error" style="padding: 7% 0">
            Not avaliable for sale!
          </h2>
        </div>
        <v-btn dark depressed color="blue">
          Buy this book
        </v-btn>
        <v-btn
          id="favoriteBtn"
          class="btn-row-stack"
          icon
          @click="favoriteClick"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        Add to favorite
      </v-col>
      <v-col cols="4">
        fill details
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  mounted() {
    this.$store.dispatch("searchBook", this.$route.params.bookId);
  },
  methods: {
    favoriteClick() {
      if (this.isFavorite) {
        //delete from localstorage
      } else {
        //add to localstorage
      }
    },
  },
  computed: {
    hasBookInfo() {
      return this.$store.getters.getBookInfo != null;
    },
    bookItem() {
      return this.$store.getters.getBookInfo;
    },
    haveMoreThanOneAuthor() {
      return this.bookItem.volumeInfo.authors.length > 1;
    },
    hasAuthor() {
      return this.bookItem.volumeInfo.authors != null;
    },
    authorCount() {
      return this.bookItem.volumeInfo.authors.length;
    },
    hasThumbnail() {
      return this.bookItem.volumeInfo.imageLinks.thumbnail != null;
    },
    isForSale() {
      return this.bookItem.saleInfo.saleability == "FOR_SALE";
    },
    isFree() {
      return this.bookItem.saleInfo.listPrice.amount == 0;
    },
    isFavorite() {
      return true;
    },
  },
};
</script>
