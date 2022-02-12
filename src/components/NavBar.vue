<template>
  <nav class="px-6 md:px-8 lg:px-20 flex justify-between items-center flex-wrap bg-blue-1 fixed inset-x-0 z-40">
    <div class="w-full lg:w-auto flex justify-between items-center py-4">
      <router-link @click="goHome" to="/"><img src="../assets/drug-logo.png" alt="logo" class="w-12 h-12 bg-blue-3 rounded-full"></router-link>
      <div class="block lg:hidden float-right cursor-pointer"
        @click="toggleMenu">
        <font-awesome-icon icon="bars" size="lg" class="text-gray-200"/>
      </div>
    </div>
    <ul v-if="show_menu" class="block lg:flex py-6 lg:py-0 font-medium text-white-1 gap-x-2">
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/recommend-drug">Recommend Drug</router-link></li>
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/upload-file">Upload File</router-link></li>
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/files-retraining">Files & Retraining</router-link></li>
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/retraining-log">Retraining Log</router-link></li>
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/dashboard">Dashboard</router-link></li>
      <li class="px-2 hover-yellow py-4" @click="toggleMenu"><router-link active-class="active" to="/configuration">Configuration</router-link></li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      show_menu: true,
      screen_width: window.innerWidth,
    }
  },
  mounted() {
    window.addEventListener("resize", this.resizeEvent);
    if (window.innerWidth < 1024) {
      this.show_menu = false;
    }
  },
  unmounted() {
    window.removeEventListener("resize", this.resizeEvent);
  },
  methods: {
    goHome() {
      if (this.show_menu == true) {
        this.show_menu = false;
      }
    },
    toggleMenu() {
      if (window.innerWidth < 1024) {
        this.show_menu = !this.show_menu;
      }
    },
    resizeEvent() {
      if (window.innerWidth >= 1024) {
        this.show_menu = true;
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .active {
    color: #FCE181;;
  }
</style>
