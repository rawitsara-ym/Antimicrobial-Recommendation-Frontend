<template>
  <nav class="bg-blue-1">
    <div class="px-24 flex flex-row justify-between items-center">
      <router-link to="/"><img src="../assets/drug-logo.png" alt="logo" class="w-12 h-12 bg-blue-3 rounded-full"></router-link>
      <div class="py-6 font-medium text-white-1">
        <router-link class="mx-6 hover-yellow" active-class="active" to="/recommend-drug">Recommend Drug</router-link>
        <router-link class="mx-6 hover-yellow" active-class="active" to="/file-upload">File Upload</router-link>
        <router-link class="mx-6 hover-yellow" active-class="active" to="/retraining-log">Retraining Log</router-link>
        <router-link class="mx-6 hover-yellow" active-class="active" to="/model-details">Model Details</router-link>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .active {
    color: #FCE181;;
  }
</style>
