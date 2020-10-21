<template>
  <v-list three-line>
    <div v-if="hasBookItem">
      <div v-for="item in items" :key="item.id">
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
  },
  computed: {
    items() {
        var favoriteBook = [];
        var keys = Object.keys(localStorage);
        var i = keys.length;
        var count = 0;
        while ( i-- ) {
            if(keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
                favoriteBook[count++] = JSON.parse(localStorage.getItem( keys[i] ));
            }
        }
      return favoriteBook;
    },
    hasBookItem() {
      return this.items != "undefinded";
    },
  },
};
</script>
