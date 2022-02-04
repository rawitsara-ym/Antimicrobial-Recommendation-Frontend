<template>
  <nav-bar/>
  <div class="px-24 pt-nav">
    <router-view/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
.h-full-screen {
  height: calc(100vh - 72px);
}
.pt-nav {
  padding-top: 72px;
}
.bg-blue-1 {
  background-color: #24305E;
}
.bg-blue-2 {
  background-color: #374785;
}
.bg-blue-3 {
  background-color: #A8D0E6;
}
.bg-blue-4 {
  background-color: #2F80ED;
}
.bg-yellow-1 {
  background-color: #FCE181;
}
.bg-gray-3 {
  background-color: #D1D7E0;
}
.text-white-1 {
  color: #EEEEEE;
}
.text-gray-1 {
  color: #333333
}
.text-gray-2 {
  color: #9B9999
}
.text-red-1 {
  color: #EB5757;
}
.text-green-1 {
  color: #27AE60;
}
.hover-yellow:hover {
  color: #FCE181;
}
</style>
