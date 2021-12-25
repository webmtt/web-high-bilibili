<template>
  <div id="app">
    <ul>
      <!-- 遍历permission_routes -->
      <!-- 传递base-path是由于子路由是相对地址 -->
      <item
        v-for="route in permission_routes"
        :key="route.path"
        class="item"
        :model="route"
        :base-path="route.path"
      ></item>
    </ul>
  </div>
</template>
<script>
import Item from "./Item.vue";
import { mapGetters } from "vuex";
export default {
  name: "SideMenu",
  components: { Item },
  computed: {
    ...mapGetters(["permission_routes"]),
  },
};
</script>
