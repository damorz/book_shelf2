<template>
  <div v-if="hasBookItem">
    <div v-for="item in items.items" :key="item.id">
      <v-list-item v-if="item.id" class="book-item">
        
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
          v-else-if="item.volumeInfo.imageLinks.smallThumbnail !=null"
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
  methods: {
    goToBookInfo(bookId) {
      this.$store.dispatch("searchBookList", bookId);
      this.$store.dispatch("searchBook", bookId);
      this.$router.push({ name: "book", params: { bookId: bookId } });
    },
  },
  computed: {
    hasBookItem() {
      return this.items != null;
    },
  },
};
</script>
