<template>
  <v-container 
    v-if="hasBookInfo" 
    fluid
    class="fill-height" 
  >
    <v-row no-gutters class="book-info-container" style="margin-top: 4%;">
      <!-- Image Section -->
      <v-col cols="4" align="center">
        <v-img
          v-if="hasImageData"
          max-height="100%"
          max-width="80%"
          :src="imageLink"
        >
        </v-img>
        <v-img
          v-else
          max-height="100%"
          max-width="10%"
          src="https://i.redd.it/s8lk86v3r2m11.png"
        >
      </v-col>

      <!-- Title Section -->
      <v-col cols="8">
        <h1>{{ bookItem.volumeInfo.title }}</h1>
        <span v-if="hasAuthor">
          by
          <span v-for="author in bookItem.volumeInfo.authors" :key="author">
            {{ author }} 
            <span v-if="haveMoreThanOneAuthor">,</span>
          </span>
        </span>
        <hr />
        <div v-if="isForSale" class="price-block">
          <h2 
            v-if="isFree" 
            class="text-free" 
            style="padding: 7% 0"
          >
            FREE !
          </h2>
          <h1 
            v-else-if="!hasDiscount" 
            class="text-price" 
            style="padding: 7% 0"
          >
            {{ bookItem.saleInfo.listPrice.amount }} &nbsp; {{ bookItem.saleInfo.listPrice.currencyCode }}
          </h1>
          <h1
            class="text-gray line-through-text"
            v-if="hasDiscount"
            style="padding: 7% 0 0 0"
          >
            {{ bookItem.saleInfo.listPrice.amount }} &nbsp; {{ bookItem.saleInfo.listPrice.currencyCode }}
          </h1>
          <h1 
            v-if="hasDiscount"
            class="text-error" 
            style="padding: 0 0 7% 0"
          >
            {{ bookItem.saleInfo.retailPrice.amount }}&nbsp; {{ bookItem.saleInfo.retailPrice.currencyCode }}
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
          @click="goToBuyPage"
          dark
          depressed
          color="blue"
        >
          Buy this book
        </v-btn>

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
    </v-row>

    <!-- Detail Section -->
    <v-row style="margin:1% 0" class="book-info-container">
      <v-col cols="11" class="ml-auto mr-auto">
        
        <!-- Description -->
        <h3 class="description-title">Description :</h3>
        <span v-if="hasBookInfo" v-html="bookItem.volumeInfo.description"></span>
        <span v-if="!hasDescription">-</span>

        <!-- Authors -->
        <h3 class="description-title">Author :</h3>
        <span v-for="author in bookItem.volumeInfo.authors" :key="author">
          {{ author }} 
          <span v-if="haveMoreThanOneAuthor">,</span>
        </span>
        <span v-if="!hasAuthor">-</span>

        <!-- Page -->
        <h3 class="description-title">Pages :</h3>
        <span>{{ bookItem.volumeInfo.pageCount }} pages</span>

        <!-- Publisher -->
        <h3 class="description-title">Publisher :</h3>
        <span>{{ bookItem.volumeInfo.publisher }}</span>
        <span v-if="!hasPublisher">-</span>

        <!-- Book?EBook? -->
        <h3 class="description-title">Book Type :</h3>
        <span v-if="bookItem.saleInfo.isEbook">E-book</span>
        <span v-if="!bookItem.saleInfo.isEbook">Book</span>

      </v-col>
    </v-row>
    
    <!-- suggest book -->
    <v-row>
      <v-col cols="12">
        <v-alert
          dark
          :value="true"
          color="warning"
        >
          <h3>Suggest for you</h3>
        </v-alert>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <horizontal-book-list :items="items"></horizontal-book-list>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>
import HorizontalBookList from "./HorizontalBookList";
export default {
  props: {
    bookId: {
      type: String,
      required: true
    }
  },
  components: {
    HorizontalBookList
  },
  data() {
    return {
      isFavorite: false
    };
  },
  computed: {
    imageLink() {
      if(this.hasThumbnailImage) {
        return this.bookItem.volumeInfo.imageLinks.thumbnail;
      }
      else if(this.hasSmallThumbnailImage) {
        return this.bookItem.volumeInfo.imageLinks.smallThumbnail;
      }
      return "https://i.redd.it/s8lk86v3r2m11.png";
    },
    items() {
      return this.$store.getters["book/getSuggestBookData"];
    },
    hasBookInfo() {
      return this.$store.getters["book/getBookInfo"] != null;
    },
    bookItem() {
      return this.$store.getters["book/getBookInfo"];
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
    isForSale() {
      return this.bookItem.saleInfo.saleability == "FOR_SALE";
    },
    isFree() {
      return this.bookItem.saleInfo.listPrice.amount == 0;
    },
    hasImageData() {
      return (
        this.bookItem.volumeInfo.imageLinks !== null &&
        this.bookItem.volumeInfo.imageLinks !== undefined
      );
    },
    hasThumbnailImage() {
      return (
        this.bookItem.volumeInfo.imageLinks.thumbnail !== null &&
        this.bookItem.volumeInfo.imageLinks.thumbnail !== undefined
      );
    },
    hasSmallThumbnailImage() {
      return (
        this.bookItem.volumeInfo.imageLinks.smallThumbnail !== null &&
        this.bookItem.volumeInfo.imageLinks.smallThumbnail !== undefined
      );
    },
    hasDiscount() {
      return (this.bookItem.saleInfo.listPrice.amount > this.bookItem.saleInfo.retailPrice.amount);
    },
    hasDescription() {
      return this.bookItem.volumeInfo.description != null;
    },
    hasPublisher() {
      return this.bookItem.volumeInfo.publisher != null;
    },
  },
  mounted() {
    this.$store.dispatch("book/searchBook", this.bookId);
    this.$store.dispatch("book/isFavoritedCheck", this.bookId);
    this.isFavorite = this.$store.getters["book/isFavorited"];

    let favCount = parseInt(localStorage.getItem("favoriteBookCount"));
    if (isNaN(favCount)) {
      localStorage.setItem("favoriteBookCount",0);
    } 
  },
  methods: {
    goToBuyPage() {
      window.open(this.bookItem.volumeInfo.infoLink);
    },
    favoriteClick() {
      this.$store.dispatch("book/onClickFavorite", this.bookItem);
      this.isFavorite = !this.isFavorite;
    },
  },
  watch: {
    bookItem() {
      this.$store.dispatch("book/setSuggestBookData", this.bookItem.volumeInfo.title);
    }
  }
};
</script>
