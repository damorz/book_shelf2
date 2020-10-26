/* eslint-disable no-undef */
let routes = [
  {
    path: "/",
    name: "home",
    component: require("../components/Home.vue").default,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: require("../components/Favorite.vue").default,
  },
  {
    path: "/book/:bookId",
    name: "book",
    component: require("../components/BookInfo.vue").default,
    props: true 
  },
  {
    path: "*",
    component: require("../components/Home.vue").default,
  },
];
export default routes;
