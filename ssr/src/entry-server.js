//它的任务是创建Vue实例并根据传⼊url指定⾸屏，在服务器执行
import { createApp } from "./main";

//调用者是将来渲染器renderer
export default (context) => {
  // 这⾥返回⼀个Promise，确保路由或组件准备就绪
  return new Promise((resolve, reject) => {
    //获取Vue实例和路由
    const { app, router } = createApp(context);
    //跳转至首屏
    router.push(context.url);

    //监听路由器ready事件，确保异步任务都完成
    router.onReady(() => {
      resolve(app);
    }, reject);
  });
};
