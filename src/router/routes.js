/* eslint-disable no-undef */
import Home from '../components/Home.vue';
import Favorite from '../components/Home.vue';
import BookInfo from '../components/Home.vue';

let routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/book/:bookId",
    name: "Book",
    component: BookInfo,
    props: true 
  },
  {
    path: "*",
    component: Home
  },
];
export default routes;
