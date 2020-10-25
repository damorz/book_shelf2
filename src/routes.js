/* eslint-disable no-undef */
let routes = [
  {
    path: "/",
    name: "Home",
    component: require("./components/Home").default,
  },
  {
    path: "/favorite",
    name: "Favorite",
    component: require("./components/Favorite").default,
  },
  {
    path: "/book/:bookId",
    name: "Book",
    component: require("./components/BookInfo").default,
    props: true 
  },
  {
    path: "*",
    component: require("./components/Home").default,
  },
];
export default routes;
