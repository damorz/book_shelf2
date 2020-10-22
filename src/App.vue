<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main class="back-background">
      <router-view></router-view>
    </v-main>
    <footer-bar></footer-bar>
  </v-app>
</template>

<script>
export default {
  name: "App"
};
</script>