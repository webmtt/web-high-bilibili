<template>
  <div id="app">
    <router-view></router-view>
    <!-- <Icon icon-class="qq" class-name="myicon"></Icon>
    <Icon icon-class="wx" class-name="myicon"></Icon> -->
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Kaikeba></Kaikeba>
  </div>
</template>

<script>
import Kaikeba from './components/Kaikeba.vue';
// import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    Kaikeba
    // HelloWorld,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.myicon {
  font-size: 20px;
  color: green;
}
</style>
