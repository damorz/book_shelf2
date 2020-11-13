/* eslint-disable no-undef */
import Vue from "vue";
import App from "./App.vue";
import Vuetify from "vuetify";
import Vuex from "vuex";
import store from "./store/store";
import vueDebounce from "vue-debounce";
import router from "./router/index"

Vue.use(Vuetify);
Vue.use(Vuex);
Vue.use(vueDebounce);

Vue.config.productionTip = false;



// const getHashTags = (str) => {
// 	// Implement your solution within this function
//     let found = 0;
//     let ans = [];
//     let words = str.split(" ");
//     let wordMustFound =0;

//     if(words.length <= 3) {
//       wordMustFound = words.length;
//     }
//     else {
//       wordMustFound = 3;
//     }

//     while(found < wordMustFound) {
//       let index_Max = 0;
//       let maxLength = 0;
//       for(let i = 0;i< words.length; i++ ) {
//           if(words[i].length > maxLength) {
//             maxLength = words[i].length;
//             index_Max = i;
//           }
//       }
//       ans.push(`#${words[index_Max].toLowerCase()}`);
//       words.splice(words.indexOf(words[index_Max]), 1);
//       found += 1;
//     }
//     return ans;
// }


// let ans = getHashTags("Visualizing Science")
// console.log(ans);



Vue.use(vueDebounce, {
  listenTo: "input",
  defaultTime: "700ms"
});

new Vue({
  render: (h) => h(App),
  vuetify: new Vuetify(),
  store: store,
  router,
  data: () => ({
    drawer: null,
  }),
}).$mount("#app");
