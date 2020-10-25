/* eslint-disable no-undef */
let routes = [
  {
    path: "/",
    name: "Home",
    component: require("../components/Home.vue").default,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: require("../components/Favorite.vue").default,
  },
  {
    path: "/book/:bookId",
    name: "Book",
    component: require("../components/BookInfo.vue").default,
    props: true 
  },
  {
    path: "*",
    component: require("../components/Home.vue").default,
  },
];
export default routes;
