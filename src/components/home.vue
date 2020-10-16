<template>
  <v-container
      class="fill-height"
      fluid
  >
  <v-list v-if="items != null" three-line>
      <template v-for="item in items.items">
          <v-list-item
              v-if="item.id"
              :key="item.id"
              class="book-item"
          >
            <v-img
                max-height="100%"
                max-width="10%"
                :src="item.volumeInfo.imageLinks.smallThumbnail">
            </v-img>
            <v-list-item-content class="book-list-content">
              <h3>{{item.volumeInfo.title}}</h3>
              <v-list-item-subtitle>
                  {{item.volumeInfo.description}}
              </v-list-item-subtitle>
              <v-row>
                  <v-col
                      cols="12"
                      sm="6"
                  >
                    <v-btn
                        @click="goBookInfo(item.id)"
                        class="ma-2"
                        depressed
                        color="primary"
                    >
                        Read more
                    </v-btn>
                  </v-col>
              </v-row>
            </v-list-item-content>
          </v-list-item>
      </template>
  </v-list>
  </v-container>
</template>

<script>
export default {
  data(){
    return {
        count: this.$store.state.count
    }
  },
  beforeMount(){
    var randomKey = [];
    var randomIndex = Math.floor(Math.random() * 4);
    randomKey.push(Math.random().toString(30).substr(2,2));
    randomKey.push(Math.random().toString(36).substr(2,1));
    randomKey.push(Math.random().toString(20).substr(2,2));
    randomKey.push(Math.random().toString(15).substr(2,1));

    this.$store.dispatch('searchBookList',randomKey[randomIndex]);
  },
  mounted() {
    console.log('component mounted.');
  },
  methods: {
    setbooksearch() {
          console.log(this.$store.getters.getBookData);
    },
    goBookInfo(bookId) {
        this.$store.dispatch('searchBookList',bookId);
        this.$store.dispatch('searchBook',bookId);
        this.$router.push({ name: 'book', params: { bookId: bookId }});

    }
  },
  computed: {
    items() {
        return this.$store.getters.getBookData;
    }
  }
}
</script>
