<template>
  <nav class="bg-blue-1 fixed inset-x-0">
    <div class="px-24 flex flex-row justify-between items-center">
      <router-link to="/"><img src="../assets/drug-logo.png" alt="logo" class="w-12 h-12 bg-blue-3 rounded-full"></router-link>
      <ul class="flex py-6 font-medium text-white-1 gap-x-4">
        <li class="px-4 hover-yellow"><router-link active-class="active" to="/recommend-drug">Recommend Drug</router-link></li>
        <li class="px-4 hover-yellow"><router-link active-class="active" to="/upload-file">Upload File</router-link></li>
        <li class="px-4 hover-yellow"><router-link active-class="active" to="/files-retraining">Files & Retraining</router-link></li>
        <li class="px-4 hover-yellow"><router-link active-class="active" to="/retraining-log">Retraining Log</router-link></li>
        <li class="px-4 hover-yellow"><router-link active-class="active" to="/model-details">Model Details</router-link></li>
      </ul>
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
