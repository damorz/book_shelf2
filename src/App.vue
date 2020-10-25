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
import Footer from './components/Footer';
import Navbar from './components/Navbar';
export default {
  name: "App",
  components: {
    'footer-bar': Footer,
    'nav-bar': Navbar
  }
};
</script>