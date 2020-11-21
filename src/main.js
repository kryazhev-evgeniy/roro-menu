import Vue from "vue";
import vuelidate from "vuelidate";
import App from "./App.vue";
import "./quasar";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
Vue.use(vuelidate);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
