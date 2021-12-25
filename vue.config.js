// 处理post请求参数
const bodyParser = require("body-parser");

const port = 7070;
const title = "vue项目最佳实践";

// resolve定义一个绝对路径获取函数
const path = require("path");
// 将传入的相对路径转换为绝对路径
function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  publicPath: "/best-practice",
  devServer: {
    port,
    proxy: {
      // 代理 /dev-api/user/login 到 http://127.0.0.1:3000/user/login
      [process.env.VUE_APP_BASE_API]: {
        target: `http://127.0.0.1:3000/`,
        changeOrigin: true,
        pathRewrite: { // api/user/login => /user/login
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
      "/api": {
        target: `http://127.0.0.1:3001`,
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: "",
        },
      },
    },

    // 配置mock接口
    // app是express的实例
    // before: (app) => {
    //   // 处理post参数
    //   app.use(bodyParser.json());

    //   // app.use(
    //   //   bodyParser.urlencoded({
    //   //     extended: true,
    //   //   })
    //   // );

    //   app.post("/dev-api/user/login", (req, res) => {
    //     const { username } = req.body;

    //     if (username === "admin" || username === "jerry") {
    //       res.json({
    //         code: 1,
    //         data: username,
    //       });
    //     } else {
    //       res.json({
    //         code: 10204,
    //         message: "用户名或密码错误",
    //       });
    //     }
    //   });

    //   app.get("/dev-api/user/info", (req, res) => {
    //     const auth = req.headers["authorization"];
    //     const roles = auth.split(" ")[1] === "admin" ? ["admin"] : ["editor"];
    //     res.json({ code: 1, data: roles });
    //   });
    // },
  },
  configureWebpack: {
    name: title,
  },
  chainWebpack(config) {
    // 配置svg规则排除icons目录中svg处理
    config.module.rule("svg").exclude.add(resolve("src/icons"));

    // 新增icons规则，设置svg-sprite-loader处理icons目录中的svg
    // 添加svg-sprite-loader
    config.module
      .rule("icons") // 新增icons规则
      .test(/\.svg$/) // 设置test选项
      .include.add(resolve("src/icons")) // 加入include，include选项是数组
      .end() // add完上下文是数组不是icons规则，使用end回退
      .use("svg-sprite-loader") // 添加use选项
      .loader("svg-sprite-loader") // 切换上下文为svg-sprite-loader
      .options({ symbolId: "icon-[name]" }) // 为svg-sprite-loader新增选项
      .end(); // 回退
  },
};
