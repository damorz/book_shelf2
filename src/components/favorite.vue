<template>
    <h1>FAVORITE</h1>
</template>
<script>
export default {
    data() {
        return {
            favoriteBook: ""
        }
    },
    mounted() {
        var favoriteBook = {};
        var keys = Object.keys(localStorage);
        var i = keys.length;
        while ( i-- ) {
            if(keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
                favoriteBook[ keys[i] ] = localStorage.getItem( keys[i] );
            }
        }
        this.favoriteBook = favoriteBook;
    }
}
</script>