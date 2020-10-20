import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import toast from "vue-easy-toast";
import Cloudinary from 'cloudinary-vue';
Vue.use(toast);
Vue.use(Cloudinary, {
  configuration: {
    cloudName: "demo"
  }
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
