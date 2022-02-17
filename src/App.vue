<template>
  <nav-bar />
  <div class="px-6 md:px-8 lg:px-20 pt-nav">
    <router-view />
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";

export default {
  name: "App",
  components: {
    NavBar,
  },
};
</script>

<style>
@import "./assets/styles.css";
#app {
  font-family: "Roboto", sans-serif;
}
</style>
