// 客户端激活，在浏览器执行
import { createApp } from "./main";

//获取Vue实例和路由
const { app, router } = createApp();
// 路由就绪，执⾏挂载
router.onReady(() => {
  app.$mount("#app");
});
