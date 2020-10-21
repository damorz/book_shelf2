<template>
  <v-list three-line>
    <div v-if="hasBookItem">
      <div v-for="item in items" :key="item.id">
          <h1>{{item.id}}</h1>
        <bookItem v-if="item.id" v-bind:item="item"></bookItem>
      </div>
    </div>
  </v-list>
</template>

<script>
export default {
    data() {
        return {
            data: null
        }
    },
  mounted() {
      this.$store.dispatch("searchfavoriteBookData",this.itemsId);
  },
  methods: {
    hasKey(key) {
      if (this.keys[key] == false) {
        return false;
      }
      return true;
    },
    getkey(key) {
      if (this.keys[key] != null) {
        this.keys[key] = false;
      } else {
        this.keys[key] = true;
      }
      return key;
    },
  },
  computed: {
    itemsId() {
        var favoriteBook = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;
        var count = 0;
        while ( i-- ) {
            if(keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
                favoriteBook[count++] = localStorage.getItem( keys[i] );
            }
        }
      return favoriteBook;
    },
    items() {
        return this.$store.getters.getFavoriteBookData;
    },
    hasBookItem() {
      return this.items != "undefinded";
    },
  },
};
</script>
