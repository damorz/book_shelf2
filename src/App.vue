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
import Navbar from "./components/navbar";
import Footer from "./components/footer";
export default {
  name: "App",
  components: {
    'nav-bar': Navbar,
    'footer-bar': Footer
  }
};
</script>