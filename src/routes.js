let routes = [
  {
    path: "/",
    name: "home",
    component: require("./components/home.vue").default,
  },
  {
    path: "/favorite",
    name: "favorite",
    component: require("./components/favorite.vue").default,
  },
  {
    path: "/book/:bookId",
    name: "book",
    component: require("./components/bookInfo.vue").default,
  },
];

export default routes;
