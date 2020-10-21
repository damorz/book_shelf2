<template>
  <v-list-item class="book-item">
    <v-img
      v-if="item.volumeInfo.imageLinks == null"
      max-height="100%"
      max-width="10%"
      src="https://i.redd.it/s8lk86v3r2m11.png"
    >
    </v-img>
    <v-img
      v-else-if="item.volumeInfo.imageLinks.thumbnail != null"
      max-height="100%"
      max-width="10%"
      :src="item.volumeInfo.imageLinks.thumbnail"
    >
    </v-img>
    <v-img
      v-else-if="item.volumeInfo.imageLinks.smallThumbnail != null"
      max-height="100%"
      max-width="10%"
      :src="item.volumeInfo.imageLinks.smallThumbnail"
    >
    </v-img>
    <v-list-item-content class="book-list-content">
      <h3>{{ item.volumeInfo.title }}</h3>
      <v-list-item-subtitle>
        {{ item.volumeInfo.description }}
      </v-list-item-subtitle>
      <v-row>
        <v-col cols="1" sm="2">
          <v-btn
            @click="goToBookInfo(item.id)"
            class="ma-2"
            depressed
            dark
            color="black"
          >
            Read more
          </v-btn>
        </v-col>
        <v-col>
          <v-btn
            class="btn-row-stack"
            v-bind:color="isFavorite ? 'red' : 'gray'"
            icon
            @click="favoriteClick"
          >
            <v-icon>mdi-heart</v-icon>
          </v-btn>
          Add to favorite
        </v-col>
      </v-row>
    </v-list-item-content>
  </v-list-item>
</template>
<script>
export default {
  name: "bookItem",
  props: ["item"],
  data() {
    return {
      favCount: 0,
      favId: ""
    };
  },
  mounted() {
    this.favId = localStorage.getItem(this.item.id);
    this.favCount = parseInt(localStorage.getItem("favoriteBookCount"));
    if (isNaN(this.favCount)) {
        this.favCount = 0;
        localStorage.setItem("favoriteBookCount",0);
      }
  },
  methods: {
    favoriteClick() {
      this.favId = localStorage.getItem(this.item.id);
      //Already fav and remove
      if(this.favId != null) {
        localStorage.removeItem(this.item.id);
        localStorage.setItem("favoriteBookCount",this.favCount - 1 );
        this.favCount --;
        this.favId = null;
      }
      //Fav
      else {
        localStorage.setItem(this.item.id,this.item.id);
        localStorage.setItem("favoriteBookCount",this.favCount + 1 );
        this.favCount ++;
        this.favId = localStorage.getItem(this.item.id);
      }
    },
    goToBookInfo(bookId) {
      this.$store.dispatch("searchBookList", bookId);
      this.$store.dispatch("searchBook", bookId);
      this.$router.push({ name: "book", params: { bookId: bookId } });
    },
    // checkFav(id) {
    //   if (localStorage.getItem(id) != id) {
    //     return false;
    //   }
    //   return true;
    // },
  },
  computed: {
    isFavorite() {
      return this.favId != null;
    }
  },
};
</script>
