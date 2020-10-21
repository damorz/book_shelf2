<template>
  <div v-if="hasBookItem">
    <div v-for="item in items.items" :key="getkey(item.id)">
      <v-list-item v-if="hasKey(item.id)" class="book-item">
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
                v-if="checkFav(item.id)"
                class="btn-row-stack"
                color="red"
                icon
                @click="favoriteClick"
              >
                <v-icon>mdi-heart</v-icon>
              </v-btn>
              <v-btn v-else class="btn-row-stack" icon @click="favoriteClick">
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              Add to favorite
            </v-col>
          </v-row>
        </v-list-item-content>
      </v-list-item>
    </div>
  </div>
</template>
<script>
export default {
  name: "bookItem",
  props: ["items"],
  data() {
    return {
      keys: {},
      currentFavId: null
    };
  },
  methods: {
    checkFav(id) {
      this.currentFavId = localStorage.getItem(id);
      if(this.currentFavId != id) {
        return false;
      }
      return true;
    },
    favoriteClick() {
      this.favId = localStorage.getItem(this.bookItem.id);

      //Already fav and remove
      if(this.favId != null) {
        localStorage.removeItem(this.bookItem.id);
        localStorage.setItem("favoriteBookCount",this.favCount - 1 );
        this.favCount --;
        this.favId = null;
      }

      //Fav
      else {
        localStorage.setItem(this.bookItem.id,this.bookItem.id);
        localStorage.setItem("favoriteBookCount",this.favCount + 1 );
        this.favCount ++;
        this.favId = localStorage.getItem(this.bookItem.id);
      }
    },
    goToBookInfo(bookId) {
      this.$store.dispatch("searchBookList", bookId);
      this.$store.dispatch("searchBook", bookId);
      this.$router.push({ name: "book", params: { bookId: bookId } });
    },
    getkey(key) {
      if (this.keys[key] != null) {
        this.keys[key] = false;
      } else {
        this.keys[key] = true;
      }
      return key;
    },
    hasKey(key) {
      return this.keys[key];
    },
  },
  computed: {
    hasBookItem() {
      return this.items != null;
    },
  },
  // watch: {
  //   items(){
  //     this.keys = {};
  //   },
  // }
};
</script>
