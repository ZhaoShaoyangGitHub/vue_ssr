const express = require("express");
const app = express();

// 第 1 步：开放dist/client⽬录，关闭默认下载index⻚的选项，不然到不了后⾯路由
const path = require("path");
const resolve = (dir) => path.resolve(__dirname, dir);
app.use(express.static(resolve("../dist/client"), { index: false }));

// 第 2 步：获得⼀个createBundleRenderer
const { createBundleRenderer } = require("vue-server-renderer");

// 第 3 步：服务端打包⽂件地址
const bundle = resolve("../dist/server/vue-ssr-server-bundle.json");

// 第 4 步：创建渲染器
const renderer = createBundleRenderer(bundle, {
  runInNewContext: false, // https://ssr.vuejs.org/zh/api/#runinnewcontext
  // 宿主文件
  template: require("fs").readFileSync(
    resolve("../public/index.html"),
    "utf-8"
  ), // 宿主文件
  clientManifest: require(resolve(
    "../dist/client/vue-ssr-client-manifest.json"
  )), // 客户端清单
});

app.get("*", async (req, res) => {
  try {
    // 设置url和title两个重要参数
    const context = {
      title: "ssr test",
      url: req.url,
    };
    //渲染获取html字符串
    // renderer会调用，创建vue实例，跳转至首屏，将它渲染出来，类似快照
    const html = await renderer.renderToString(context);
    console.log(1);
    res.send(html);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
});

// 端口
app.listen(3000);
