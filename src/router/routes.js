/* eslint-disable no-undef */
import Home from "../components/Home";
import Favorite from "../components/Favorite";
import BookInfo from "../components/BookInfo";

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
