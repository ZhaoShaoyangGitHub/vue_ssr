const express = require("express");
const app = express();

//导入VUe构造函数
const Vue = require("vue");
const Router = require("vue-router");
Vue.use(Router);

const { createRenderer } = require("vue-server-renderer");
//获取渲染器
const render = createRenderer();

app.get("*", async (req, res) => {
  const router = new Router({
    routes: [
      { path: "/", component: { template: "<div>index page</div>" } },
      { path: "/detail", component: { template: "<div>detail page</div>" } },
    ],
  });
  const vm = new Vue({
    router,
    data: {
      title: "我是待渲染的Vue实例",
    },
    template: `
    <div style='text-align:center'>
    <h1>{{title}}</h1>
    <div>
    <router-link to="/">index</router-link>
    <router-link to="/detail">detail</router-link>
    <router-view></router-view>
    </div>
    </div>
    `,
  });
  try {
    //跳转至对应的路由
    router.push(req.url);
    //渲染获取html字符串
    const html = await render.renderToString(vm);
    console.log(html);
    res.send(html);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000);
