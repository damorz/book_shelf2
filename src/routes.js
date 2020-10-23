let routes = [
  {
    path: "/book_shelf",
    name: "home",
    component: require("./components/home.vue").default,
  },
  {
    path: "/book_shelf/favorite",
    name: "favorite",
    component: require("./components/favorite.vue").default,
  },
  {
    path: "/book_shelf/book/:bookId",
    name: "book",
    component: require("./components/bookInfo.vue").default,
  },
  {
    path: "*", //ใช้การ redirect ไปที่ route ที่ต้องการ
    name: "notFound",
    component: require("./components/home.vue").default,
  },
];

export default routes;
