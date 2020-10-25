/* eslint-disable no-undef */
let routes = [
  {
    path: "/",
    name: "Home",
    component: require('../components/Home.vue'),
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: require('../components/Favorite.vue'),
  },
  {
    path: "/book/:bookId",
    name: "Book",
    component: require('../components/BookInfo.vue'),
    props: true 
  },
  {
    path: "*",
    component: require('../components/Home.vue'),
  },
];
export default routes;
