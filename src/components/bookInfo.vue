<template>
  <v-container v-if="hasBookInfo" class="fill-height" fluid>
    <v-row class="book-info-container" no-gutters>
      <!-- Image Section -->
      <v-col cols="4">
        <v-img
          v-if="hasNoImage"
          max-height="100%"
          max-width="100%"
          src="https://i.redd.it/s8lk86v3r2m11.png"
        >
        </v-img>
        <v-img
          v-else-if="hasThumbnail"
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

      <!-- Title Section -->
      <v-col cols="8">
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
          <h1 class="text-price" v-else-if="!hasDiscount" style="padding: 7% 0">
            {{ bookItem.saleInfo.listPrice.amount }} &nbsp;
            {{ bookItem.saleInfo.listPrice.currencyCode }}
          </h1>
          <h1
            class="text-gray line-through-text"
            v-if="hasDiscount"
            style="padding: 7% 0 0 0"
          >
            {{ bookItem.saleInfo.listPrice.amount }} &nbsp;
            {{ bookItem.saleInfo.listPrice.currencyCode }}
          </h1>
          <h1 class="text-error" style="padding: 0 0 7% 0" v-if="hasDiscount">
            {{ bookItem.saleInfo.retailPrice.amount }}&nbsp;
            {{ bookItem.saleInfo.retailPrice.currencyCode }}
          </h1>
        </div>
        <div v-else class="price-block">
          <h2 class="text-error" style="padding: 7% 0">
            Not avaliable for sale!
          </h2>
        </div>
        <v-btn
          id="buyBtn"
          v-if="isForSale"
          dark
          depressed
          color="blue"
          @click="goToBuyPage"
        >
          Buy this book
        </v-btn>

        <v-btn v-bind:color="isFavorite ? 'red' : 'gray'" class="btn-row-stack" icon @click="favoriteClick">
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        Add to favorite
      </v-col>
    </v-row>

    <!-- Detail Section -->
    <v-row style="margin:1% 0" class="book-info-container">
      <v-col cols="11" class="ml-auto mr-auto">
        <!-- Description -->
        <h3 class="description-title">Description :</h3>
        <span
          v-if="hasBookInfo"
          v-html="bookItem.volumeInfo.description"
        ></span>
        <span v-if="!hasDescription">-</span>

        <!-- Authors -->
        <h3 class="description-title">Author :</h3>
        <span v-for="author in bookItem.volumeInfo.authors" :key="author">
          {{ author }} <span v-if="haveMoreThanOneAuthor">,</span>
        </span>
        <span v-if="!hasAuthor">-</span>

        <!-- Page -->
        <h3 class="description-title">Pages :</h3>
        <span>{{ bookItem.volumeInfo.pageCount }} pages</span>

        <!-- Publisher -->
        <h3 class="description-title">Publisher :</h3>
        <span>{{ bookItem.volumeInfo.publisher }}</span>
        <span v-if="!hasPublisher">-</span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      favCount: null,
      favBook: null,
    };
  },
  mounted() {
    this.$store.dispatch("searchBook", this.$route.params.bookId);
    this.favBook = localStorage.getItem(this.$route.params.bookId);
    this.favCount = parseInt(localStorage.getItem("favoriteBookCount"));
    if (isNaN(this.favCount)) {
        this.favCount = 0;
        localStorage.setItem("favoriteBookCount",0);
      }
  },
  methods: {
    goToBuyPage() {
      window.open(this.bookItem.volumeInfo.infoLink);
    },
    favoriteClick() {
      this.favBook = JSON.parse(localStorage.getItem(this.bookItem.id));

      //Already fav and remove
      if(this.favBook != null) {
        localStorage.removeItem(this.bookItem.id);
        localStorage.setItem("favoriteBookCount",this.favCount - 1 );
        this.favCount --;
        this.favBook = null;
      }

      //Fav
      else {
        localStorage.setItem(this.bookItem.id,JSON.stringify(this.bookItem));
        localStorage.setItem("favoriteBookCount",this.favCount + 1 );
        this.favCount ++;
        this.favBook = JSON.parse(localStorage.getItem(this.bookItem.id));
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
    hasNoImage() {
      return this.bookItem.volumeInfo.imageLinks == null;
    },
    hasDiscount() {
      return (
        this.bookItem.saleInfo.listPrice.amount >
        this.bookItem.saleInfo.retailPrice.amount
      );
    },
    hasDescription() {
      return this.bookItem.volumeInfo.description != null;
    },
    hasPublisher() {
      return this.bookItem.volumeInfo.publisher != null;
    },
    isFavorite() {
      return this.favBook != null;
    }
  },
};
</script>
