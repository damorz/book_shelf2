<template>
    <h1>FAVORITE</h1>
</template>
<script>
export default {
    mounted() {
        var archive = {}, // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;

        while ( i-- ) {
            if(keys[i] != "favoriteBookCount" && keys[i] != "loglevel:webpack-dev-server") {
                archive[ keys[i] ] = localStorage.getItem( keys[i] );
            }
        }
        console.log( archive);
    }
}
</script>