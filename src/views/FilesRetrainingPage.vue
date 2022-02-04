<template>
  <div class="flex flex-col items-center mb-8">
    <h1 class="text-2xl font-semibold my-6">Files & Retraining</h1>
    <file-management />
    <button
      @click="retraining"
      class="bg-blue-2 text-white-1 font-semibold py-2 px-6 rounded"
    >
      Retraining Now
    </button>
  </div>
</template>
<script>
import FileManagement from "../components/FileManagement.vue";

export default {
  name: "FilesRetrainingPage",
  components: {
    FileManagement,
  },
};
</script>
