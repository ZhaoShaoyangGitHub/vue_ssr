import Vue from "vue";
import App from "./App.vue";
import createRoute from "./router";
// import store from "./store";

Vue.config.productionTip = false;

//服务端请求获得一个单独的实例
//调用者是entry-serve
export function createApp() {
  const router = createRoute();
  const app = new Vue({
    router,
    // store,
    render: (h) => h(App),
  });
  return { app, router };
}
