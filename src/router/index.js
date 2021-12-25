import Vue from "vue";
import Router from "vue-router";
import Layout from "@/layout"; // 布局页

Vue.use(Router);

// 通用页面

export const constRoutes = [
  {
    path: "/login",
    component: () => import("@/views/Login"),
    hidden: true, // 导航菜单忽略该项
  },
  {
    path: "/",
    component: Layout, // 应用布局
    redirect: "/home",
    meta: { title: "主页" },
    children: [
      {
        path: "home",
        component: () =>
          import(/* webpackChunkName:"home" */ "@/views/Home.vue"),
        name: "home",
        meta: {
          title: "home", // 导航菜单项标题
          icon: "qq", // 导航菜单项图标
        },
      },
      {
        path: "bla",
        component: () =>
          import(/* webpackChunkName:"home" */ "@/views/Home.vue"),
        name: "bla",
        meta: {
          title: "blabla", // 导航菜单项标题
          icon: "wx", // 导航菜单项图标
        },
      },
    ],
  },
];

// 权限页面
export const asyncRoutes = [
  {
    path: "/about",
    component: Layout,
    redirect: "/about/index",
    children: [
      {
        path: "index",
        component: () =>
          import(/* webpackChunkName:'home' */ "@/views/About.vue"),
        name: "about",
        meta: {
          title: "About",
          icon: "qq",
          // 角色决定将来哪些用户可以看到路由
          roles: ["admin", "editor"],
        },
      },
      {
        path: "foo",
        component: () =>
          import(/* webpackChunkName:'home' */ "@/views/About.vue"),
        name: "foo",
        meta: {
          title: "foo",
          icon: "wx",
          // 角色决定将来哪些用户可以看到路由
          roles: ["admin"],
        },
      },
    ],
  },
];

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constRoutes,
});

// 前端组件名和组件映射表
// const map = {
// login: require('login/index').default, // 同步的方式
// login: () => import('login/index') // 异步的方式
// }

// 服务段返回的map类似于
const serviceMap = [{ path: "/login", component: "login", hidden: true }];

// 遍历serviceMap，将component替换为map[component]，动态生成asyncRoutes
export function mapComponent(route) {
  route.component = serviceMap[route.component];
  if (route.children) {
    route.children = route.children.map((child) => mapComponent[child]);
  }
  return route;
}
