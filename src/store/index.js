import Vue from "vue";
import Vuex from "vuex";
import user from "./user";
import permission from "./permission";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    permission,
    user,
  },
  // 全局定义getters便于访问
  getters: {
    roles: (state) => state.user.roles,
    token: (state) => state.user.token,
    permission_routes: (state) => state.permission.routes,
  },
});
